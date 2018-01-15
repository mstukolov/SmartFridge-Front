/* eslint-disable flowtype/require-valid-file-annotation */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AccountCircle from "material-ui-icons/AccountCircle";
// import Switch from "material-ui/Switch";
// import { FormControlLabel, FormGroup } from "material-ui/Form";
import Menu, { MenuItem } from "material-ui/Menu";
import Drawer from "material-ui/Drawer";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText } from "material-ui/List";
import DvrIcon from "material-ui-icons/Dvr";
import HomeIcon from "material-ui-icons/Home";
import MapIcon from "material-ui-icons/Map";
import ViewComfyIcon from "material-ui-icons/ViewComfy";
import logo from "../../logo_C2M_alternative_ru.svg";
import {
  RouteEquipmentPage,
  RouteMapPage,
  RoutePlanagrammPage
} from "../../routes/constants";
import history from "../../redux/history";

const styles = theme => ({
  list: {
    width: 300
  },
  link: {
    textDecoration: "none"
  },
  listFull: {
    width: "auto"
  },
  root: {
    marginTop: 0,
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex: 1001
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logo: {
    marginRight: "20px",
    height: "28px",
    fill: "#fff"
  }
});

/**
 * Компонент верхней навигационной панели
 * @extends Component
 */
class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    left: false
  };

  // TODO: убрать - создано для скрытия иконки авторизации
  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  /**
   * Открытие меню авторизации
   * @param  {SytheticEvent} event
   */
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * Обработка закрытия меню авторизации
   */
  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };

  /**
   * Обработчик открытия/закрытия главного меню
   */
  toggleDrawer = () => {
    this.setState({
      left: !this.state.left
    });
  };

  /**
   * render
   * @return {ReactElement} разметка
   */
  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const pathname = history.location.pathname;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer}
              className={classes.menuButton}
              color="contrast"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} className={classes.logo} alt="logo" />
            <Typography type="title" color="inherit" className={classes.flex}>
              Smart Fridge
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="contrast"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onRequestClose={this.handleRequestClose}
                >
                  <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleRequestClose}>
                    My account
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>

          <Drawer open={this.state.left} onRequestClose={this.toggleDrawer}>
            <div
              className={classes.list}
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              <Link to="/" className={classes.link}>
                <MenuItem selected={pathname === "/"}>
                  <ListItemIcon className={classes.icon}>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ text: classes.text }}
                    inset
                    primary="Главная"
                  />
                </MenuItem>
              </Link>
              <Link to={RouteEquipmentPage} className={classes.link}>
                <MenuItem selected={pathname === RouteEquipmentPage}>
                  <ListItemIcon className={classes.icon}>
                    <DvrIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ text: classes.text }}
                    inset
                    primary="Торговое оборудование"
                  />
                </MenuItem>
              </Link>

              <Link to={RouteMapPage} className={classes.link}>
                <MenuItem selected={pathname === RouteMapPage}>
                  <ListItemIcon className={classes.icon}>
                    <MapIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ text: classes.text }}
                    inset
                    primary="Карта устройств"
                  />
                </MenuItem>
              </Link>

              <Link to={RoutePlanagrammPage} className={classes.link}>
                <MenuItem selected={pathname === RoutePlanagrammPage}>
                  <ListItemIcon className={classes.icon}>
                    <ViewComfyIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ text: classes.text }}
                    inset
                    primary="Контроль планаграммы"
                  />
                </MenuItem>
              </Link>

              {this.props.location}
            </div>
          </Drawer>
        </AppBar>
        {/* <FormGroup>
          <FormControlLabel
            control={
          <Switch
          checked={auth}
          onChange={this.handleChange}
          aria-label="LoginSwitch"
          />
            }
            label={auth ? "Logout" : "Login"}
          />
        </FormGroup> */}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
