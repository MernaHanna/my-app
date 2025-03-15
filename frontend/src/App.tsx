import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bulma/css/versions/bulma-no-dark-mode.css';
import Signup from './components/SignUp';
import Login from './components/Login';
import logo from './logo.png';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar container" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <figure className='image'>
              <img src={logo} alt="logo" style={{ width: "auto", height: "100%" }} />
            </figure>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/signup" className="button is-primary">
                  <strong>Signup</strong>
                </Link>
                <Link to="/login" className="button is-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Welcome to the Portal</h1>} />
      </Routes>
    </Router>
  );
};

export default App;