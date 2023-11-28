/* eslint-disable semi */
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const { sequelize } = require('./models');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  })
);
app.use(cookieParser());

const usersRoute = require('./Routes/Users');

app.use(express.json());
app.use('/', usersRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: ['http://localhost:3000'], methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id} `);

  socket.on('join_room', (data) => {
    socket.join(data.room);
    console.log(`User with name: ${data.user} joined the room: ${data.room}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('received_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id} `);
  });
});

const PORT = 8000;
server.listen(PORT, async () => {
  console.log('Server running on port 8000');
  try {
    await sequelize.authenticate();
    console.log('database connection has been established');
  } catch (err) {
    console.log('error in authentication')
  }
}); // code
