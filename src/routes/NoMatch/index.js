import React from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import ErrorOutlineIcon from "material-ui-icons/ErrorOutline";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const NoMatch = props => {
  const { classes, location } = props;
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="display2" align="center">
        Нет такой страницы
      </Typography>
      <Typography type="display4" align="center">
        <ErrorOutlineIcon
          style={{
            width: 96,
            height: 96
          }}
        />
      </Typography>
      <Typography type="display1" align="center">
        По запросу: <code>{location.pathname}</code> ничего не найдено.
      </Typography>
    </Paper>
  );
};
NoMatch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoMatch);
