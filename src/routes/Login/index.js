import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  tokenSelector,
  errorSelector,
  authorizeAction
} from "../../ducks/Auth";

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(input, value) {
    this.setState({ [input]: value });
  }

  onSubmit() {
    const { login, password } = this.state;
    this.props.dispatch(authorizeAction(login, password));
  }

  render() {
    const { error, token } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <input
          type="text"
          placeholder="login"
          value={this.state.login}
          onChange={this.onChange.bind(this, "login")}
        />
        <input
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.onChange.bind(this, "password")}
        />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default connect(state => ({
  token: state.auth.token,
  error: state.auth.error
}))(LoginPage);
