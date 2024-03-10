import React from "react";
import {ReactDom} from "react-dom";
import "./styles.css";
import {App} from "./components/App.js"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {AppState} from "./AppState.jsx"
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#root"));
root.render(
  <AppState>
    <Router>
      <Routes>
        <Route path="*" element={<App/>}/>
      </Routes>
    </Router>
  </AppState>
)
