import React from "react";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import {useAppState} from "../AppState.jsx"
import Form from "../components/Form.jsx"
import SearchBar from "../components/SearchBar.jsx"

const Dashboard = (props) => {
  const navigate = useNavigate();
  const {state, dispatch} = useAppState();
  const {token, url, notes, username} = state;
  const [filteredNotes, setFilteredNotes] = React.useState([]);

  const getNotes = async () => {
    const response = await fetch(url + "/notes/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token
      }
    });
    const fetchedNotes = await response.json();
    dispatch({type: "getNotes", payload: fetchedNotes});
    setFilteredNotes(fetchedNotes); // we initialize the filtered notes as all notes
  }

  React.useEffect(() => {
    getNotes();
  }, []);

  const loaded = () => {
    return (
      <>
        <div className="search-bar-container">
          <SearchBar setResults={setFilteredNotes} allNotes={notes}/>
        </div>
        <div className="dashboard">
          <h1>{username}'s notes</h1>
          <Link to="/dashboard/new"><button>New Note</button></Link>
          <Routes>
            <Route path="/dashboard/:action" element={<Form action="new" getNotes={getNotes} />}/>
          </Routes>
          <ul>
            {
              filteredNotes.map((note) => (
                <div className="note" key={note.id}>
                  <h2>{note.title}</h2>
                  <h4>{note.body}</h4>
                  <button onClick={() => {
                    dispatch({type: "select", payload: note});
                    navigate("/dashboard/edit");
                  }}>Edit Note</button>
                  <button onClick={() => {
                    fetch(url + "/notes/" + note.id, {
                      method: "delete",
                      headers: {
                        Authorization: "bearer " + token
                      }
                    })
                    .then(() => getNotes());
                    navigate("/dashboard/delete");
                  }}>Delete Note</button>
                </div>
              ))
            }
          </ul>
        </div>
      </>
    )};

  return notes ? loaded() : <h1>Loading...</h1>;

  return <h1>Dashboard of the system</h1>
};

export default Dashboard;