/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React, { useState } from 'react';
import styles from './login.module.css';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../Navbar/Navbar';
import axios from 'axios';
import Form from '../Common/Form/Form';
import Cookies from 'js-cookie';

function Login ({ name, setName }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnclickSpan = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/loginUser', {
        email,
        password
      });
      console.log('hashed password: ', res.data.user.password);
      setName(res.data.name);
      Cookies.set('accessToken', res.data.token);
      Cookies.set('username', res.data.name);
      setPassword('');
      setEmail('');
      navigate('/home');
    } catch (err) {
      console.log('error logging in', err);
      if (err.response.data.msg === 'INVALID_EMAIL') {
        alert('INVALID EMAIL');
      } else if (err.response.data.msg === 'INVALID_PASSWORD') {
        alert('INVALID PASSWORD');
      } else if (err.response.data.msg === 'EMPTY') {
        alert('EMPTY PASSWORD OR EMAIL');
      }
    }
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassowrd = (e) => {
    setPassword(e.target.value);
  };

  return (
    <React.Fragment>
      <NavbarComponent name={name} />
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Mera RooMate</h2>
          <Form
            handleSubmit={handleSubmit}
            email={email}
            password={password}
            handleOnChangeEmail={handleOnChangeEmail}
            handleOnChangePassowrd={handleOnChangePassowrd}
            handleOnclickSpan={handleOnclickSpan}
            buttonText={'Login'}
            spanText={'Do you want a roommate?'}
            spanButton={' Register here'}
          ></Form>
        </div>
        <div className={styles.companyLogo}>
          <Carousel>
            <Carousel.Item>
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5ODY3MDgyMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                height={'500px'}
                width={'500px'}
                alt="room"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5ODc2MTg1MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                height={'500px'}
                width={'500px'}
                alt="room bed"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5ODc2MTkwMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                height={'500px'}
                width={'500px'}
                alt="room table"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
