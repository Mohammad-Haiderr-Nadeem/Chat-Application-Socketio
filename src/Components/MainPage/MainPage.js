/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React, { useEffect, useState } from 'react';
import HomePage from './HomePage/HomePage';
import Room from './Room/Room';
import axios from 'axios';
import Cookies from 'js-cookie';

function MainPage ({ name, setName }) {
  const [isHomePage, setIsHomePage] = useState(true);
  const [id, setId] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const res = await axios.get('http://localhost:8000/getUser', {
        params: { name: Cookies.get('username') }
      });
      setUserName(res.data.name);
    } catch (err) {
      console.log('error in fetching name: ', err);
    }
  };

  const rooms = [
    {
      id: 1,
      type: 'Single',
      name: 'A-ONE Hostels',
      town: 'Faisal Town',
      city: 'Lahore',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5ODc2MTg1MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    },
    {
      id: 2,
      type: 'Double',
      name: 'Embassy Lodges',
      town: 'Bahria Town',
      city: 'Islamabad',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTM0MTEzMA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    },
    {
      id: 3,
      name: 'Good Hostels',
      type: 'Shared',
      town: 'DHA',
      city: 'Karachi',
      price: 80,
      image:
        'https://images.unsplash.com/photo-1505409628601-edc9af17fda6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTM0MTE2NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    },
    {
      id: 4,
      type: 'Single',
      name: 'PC Hotels',
      town: 'Model Town',
      city: 'Lahore',
      price: 120,
      image:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5ODc2MTg1MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    },
    {
      id: 5,
      type: 'Double',
      town: 'Bahria Town',
      name: 'Serena',
      city: 'Islamabad',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTM0MTEzMA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    },
    {
      id: 6,
      type: 'Single',
      town: 'Johar Twon',
      name: 'HotelOne',
      city: 'Lahore',
      price: 80,
      image:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5ODc2MTg1MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    },
    {
      id: 7,
      type: 'Double',
      name: 'Fine Hostels',
      town: 'Bahria Town',
      city: 'Islamabad',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTM0MTEzMA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    }
  ];

  return (
    <React.Fragment>
      {isHomePage
        ? (
        <HomePage
          setIsHomePage={setIsHomePage}
          rooms={rooms}
          setId={setId}
          name={userName}
          setName={setUserName}
        />
          )
        : (
        <Room rooms={rooms} id={id} name={userName} setName={setUserName} />
          )}
    </React.Fragment>
  );
}

export default MainPage;
