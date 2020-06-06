const http = require("http")
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken")
const attactChatApp = (app) => {
    const server = http.createServer(app)
    const io = socketIo(server)
    // Socket-chats mapper
    const socketChatMap = {};
    // Socket-user mapper
    const socketUserMap = {};

    io.on("connection", (socket) => {
        console.log(`Socket ${socket.id} connected !!!`)
        // Authenticate user
        socket.on('authenticate', async (token) => {
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);
                socketUserMap[socket]=decoded.id

            } catch (err) {
                console.log('error', err);
                socket.emit('status', {
                    code: 401,
                    msg: 'User not authenticated',
                    err,
                });
            }
        });
    })

    return server;
}

module.exports = attactChatApp