/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React from 'react';
import styles from './UserRoom.module.css';

function UserRoom ({ user, setUser, room, setRoom, socket }) {
  const joinRoom = () => {
    if (user && room) {
      socket.emit('join_room', { user, room });
    }
  };

  return (
    <React.Fragment>
      <div className={styles.joinChatContainer}>
        <input
          type="text"
          placeholder="Name"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          required
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </React.Fragment>
  );
}

export default UserRoom;
