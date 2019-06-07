import React, { Component } from "react";
import pigData from "./wild-pig-data.json";
import { Chart } from "./Chart";
import "./App.css";
import { randomHsl } from "./helpers";
import { duration } from "./constants";

class App extends Component {
  constructor() {
    super();

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
    this.years = Object.keys(this.data).length;
    this.state = {
      islands: [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford"
      ],
      pigPopulations: [
        617594,
        181045,
        111045,
        153060,
        106519,
        196519,
        105162,
        95072
      ],
      year: "1999",
      backgroundColor: [...(new Array(6)).map(item => randomHsl())],
      paused: true
    };
  }

  componentDidMount() {
    if (!this.state.paused) {
      this.timer = setInterval(() => {
        this.getChartData();
      }, duration);
    }
  }

  componentWillMount() {}

  getChartData() {
    const year = Object.keys(this.data)[this.count];
    const yearData = this.data[year];
    const islands = yearData.map(item => item.island);
    const pigPopulations = yearData.map(item => item.pigPopulation);
    this.count = this.count < this.years - 1 ? this.count + 1 : 0;
    this.setState(
      {
        islands,
        pigPopulations,
        year,
        backgroundColor: [...islands.map(item => randomHsl())]
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
    const chartData = {
      labels: islands,
      datasets: [
        {
          label: year,
          data: pigPopulations,
          backgroundColor
        },
        {
          label: year,
          data: pigPopulations,
          backgroundColor
        }
      ]
    };
    console.log("chartData", chartData);

    return (
      <div className="App">
        <Chart chartData={chartData} location={year} legendPosition="bottom" />
        <button onClick={this.toggleStart}>{paused ? "Play" : "Pause"}</button>
      </div>
    );
  }
}

export default App;
