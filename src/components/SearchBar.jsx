import React from "react"
import {FaSearch} from "react-icons/fa"
import {useAppState} from "../AppState.jsx"
import "./SearchBar.css"

const SearchBar = ({ setResults, allNotes }) => {
  const [input, setInput] = React.useState("");

  const fetchData = async (value) => {
    const results = allNotes.filter((note) =>
      note.title.toLowerCase().includes(value.toLowerCase()) ||
      note.body.toLowerCase().includes(value.toLowerCase())
    );
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon"/>
      <input 
        className="search-bar-input" 
        placeholder="Type to search..." 
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;