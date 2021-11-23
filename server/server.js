
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.sockets.on('connection', function (socket) {
    console.log('a user connected');
    socket.emit("message", {'message' : "123"})

    socket.on('message', function (data) {
        io.emit("message", data)

    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(8000)