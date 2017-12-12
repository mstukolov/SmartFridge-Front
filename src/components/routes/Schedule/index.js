import React, { Component } from "react";
import RetailEquipmentTable from "../../RetailEquipment/Table/index";

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
    return <RetailEquipmentTable />;
  }
}

export default SchedulePage;
