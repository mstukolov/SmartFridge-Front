// @flow weak

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

/**
 * Нижняя навигационная панель
 * @param       {Object} props
 * @constructor
 */
function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            type="body1"
            gutterBottom
            align="right"
            color="inherit"
            className={classes.flex}
          >
            Тел.: 8(499) 999-99-99<br />
            Контакты: г. Москва, ул. Гагарина, д. 7
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
