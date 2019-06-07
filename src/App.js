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
      islands: [...this.data[defaultYear].map(item => item.island)],
      pigPopulations: [
        ...this.data[defaultYear].map(item => item.pigPopulation)
      ],
      year: defaultYear,
      backgroundColor: [...this.data[defaultYear].map(randomHsl)],
      paused: true
    };
  }

  componentDidMount() {
    if (!this.state.paused) {
      this.timer = setInterval(() => {
        this.getChartData();
      }, duration);
    }

    console.log("this.data", this.data);
  }

  componentWillMount() {
    const { search } = window.location;
    const params = new URLSearchParams(search);
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
      {
        islands,
        pigPopulations,
        year,
        backgroundColor: [...islands.map(randomHsl)]
      },
      () => {
        console.log("this.state", this.state);
      }
    );
  }
  toggleStart = () => {
    const { paused } = this.state;
    if (paused) {
      this.timer = setInterval(() => {
        this.getChartData();
        this.dataSets = [this.dataSets[this.dataSets.length - 1]];
      }, duration);
    } else {
      clearInterval(this.timer);
    }
    this.setState({
      paused: !paused
    });
  };

  render() {
    const {
      islands,
      pigPopulations,
      year,
      backgroundColor,
      paused
    } = this.state;

    this.dataSets =
      this.dataSets.length > 1
        ? [
            ...this.dataSets,
            {
              label: year,
              data: pigPopulations,
              backgroundColor
            }
          ].slice(-2)
        : [
            ...this.dataSets,
            {
              label: year,
              data: pigPopulations,
              backgroundColor
            }
          ];

    console.log("this.dataSets", this.dataSets);
    const chartData = {
      labels: islands,
      datasets: this.dataSets
    };
    console.log("chartData", chartData);

    return (
      <Container>
        <div className="App">
          <Chart
            chartData={chartData}
            location={year}
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
