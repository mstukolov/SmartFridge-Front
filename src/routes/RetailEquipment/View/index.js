// @flow weak
import React from "react";
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
    width: "100%",
    height: "100%"
  }
});

type Props = {
  classes: {
    root: string,
    paper: string,
    map: string
  }
};

function RetailEquipmentPageView(props: Props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} alignItems="stretch">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography type="title" gutterBottom>
              Информация об оборудовании
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <RetailMoreInfo location={props.location.pathname} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.map}>{/*<GlobalMap />*/}</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(RetailEquipmentPageView);
