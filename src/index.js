import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import App from "./App";

ReactDom.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
