import React from "react";
import ReactDOM from "react-dom";
import {Section} from "./app/section";
import "./index.scss";

ReactDOM.render(
  <Section
    content="hey salut toi !"
    decorators={[{id: '1', start: 4, type: 'bold', end: 9}, {id: '2', start: 10, type: 'bold', end: 13}]}
  />,
  document.getElementById('root')
);
