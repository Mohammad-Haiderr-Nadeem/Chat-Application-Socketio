/* eslint-disable react/prop-types */
import React from 'react'
import styles from './RoomList.module.css'

function RoomList ({ roomType, search, sortOrder, setIsHomePage, rooms, setId }) {
  const filteredRooms = rooms
    .filter((room) => {
      return (
        room.type.toLowerCase() === roomType.toLowerCase() &&
        (room.town.toLowerCase().includes(search.toLowerCase()) ||
          room.city.toLowerCase().includes(search.toLowerCase()))
      )
    })
    .slice()

  if (sortOrder === 'highToLow') {
    filteredRooms.sort((a, b) => b.price - a.price)
  } else if (sortOrder === 'lowToHigh') {
    filteredRooms.sort((a, b) => a.price - b.price)
  }

  const handleOnClickRoom = (id) => {
    setId(id)
    setIsHomePage(false)
  }

  return (
    <div className={styles.roomListTitle}>
      <h2 className={styles.myTitle}>Dhoondo Apna Kamra</h2>
      <div className={styles.roomsContainer}>
        {filteredRooms.map((room) => (
          <div
            className={styles.roomCard}
            key={room.id}
            onClick={(e) => handleOnClickRoom(room.id)}
          >
            <div className={styles.roomImage} >
              <img src={room.image} alt={`${room.type} Image`} />
            </div>
            <div className={styles.roomDetails} >
              <h3>{room.name}</h3>
              <p>City: {room.city}</p>
              <p>Area: {room.town}</p>
              <p>Price: ${room.price} per night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomList
