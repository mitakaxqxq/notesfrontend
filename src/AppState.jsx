import React, {useContext, useReducer} from "react";
import ReactDom from "react-dom";

/////////////////////
// INITIAL STATE
/////////////////////


const initialState = {
  url: "https://dnnotesbackend-787789f70773.herokuapp.com",
  token: null,
  username: null,
  notes: null,
  new: {
    title: "",
    body: ""
  },
  edit: {
    id: 0,
    title: "",
    body: ""
  }
}

/////////////////////
// REDUCER
/////////////////////

// action = {type: "", payload: ---}
/*
action - has 2 properties:
- type - string which tells us which action we want to do
- payload - has a value which we need for the specific scenario
*/


const reducer = (state, action) => {
  let newState;
  switch(action.type) {
    case "auth":
      newState = { ...state, ...action.payload };
      return newState;
      break;
    case "logout":
      newState = { ...state, token: null, username: null };
      window.localStorage.removeItem("auth");
      return newState;
      break;
    case "getNotes":
      newState = { ...state, notes: action.payload };
      return newState;
      break;
    case "select":
      newState = { ...state, edit: { ...state.edit, ...action.payload } };
      return newState;
      break;
    default: 
      return state 
  }
}

/////////////////////
// AppContext
/////////////////////
const AppContext = React.createContext(null);


/////////////////////
// AppState Component
/////////////////////
export const AppState = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return <AppContext.Provider value={{state, dispatch}}>{props.children}</AppContext.Provider>
};

/////////////////////
// useAppState hook
/////////////////////

export const useAppState = () => {
  return React.useContext(AppContext)
}