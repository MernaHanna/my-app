import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { fetchWithoutAuth } from '../helpers/request.helper';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user, token } = useAuth();
  if (token) return <Navigate to="/profile" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchWithoutAuth(
      'auth/login',
      {
        email,
        password,
      },
      { method: 'POST' }
    )
      .then((response) => {
        setMessage('Login successful!');
        login(email, response.data.access_token);
      })
      .catch((error) =>
        setErrorMessage(error.response?.data?.message || 'Signup failed')
      );
    // try {
    //   const response = await axios.post('http://localhost:3000/auth/login', {
    //     email,
    //     password,
    //   });
    //   setMessage('Login successful!');
    //   // console.log(response.data);

    //   login(email, response.data.access_token);
    // } catch (error: any) {
    //   setErrorMessage(error.response?.data?.message || 'Login failed');
    // }
  };

  function handleNotificationClose() {
    (document.querySelectorAll('.notification .delete') || []).forEach(
      ($delete) => {
        const $notification = $delete.parentNode;
        $notification?.parentNode?.removeChild($notification);
      }
    );
  }

  return (
    <section className="section">
      <div className="box container is-max-tablet">
        {errorMessage && (
          <div className="notification is-danger">
            <button
              className="delete"
              onClick={handleNotificationClose}
            ></button>
            {errorMessage}
          </div>
        )}
        {message && (
          <div className="notification is-success">
            <button
              className="delete"
              onClick={handleNotificationClose}
            ></button>
            {message}
          </div>
        )}
        <section className="hero is-small is-primary">
          <div className="hero-body">
            <p className="title has-text-white">Login</p>
          </div>
        </section>
        <section className="section">
          <form onSubmit={handleLogin}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <p className="help"></p>
            </div>
            <div className="field">
              <label className="label">Password:</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Login;
