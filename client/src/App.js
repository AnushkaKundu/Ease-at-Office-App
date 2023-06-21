import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';

function App() {
  const [username, setLoginUser] = useState('');

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              username ? (
                <Homepage username={username} setLoginUser={setLoginUser} />
              ) : (
                <div className="content">
                  <Login setLoginUser={setLoginUser} />
                </div>
              )
            }
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<div className="content"><Register /></div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
