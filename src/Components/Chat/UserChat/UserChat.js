/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import styles from './UserChat.module.css';

function UserChat ({ socket, room, user, message, setMessage }) {
  const [listOfMessages, setListOfMessages] = useState([]);

  const sendMessage = async () => {
    if (message) {
      const messageData = {
        room,
        user,
        message,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes() +
          ':' +
          new Date(Date.now()).getSeconds()
      };
      await socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('received_message', (data) => {
      setListOfMessages((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <React.Fragment>
     <div className={styles.chatWindow}>
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
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === 'Enter' && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserChat;
