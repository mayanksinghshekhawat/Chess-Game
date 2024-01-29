import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

const app = express();
const server = createServer(app);

const port = process.env.PORT || 8080;

// upgrade http server to websocket server
const io = new Server(server, {
    cors: '*', // this is done to allow connection from any origin
});

io.on('connection', (socket) => {
    console.log(socket.id, 'connected');

    socket.on('username', (username)=>{
        console.log('username: ',username);
        socket.data.username = username;

    })
});

server.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
});
