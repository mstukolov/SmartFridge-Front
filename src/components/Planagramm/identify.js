import React, { Component } from "react";
import QrReader from "react-qr-reader";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import { saveId } from "../../ducks/Planagramm";
import SimpleSnackbar from "../SimpleSnackbar";

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto"
  }
};

class Identify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: null
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(serialNumber) {
    if (serialNumber) {
      console.log(serialNumber);
      this.setState({
        result: serialNumber
      });
      this.props.saveId(serialNumber);
    }
  }
  handleError(err) {
    console.error(err);
  }

  render() {
    const { classes } = this.props;
    const { delay, result } = this.state;
    return (
      <div className={classes.container}>
        <QrReader
          delay={delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        {result ? (
          <SimpleSnackbar text={"Текущее устройство: " + result} />
        ) : null}
        <p>Опознанный серийный номер: {result}</p>
      </div>
    );
  }
}

Identify.propTypes = {};
Identify.defaultProps = {};

export default connect(
  state => {
    return {};
  },
  { saveId }
)(injectSheet(styles)(Identify));