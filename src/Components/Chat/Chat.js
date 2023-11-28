/* eslint-disable semi */
import React, { useState } from 'react';
import NavbarComponent from '../Navbar/Navbar';
import styles from './Chat.module.css';
import { io } from 'socket.io-client';
// import ScrollToBottom from 'react-scroll-to-bottom';
import UserChat from './UserChat/UserChat';
import UserRoom from './UserRoom/UserRoom';

function Chat () {
  const socket = io('http://localhost:8000');

  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');

  return (
    <React.Fragment>
      <NavbarComponent />
      <h1 className={styles.myTitle}>Join Room</h1>
      {/* <div className={styles.joinChatContainer}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Room"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          required
        />
        <button onClick={joinRoom}>Join Room</button>
      </div> */}

      {/* <div className={styles.chatWindow}>
        <div className={styles.chatHeader}>
          <p>Live Chat of room: {room}</p>
        </div>
        <div className={styles.chatBody}>
          <ScrollToBottom className={styles.messageContainer}>
            {listOfMessages?.map((content) => (
              <div
                className={styles.message}
                key={content.time}
                id={content.user === user ? styles.you : styles.other}
              >
                <div>
                  <div className={styles.messageContent}>
                    <p>{content.message}</p>
                  </div>
                  <div className={styles.messageMeta}>
                    <p id={styles.time}>{content.time}</p>
                    <p id={styles.author}>{content.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className={styles.chatFooter}>
          <input
            type="text"
            placeholder="Write your message..."
            required
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === 'Enter' && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div> */}

      <UserRoom
        user={user}
        setUser={setUser}
        room={room}
        setRoom={setRoom}
        socket={socket}
      />

      <UserChat
        socket={socket}
        room={room}
        user={user}
        message={message}
        setMessage={setMessage}
      />
    </React.Fragment>
  );
}

export default Chat;
