import React from "react";
import {Link, useParams, useNavigate} from "react-router-dom"
import {useAppState} from "../AppState.jsx"

const Form = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const {state, dispatch} = useAppState();
  const {token} = state;
  const action = params.action;
  const [formData, setFormData] = React.useState(state[action] || {title: '', body: ''});

  const actions = {
    new: () => {
      return fetch(state.url + "/notes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json());
    },
    edit: () => {
      return fetch(state.url + "/notes/" + state.edit.id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json());
    }
  };

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name] : event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions[action]().then((data) => {
      props.getNotes();
      navigate("/dashboard");
    });
  };

  return(
    <div className="form">
      <form onSubmit={handleSubmit}>
      {(action !== "delete") && (
          <>
        <input type="text" name="title" value={formData.title} onChange={handleChange}/>
        <input type="text" name="body" value={formData.body} onChange={handleChange}/>
        <input type="submit" value={action} onChange={handleChange}/>
        </>)}
      </form>
    </div>);
};

export default Form;