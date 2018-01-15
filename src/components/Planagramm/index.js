import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Stepper, { Step, StepLabel } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Identify from "./identify";
import Shot from "./shot";
import Result from "./result";

const styles = theme => ({
  root: {
    width: "90%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ["Идентификация устройства", "Снимок планограммы", "Отчет"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Identify />;
    case 1:
      return <Shot />;
    case 2:
      return <Result />;

    default:
      return <h1>"Неизвестный шаг"</h1>;
  }
}

class Planagramm extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                Все шаги пройдены, вы можете начать сначала
              </Typography>
              <Button onClick={this.handleReset}>Сбросить</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Назад
                </Button>
                <Button raised color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? "Финал" : "Далее"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Planagramm.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Planagramm);
