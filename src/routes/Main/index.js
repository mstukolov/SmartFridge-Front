import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";

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
  mapp: {
    padding: 16,
    height: "300px"
  }
});

/**
 * Главная страница приложения
 * @extends Component
 */
class MainPage extends Component {
  /**
   * Создает разметку React
   * @return {ReactElement} разметка
   */
  render() {
    const { classes, token } = this.props;

    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography type="title" gutterBottom>
              Добро пожаловать, {token.name} {token.surname}!
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography type="subheading" gutterBottom>
              Описание продукта
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at
              ipsum magni minus nesciunt pariatur quod quos ratione velit
              voluptate! Adipisci architecto blanditiis doloremque fugit
              molestias nemo neque obcaecati veritatis!
            </Typography>
            <Typography>
              Aliquam beatae dolorem ex excepturi exercitationem, fugit hic ipsa
              iusto labore laborum molestias nesciunt numquam obcaecati odio
              pariatur perspiciatis placeat praesentium quidem quos ratione,
              reiciendis repellat velit veniam voluptas voluptate?
            </Typography>
            <Typography>
              Assumenda at, dignissimos dolore enim hic magnam mollitia omnis
              quos ratione repellendus rerum sunt ut voluptas? A architecto,
              culpa debitis delectus deserunt eum expedita impedit, ipsa maxime
              nobis vel vero.
            </Typography>
            <Typography>
              Asperiores cumque cupiditate facilis in ipsa ipsam iusto minima,
              minus molestias nesciunt quisquam, sit veniam? Adipisci animi
              blanditiis commodi, cumque deleniti dicta dignissimos earum
              exercitationem hic illum ipsum placeat ut.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default connect(state => ({
  token: state.auth.token
}))(withStyles(styles)(MainPage));
