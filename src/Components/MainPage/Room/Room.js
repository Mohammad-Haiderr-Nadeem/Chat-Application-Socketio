/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import styles from './Room.module.css'
import NavbarComponent from '../../Navbar/Navbar'
import Tenant from './Tenants/Tenants'

function Room ({ rooms, id, name, setName }) {
  const filteredRoom = rooms?.filter((room) => room.id === id)
  const [value, setValue] = useState(0)

  return (
    <React.Fragment>
      <NavbarComponent name={name} setName={setName} />
      {filteredRoom
        ? (
        <div className={styles.roomDetails}>
          <img
            src={filteredRoom[0].image}
            alt={filteredRoom[0].name}
            className={styles.roomImage}
          />
          <div className={styles.roomInfo}>
            <h2 className={styles.roomName}>{filteredRoom[0].name}</h2>
            <p className={styles.roomType}>Type: {filteredRoom[0].type}</p>
            <p className={styles.roomLocation}>
              Location: {filteredRoom[0].town}, {filteredRoom[0].city}
            </p>
            <p className={styles.roomPrice}>
              Price: ${filteredRoom[0].price} per night
            </p>
          </div>
          <div className={styles.ratingsContainer}>
            <Box
              sx={{
                '& > legend': { mt: 2 }
              }}
            >
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue)
                }}
              />
            </Box>
          </div>
        </div>
          )
        : (
        <div className={styles.roomDetails}>
          <p>Room not found.</p>
        </div>
          )}
      <Tenant />
    </React.Fragment>
  )
}

export default Room
