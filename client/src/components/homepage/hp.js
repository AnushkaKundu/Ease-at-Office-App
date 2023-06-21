import React from "react";
import "./hp.css";

const Homepage = ({ setLoginUser, username }) => {
  return (
    <div className="homepage">
      <h1>Hello Homepage</h1>
      {username && <h2>Hi! {username}</h2>}
      <div className="button" onClick={() => setLoginUser("")}>
        Logout
      </div>
    </div>
  );
};

export default Homepage;
