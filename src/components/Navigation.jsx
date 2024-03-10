import React from "react";
import {Link, useNavigate} from "react-router-dom"
import {useAppState} from "../AppState.jsx"

const Navigation = (props) => {
  const navigate = useNavigate();
  const {state, dispatch} = useAppState();

  return <header>
    <h1> Dimitar Nikolov's Note Taking App
      <nav>
        {!state.token ? (
            <>
              <Link to="/"><div className="nav-item">Home</div></Link>
              <Link to="/auth/signup"><div className="nav-item">Signup</div></Link>
              <Link to="/auth/login"><div className="nav-item">Login</div></Link>
            </>
          ) : (
            <>
              <div className="logout-container">
                <div onClick={() => {
                    dispatch({ type: "logout" });
                    navigate("/");
                  }} className="nav-item">
                  Logout
                </div>
              </div>
            </>
          )}
      </nav>
    </h1>
  </header>
};

export default Navigation;