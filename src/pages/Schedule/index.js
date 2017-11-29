import React, { Component } from "react";
import EnhancedTable from "../../components/EnhancedTable";

/**
 * Страница с табличным представление данных
 * @extends Component
 */
class SchedulePage extends Component {
  /**
   * Создает разметку React
   * @return {ReactElement} разметка
   */
  render() {
    return <EnhancedTable />;
  }
}

export default SchedulePage;
