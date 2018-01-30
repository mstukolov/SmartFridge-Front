// @flow

import React from "react";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    bottom: 0,
    position: "fixed",
    width: "100%",
    zIndex: 1001
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

type Props = {
  classes: {
    flex: string,
    root: string
  }
};

/**
 * Нижняя навигационная панель
 * @param       {Object} props
 * @constructor
 */
function Footer(props: Props) {
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
            <Button href="http://center2m.ru/" color="contrast">
              ООО «Центр 2М»
            </Button>
            Тел.: +7 (499)754-07-77<br />
            Адрес: 119034, Москва, Пречистенская наб. 17
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// Footer.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(Footer);
