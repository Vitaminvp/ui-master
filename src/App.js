import React, { Component } from "react";
import pigData from "./wild-pig-data.json";
import { Chart, Button } from "./Components";
import "./App.css";
import { randomHsl } from "./helpers";
import { defaultYear, duration } from "./constants";
import ProgressBar from "./Components/Progress";
import { Container } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.dataSets = [];
    this.count = 0;
    this.data = pigData["PIG POPULATIONS"].reduce((acc, curr) => {
      const { year, island, pigPopulation } = curr;
      if (acc.hasOwnProperty(year)) {
        acc[year] = [...acc[year], { island, pigPopulation }];
        return acc;
      }
      acc[year] = [{ island, pigPopulation }];
      return acc;
    }, {});

    this.years = Object.keys(this.data);

    this.state = {
      current: {
        islands: [...this.data[defaultYear].map(item => item.island)],
        pigPopulations: [
          ...this.data[defaultYear].map(item => item.pigPopulation)
        ],
        year: defaultYear,
        backgroundColor: [...this.data[defaultYear].map(randomHsl)]
      },
      previous: {},
      paused: true
    };
  }

  componentDidMount() {
    if (!this.state.paused) {
      this.timer = setInterval(() => {
        this.getChartData();
      }, duration);
    }

    // console.log("this.data", this.data);
    // window.location.search = `?paused=true&year=2004`;
    // window.location.href = `${window.location.origin}/?paused=true&year=2004`
  }

  componentWillMount() {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    console.log("window.location", window.location);
    //
    const paused = params.get("paused");
    const year = params.get("year");
    if (paused && year) {
      const index = this.years.indexOf(year);
      if (~index) {
        this.count = index;
        this.getChartData();
      }
    }
    console.log("URLSearchParams", paused, year);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getChartData() {
    const year = Object.keys(this.data)[this.count];
    const yearData = this.data[year];
    const islands = yearData.map(item => item.island);
    const pigPopulations = yearData.map(item => item.pigPopulation);
    this.count = this.count < this.years.length - 1 ? this.count + 1 : 0;

    this.setState(
      state => {
        const {
          current: {
            islands: curIsland,
            pigPopulations: curPigPopulations,
            year: curYear,
            backgroundColor: curBackgroundColor
          }
        } = state;

        return {
          current: {
            islands,
            pigPopulations,
            year,
            backgroundColor: [...islands.map(randomHsl)]
          },
          previous: {
            islands: [...curIsland],
            pigPopulations: [...curPigPopulations],
            year: curYear,
            backgroundColor: [...curBackgroundColor]
          }
        };
      });

    this.setHref();
  }

  setHref() {
    const url = `${window.location.origin}/?paused=${this.state.paused}&year=${this.state.current.year}`;
    window.history.pushState(null, null, url);
  }

  toggleStart = () => {
    const { paused } = this.state;
    if (paused) {
      this.timer = setInterval(() => {
        this.getChartData();
      }, duration);
    } else {
      clearInterval(this.timer);

    }
    this.setState({
      paused: !paused
    }, this.setHref);


  };

  render() {
    const {
      current: {
        islands: curIsland,
        pigPopulations: curPigPopulations,
        year: curYear,
        backgroundColor: curBackgroundColor
      },
        previous: {
          islands: prevIsland,
          pigPopulations: prevPigPopulations,
          year: prevYear,
          backgroundColor: prevBackgroundColor
        }
    } = this.state;

    const datasets = prevIsland && prevPigPopulations ?  [
      {
        label: prevYear,
        data: prevPigPopulations,
        backgroundColor: prevBackgroundColor
      },
      {
        label: curYear,
        data: curPigPopulations,
        backgroundColor: curBackgroundColor
      },

    ] : [
      {
        label: curYear,
        data: curPigPopulations,
        backgroundColor: curBackgroundColor
      }
    ];
    const { paused } = this.state;

    const chartData = {
      labels: curIsland,
      datasets
    };
    console.log("chartData", chartData);

    return (
      <Container>
        <div className="App">
          <Chart
            chartData={chartData}
            location={curYear}
            legendPosition="bottom"
          />
          <div className="buttonWrapper">
            <Button
              onButtonClick={this.toggleStart}
              icon={paused ? "play" : "pause"}
            />
            <ProgressBar value={this.count} total={this.years.length} />
          </div>
        </div>
      </Container>
    );
  }
}

export default App;
