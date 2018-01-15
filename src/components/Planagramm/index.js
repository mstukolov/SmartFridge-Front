import React, { Component } from "react";
import PropTypes from "prop-types";
import HorizontalStepper from "../HorizontalStepper";

class Planagramm extends Component {
  render() {
    return (
      <section>
        <HorizontalStepper />
        Planagramm
      </section>
    );
  }
}

Planagramm.propTypes = {};
Planagramm.defaultProps = {};

export default Planagramm;
