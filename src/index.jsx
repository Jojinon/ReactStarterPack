import React from "react";
import ReactDOM from "react-dom";

import "./styles/common.css";

import Hello from "./components/Hello";

const element = <h1>Test</h1>;

ReactDOM.render(
    <Hello />,
    document.getElementById("app")
)
