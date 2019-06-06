import React, { Component } from "react";
import pigData from "./wild-pig-data.json";
import { Chart } from "./Chart";
import "./App.css";

class App extends Component {
  constructor() {
    super(null);
    this.state = {
      chartData: {}
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: [
          "Boston",
          "Worcester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford"
        ],
        datasets: [
          {
            label: "Population",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      }
    });
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
{
  /*<div className="App">*/
}
{
  /*<p className="App-intro">*/
}
{
  /*To get started, edit <code>src/App.js</code> and save to reload.*/
}
{
  /*</p>*/
}

{
  /*<table>*/
}
{
  /*<tbody>*/
}
{
  /*<tr>*/
}
{
  /*<th>Year</th>*/
}
{
  /*<th>Island</th>*/
}
{
  /*<th>Population</th>*/
}
{
  /*</tr>*/
}
{
  /*{pigData["PIG POPULATIONS"].map((datum, index) => (*/
}
{
  /*<tr key={index}>*/
}
{
  /*<td>{datum.year}</td>*/
}
{
  /*<td>{datum.island}</td>*/
}
{
  /*<td>{datum.pigPopulation}</td>*/
}
{
  /*</tr>*/
}
{
  /*))}*/
}
{
  /*</tbody>*/
}
{
  /*</table>*/
}
{
  /*</div>*/
}
