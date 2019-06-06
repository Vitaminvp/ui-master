import React, { Component } from "react";
import pigData from "./wild-pig-data.json";
import { Chart } from "./Chart";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {}
    };

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

    this.timer = setInterval(() => {
      this.getChartData();
    }, 2000);

  }

  componentDidMount() {
    // this.timer = setInterval(() => {
    //   this.getChartData();
    // }, 2000);
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      this.getChartData();
    }, 2000);
    this.getChartData();
  }
  randomHsl(){
    return `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
  }

  getChartData() {
    const year = Object.keys(this.data)[this.count];
    const yearData = this.data[year];
    const islands = yearData.map(item => item.island);
    const pigPopulations = yearData.map(item => item.pigPopulation);
    console.log("yearData", yearData);
    console.log("islands", islands);
    console.log("pigPopulations", pigPopulations);
    console.log("this.count", this.count);
    this.setState((state, { year, islands=[], pigPopulations }) =>
      ({
        chartData: {
          labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
          datasets: [
            {
              label: "Population",
              data: [
                617594,
                181045,
                153060,
                106519,
                105162,
                95072
              ],
              backgroundColor: [...islands.map(item => this.randomHsl())]
            }
          ]
        }
      }),
      () => {
        this.count = this.count < this.years - 1 ? this.count + 1 : 0;
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Chart
          chartData={this.state.chartData}
          location="Massachusetts"
          legendPosition="bottom"
        />
      </div>
    );
  }
}

export default App;
