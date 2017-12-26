import React, { Component } from "react";
import { connect } from "react-redux";
import { loadData } from "../../ducks/RetailEquipment/report";

import {
  VictoryChart,
  createContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip
} from "victory";
import PropTypes from "prop-types";

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
class ReportChart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleZoom(domain) {
    console.log("handleZoom", domain);
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    console.log("handleBrush", domain);
    this.setState({ zoomDomain: domain });
  }

  componentDidMount() {
    this.props.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.valueout.last()) {
      const lastX = nextProps.valueout.last().x;
      let weekAgo = new Date().setDate(lastX.getDate() - 7);

      this.setState({
        zoomDomain: { x: [new Date(weekAgo), lastX] },
        selectedDomain: { x: [new Date(weekAgo), lastX] }
      });
      console.log("nextProps", new Date(weekAgo), lastX);
    }
  }

  render() {
    const { isLoading, loaded } = this.props;
    return !loaded ? null : (
      <div>
        <VictoryChart
          width={600}
          height={350}
          theme={VictoryTheme.material}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomVoronoiContainer
              responsive={true}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              labels={d => `Y: ${d.y}`}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={this.props.valueout}
          />

          <VictoryLine
            style={{
              data: { stroke: "navy" }
            }}
            data={this.props.valuein}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.material}
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600}
          height={90}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryBrushContainer
              responsive={true}
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush.bind(this)}
            />
          }
        >
          <VictoryAxis tickFormat={x => new Date(x).getFullYear()} />
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={this.props.valueout}
          />

          <VictoryLine
            style={{
              data: { stroke: "navy" }
            }}
            data={this.props.valuein}
          />
        </VictoryChart>
      </div>
    );
  }
}

ReportChart.propTypes = {};
ReportChart.defaultProps = {};

export default connect(
  state => {
    // { x: new Date(1982, 1, 1), y: 125 }

    const valueout = state.equipmentReport.reportData.map(item => {
      return { x: item.recdate, y: item.valueout };
    });

    const valuein = state.equipmentReport.reportData.map(item => {
      return { x: item.recdate, y: item.valuein };
    });

    const isLoading = state.equipmentReport.isLoading;
    const loaded = state.equipmentReport.loaded;

    return {
      valueout,
      valuein,
      isLoading,
      loaded
    };
  },
  { loadData }
)(ReportChart);
