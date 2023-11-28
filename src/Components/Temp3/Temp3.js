/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React, { useState } from 'react';
import styles from './Temp3.module.css';
import NavbarComponent from '../Navbar/Navbar';
import axios from 'axios';

function Temp3 ({ name, setName }) {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');
  const [generatedHash, setGeneratedHash] = useState('');
  const [myPassword, setMyPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/generateHashArgon', {
        text
      });
      setGeneratedHash(res.data.hash);
      setText('');
    } catch (err) {
      console.log('error logging in', err);
    }
  };

  const handleOnChangeText = (e) => {
    setText(e.target.value);
  };

  const handleOnChangeMyPassword = (e) => {
    setMyPassword(e.target.value);
  };

  const handleOnChangeHash = (e) => {
    setHash(e.target.value);
  }

  const handlePasswordValidity = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/validateHashArgon', { hash, myPassword });
      if (res.data.msg === 'SUCCESSFUL') {
        alert('VALID!');
        setMyPassword('');
      }
    } catch (err) {
      console.log('error in checking password validity', err);
      if (err.response.data.msg === 'UNSUCCESSFUL') {
        alert('INVALID!');
      }
    }
  };

  return (
    <React.Fragment>
      <NavbarComponent name={name} />
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Hash Validator</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="text">Text: </label>
            <input type="text" value={text} onChange={handleOnChangeText} required/>
            <label htmlFor="generatedHash">Generated Hash: </label>
            <input
              type="text"
              value={generatedHash}
              readOnly
            />
            <button type="submit" className={styles.loginButton}>
              Generate Hash
            </button>
          </form>
        </div>
        <div className={styles.companyLogo}>
          <form onSubmit={handlePasswordValidity}>
            <label htmlFor="hash">Hashed Password: </label>
            <input type="text" onChange={handleOnChangeHash} value={hash} />
            <label htmlFor="myPassword">Your Password: </label>
            <input
              type="password"
              value={myPassword}
              onChange={handleOnChangeMyPassword}
            />
            <button type="submit" className={styles.loginButton}>
              Check Validity
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Temp3;
