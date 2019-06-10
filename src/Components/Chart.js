import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

class Chart extends Component {
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
      legendPosition,
      chartData
    } = this.props;

    return (
      <div className="chart">
        <Bar
          data={chartData}
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

Chart.propTypes = {
  displayTitle: PropTypes.bool,
  displayLegend: PropTypes.bool,
  chartData: PropTypes.object.isRequired,
  location: PropTypes.string,
  legendPosition: PropTypes.string
};

export default Chart;
