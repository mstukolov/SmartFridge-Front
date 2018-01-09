import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadData,
  loadedSelector,
  loadingSelector,
  moduleName
} from "../../ducks/RetailEquipment/report";
import injectSheet from "react-jss";
import LinearQuery from "../LinearQuery";

import {
  VictoryChart,
  createContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryTheme
} from "victory";

const styles = {
  container: {
    maxWidth: "965px"
  }
};

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

/**
 * Компонент линейного графика заполненности холодильника
 * @extends Component
 */
class ReportChart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  /**
   * Обработчик зумма на графике
   * @param domain
   */
  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  /**
   * Обработчик зумма на превью
   * @param domain
   */
  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  /**
   * Делает запрос на сервер
   */
  componentDidMount() {
    this.props.loadData();
  }

  /**
   * После получения данных с сервера масштабируем график и показываем данные за последнюю неделю
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.valueout.last()) {
      const last = new Date();
      const weekAgo = new Date().setDate(last.getDate() - 7);
      this.handleBrush({ x: [new Date(weekAgo), last] });
      this.handleZoom({ x: [new Date(weekAgo), last] });
    }
  }
  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { loaded, classes } = this.props;
    return !loaded ? (
      <LinearQuery />
    ) : (
      <div className={classes.container}>
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
              data: { stroke: "tomato", strokeWidth: 1 }
            }}
            data={this.props.valueout}
          />

          <VictoryLine
            style={{
              data: { stroke: "navy", strokeWidth: 1 }
            }}
            data={this.props.valuein}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default connect(
  state => {
    const valueout = state[moduleName].data.map(item => {
      return { x: item.recdate, y: item.valueout };
    });

    const valuein = state[moduleName].data.map(item => {
      return { x: item.recdate, y: item.valuein };
    });

    // const fridge = state.moreInfo.activeItem;

    return {
      valueout,
      valuein,
      loading: loadingSelector(state),
      loaded: loadedSelector(state)
    };
  },
  { loadData }
)(injectSheet(styles)(ReportChart));
