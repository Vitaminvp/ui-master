import React, { Component } from "react";
import pigData from "./wild-pig-data.json";
import { Chart } from "./Chart";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      islands: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
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
      year: "1999"
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
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getChartData();
    }, 2000);
  }

  componentWillMount() {
    // this.timer = setInterval(() => {
    //   this.getChartData();
    // }, 5000);
    //this.getChartData();
  }
  randomHsl(){
    return `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
  }

  getChartData() {
    const year = Object.keys(this.data)[this.count];
    const yearData = this.data[year];
    const islands = yearData.map(item => item.island);
    const pigPopulations = yearData.map(item => item.pigPopulation);
    // console.log("yearData", yearData);
    // console.log("islands", islands);
    console.log("pigPopulations", pigPopulations);
    // console.log("this.count", this.count);
    // console.log("...new Array(islands.length).map(this.randomHsl)", (new Array(islands.length)).map((item) => this.randomHsl()));
    this.count = this.count < this.years - 1 ? this.count + 1 : 0;
    this.setState({
          islands,
          pigPopulations,
          year
      }, () =>{
          console.log("this.state", this.state);

        }
    );
  }
  toggleStart = () => {
    clearInterval(this.timer);
  };
  //
  render() {
    const { islands, pigPopulations, year } = this.state;
    const  chartData =  {
      labels: islands,
      datasets: [
          {
            label: year,
            data: pigPopulations,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 99, 132, 0.6)'
                ]
          }
          ]
    };
    console.log("chartData", chartData);

    return (
      <div className="App">
        <Chart
          chartData={ chartData }

          location={year}
          legendPosition="bottom"
        />
        <button onClick={this.toggleStart}>Pause</button>
        <button onClick={()=> this.componentDidMount()}>start</button>
      </div>
    );
  }
}

export default App;
