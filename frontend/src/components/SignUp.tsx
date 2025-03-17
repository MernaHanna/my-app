import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState('');
  const [invalidPassword, setInvalidPassword] = useState('');
  const letter = document.getElementById('letter');
  const capital = document.getElementById('capital');
  const number = document.getElementById('number');
  const length = document.getElementById('length');
  const special = document.getElementById('special');

  const { user, token } = useAuth();
  if (token) return <Navigate to="/profile" replace />;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      errorMessageName ||
      errorMessageEmail ||
      invalidPassword ||
      errorMessageConfirmPassword
    ) {
      console.log(
        errorMessageName,
        errorMessageEmail,
        invalidPassword,
        errorMessageConfirmPassword
      );
      // console.log('here');

      setErrorMessage('Some Fields are missing or not valid');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/user/signup', {
          name,
          email,
          password,
        });
        setMessage('Signup successful!');
        console.log(response.data);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || 'Signup failed');
      }
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

  function checkName() {
    if (name.length < 3) {
      setErrorMessageName('Name must be at least 3 characters long');
    } else {
      setErrorMessageName('');
    }
  }

  function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!RegExp(emailRegex).exec(email)) {
      setErrorMessageEmail('Invalid email format');
    } else {
      setErrorMessageEmail('');
    }
  }

  function checkConfirmPassword() {
    if (confirmPassword !== password) {
      setErrorMessageConfirmPassword('Passwords mismatch');
    } else {
      setErrorMessageConfirmPassword('');
    }
  }

  function checkPassword() {
    let isValid = true;

    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g;
    if (RegExp(lowerCaseLetters).exec(password)) {
      letter?.classList.remove('is-danger');
      letter?.classList.add('is-success');
    } else {
      letter?.classList.remove('is-success');
      letter?.classList.add('is-danger');
      isValid = false;
      console.log(1);
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;
    if (RegExp(upperCaseLetters).exec(password)) {
      capital?.classList.remove('is-danger');
      capital?.classList.add('is-success');
    } else {
      capital?.classList.remove('is-success');
      capital?.classList.add('is-danger');
      isValid = false;
      console.log(2);
    }

    // Validate numbers
    const numbers = /[0-9]/g;
    if (RegExp(numbers).exec(password)) {
      number?.classList.remove('is-danger');
      number?.classList.add('is-success');
    } else {
      number?.classList.remove('is-success');
      number?.classList.add('is-danger');
      isValid = false;
      console.log(3);
    }

    // Validate special characters
    const specialCharacters = /[^a-zA-Z0-9\s]/g;
    if (RegExp(specialCharacters).exec(password)) {
      special?.classList.remove('is-danger');
      special?.classList.add('is-success');
    } else {
      special?.classList.remove('is-success');
      special?.classList.add('is-danger');
      isValid = false;
      console.log(4);
    }

    // Validate length
    if (password.length >= 8) {
      length?.classList.remove('is-danger');
      length?.classList.add('is-success');
    } else {
      length?.classList.remove('is-success');
      length?.classList.add('is-danger');
      isValid = false;
      console.log(5);
    }

    if (!isValid) {
      setInvalidPassword('Invalid Password');
    } else {
      setInvalidPassword('');
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
              <label className="label">Name</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={(e) => {
                    checkName();
                  }}
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              {errorMessageName && (
                <p className="help is-danger">{errorMessageName}</p>
              )}
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={(e) => {
                    checkEmail();
                  }}
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              {errorMessageEmail && (
                <p className="help is-danger">{errorMessageEmail}</p>
              )}
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
                  onKeyUp={(e) => {
                    checkPassword();
                  }}
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <div id="message">
                <h3>Password must contain the following:</h3>
                <p id="letter" className="help is-danger">
                  A <b>lowercase</b> letter
                </p>
                <p id="capital" className="help is-danger">
                  A <b>capital (uppercase)</b> letter
                </p>
                <p id="number" className="help is-danger">
                  A <b>number</b>
                </p>
                <p id="special" className="help is-danger">
                  A <b>special character</b>
                </p>
                <p id="length" className="help is-danger">
                  Minimum <b>8 characters</b>
                </p>
              </div>
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
