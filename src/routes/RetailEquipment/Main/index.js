// @flow weak
import React, { Component } from "react";
import RetailEquipmentTable from "../../../components/RetailEquipment/Table/index";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import GlobalMap from "../../../components/GlobalMap/index";
import Typography from "material-ui/Typography";
import RetailMoreInfo from "../../../components/RetailEquipment/Form/index";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 16,
    boxSizing: "border-box",
    height: "100%",
    color: theme.palette.text.secondary
  },
  map: {
    padding: 16,
    height: "300px"
  }
});

type Props = {
  classes: {
    root: string,
    paper: string,
    map: string
  }
};

/**
 * Страница с табличным представление данных
 * @extends Component
 */
class RetailEquipmentPageMain extends Component {
  /**
   * Создает разметку React
   * @return {ReactElement} разметка
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} alignItems="stretch">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="title" gutterBottom>
                Торговое оборудование
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <RetailEquipmentTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(RetailEquipmentPageMain);
