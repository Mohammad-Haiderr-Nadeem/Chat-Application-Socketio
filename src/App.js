/* eslint-disable semi */
import React, { useState } from 'react';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './Components/MainPage/MainPage';
import './index.css';
import Chat from './Components/Chat/Chat';
import Temp from './Components/Temp/Temp';
import Temp2 from './Components/Temp2/Temp2';
import Temp3 from './Components/Temp3/Temp3';
import Temp4 from './Components/Temp4/Temp4';
import ProfileForm from './Components/ProfileForm/ProfileForm';
// import Room from './Components/MainPage/Room/Room'

function App () {
  const [name, setName] = useState('');
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route
          exact
          path="/login"
          element={<Login name={name} setName={setName} />}
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/home" element={<MainPage name={name} setName={setName} />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/forge" element={<Temp />} />
        <Route exact path="/crypto" element={<Temp2 />} />
        <Route exact path="/argon" element={<Temp3 />} />
        <Route exact path="/bcrypt" element={<Temp4 />} />
        <Route exact path="/profileform" element={<ProfileForm /> } />
        {/* <Route exact path="/room/:id" element={<Room /> } /> */}
        <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
