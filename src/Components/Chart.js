import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Chart extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     chartData: props.chartData
  //   };
  // }
  //
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };

  render() {
    const {
      displayTitle,
      location,
      displayLegend,
      legendPosition
    } = this.props;
    return (
      <div className="chart">
        <Bar
          data={this.props.chartData}
          options={{
            title: {
              display: displayTitle,
              text: "Pig population in " + location,
              fontSize: 25
            },
            legend: {
              display: displayLegend,
              position: legendPosition
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
