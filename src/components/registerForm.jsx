import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import * as userServices from "../services/userServices";
import auth from "../services/authService";
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: joi.string().email().required().label("Username"),
    password: joi.string().min(5).required().label("Password"),
    name: joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const res = await userServices.register(this.state.data);
      auth.loginWithJwt(res.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
