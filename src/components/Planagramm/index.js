import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Stepper, { Step, StepButton } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Identify from "./identify";
import Shot from "./shot";
import Result from "./result";
import {
  loadedSelector,
  loadingSelector,
  serialNumberSelector
} from "../../ducks/Planagramm";
import injectSheet from "react-jss";
import { connect } from "react-redux";

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
    activeStep: 0,
    completed: {}
  };

  componentWillReceiveProps(nextProps) {
    const { identifySuccess } = nextProps;
    if (identifySuccess) {
      this.setState({
        completed: {
          "0": true
        }
      });
    }
  }

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  totalSteps = () => {
    return getSteps().length;
  };

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {}
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                Все шаги пройдены - вы закончили
              </Typography>
              <Button onClick={this.handleReset}>Начать заново</Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Назад
                </Button>
                <Button
                  raised
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Далее
                </Button>
                {activeStep !== steps.length &&
                  (this.state.completed[this.state.activeStep] ? (
                    <Typography type="caption" className={classes.completed}>
                      Шаг {activeStep + 1} уже завершен
                    </Typography>
                  ) : (
                    <Button
                      raised
                      color="primary"
                      onClick={this.handleComplete}
                    >
                      {this.completedSteps() === this.totalSteps() - 1
                        ? "Завершить"
                        : "Завершить шаг"}
                    </Button>
                  ))}
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

export default connect(state => {
  return {
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    identifySuccess: serialNumberSelector(state)
  };
}, {})(injectSheet(styles)(Planagramm));
