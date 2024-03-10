import React from "react";
import {Routes, Route, useNavigate} from "react-router-dom"
import Navigation from "./Navigation.jsx"
import Home from "../pages/Home.jsx"
import Auth from "../pages/Auth.jsx"
import Dashboard from "../pages/Dashboard.jsx"
import {useAppState} from "../AppState.jsx"

export const App = (props) => {
  const navigate = useNavigate();
  const {state, dispatch} = useAppState();
  React.useEffect(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth) {
      dispatch({type: "auth", payload: auth});
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/auth/:form" element={<Auth/>}/>
        <Route path="/*" element={<Dashboard/>}/>
      </Routes>
    </>
  );
};