import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        email,
        password,
      });
      setMessage('Signup successful!');
      console.log(response.data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Signup failed');
    }
  };

  function handleNotificationClose() {
    (document.querySelectorAll('.notification .delete') || []).forEach(
      ($delete) => {
        const $notification = $delete.parentNode;
        $notification?.parentNode?.removeChild($notification);
      }
    );
  }

  function checkConfirmPassword() {
    if (confirmPassword !== password) {
      setErrorMessageConfirmPassword('Passwords mismatch');
    } else {
      setErrorMessageConfirmPassword('');
    }
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
            <p className="title has-text-white">Signup</p>
          </div>
        </section>
        <section className="section">
          <form onSubmit={handleSignup}>
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
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setConfirmPassword('');
                  }}
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <p className="help"></p>
            </div>
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyUp={(e) => checkConfirmPassword()}
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              {errorMessageConfirmPassword && (
                <p className="help is-danger">{errorMessageConfirmPassword}</p>
              )}
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Signup
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Signup;
