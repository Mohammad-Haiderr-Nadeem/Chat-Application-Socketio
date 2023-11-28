/* eslint-disable semi */
import React, { useState } from 'react';
import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Form from '../Common/Form/Form';

function Signup () {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleOnclickSpan = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/signupUser', {
        name,
        email,
        password
      });
      if (res) {
        navigate('/login');
      }
      setPassword('');
      setEmail('');
      setName('');
    } catch (err) {
      console.log('error signing in', err);
    }
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassowrd = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <h2>Mera RooMate</h2>
          <Form
            handleSubmit={handleSubmit}
            email={email}
            password={password}
            handleOnChangeEmail={handleOnChangeEmail}
            handleOnChangePassowrd={handleOnChangePassowrd}
            handleOnclickSpan={handleOnclickSpan}
            buttonText={'Register here!!'}
            spanText={'I want a roommate!!'}
            spanButton={'Go'}
          >
            <div className={styles.inputContainer}>
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                onChange={handleOnChangeName}
                value={name}
                required
              />
            </div>
          </Form>
        </div>
        <div className={styles.companyLogo}>
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5ODY3MDgyMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
            height={'500px'}
            width={'500px'}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
