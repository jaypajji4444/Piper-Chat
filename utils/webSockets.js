const http = require("http")
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken")
const Conversation = require("../models/Conversations");
const mongoose=require("mongoose")

const attactChatApp = (app) => {
    const server = http.createServer(app)
    const io = socketIo(server)
    // Socket-chats mapper
    const socketChatMap = {};
    // Socket-user mapper
    const socketUserMap = {};

    io.on("connection", (socket) => {
        //console.log(`Socket ${socket.id} connected !!!`)
        // Authenticate user
        socket.on('authenticate', async (token) => {
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);
                socketUserMap[socket] = decoded.id
                console.log("@@@@@@@@@@@@@@@@@@2")

            } catch (err) {
                console.log('error', err);
                socket.emit('status', {
                    code: 401,
                    msg: 'User not authenticated',
                    err,
                });
            }
        });

        socket.on('open chat', async (id) => {
            const chat = await Conversation.findOne({ _id:id});
            console.log("Chat:",chat!==undefined);
            if (!chat) {
                console.log("chat not found")
                return socket.emit('status', {
                    code: 400,
                    msg: 'Chat not found',
                });
            }
            if (socketUserMap[socket] != chat.recipents[0] && socketUserMap[socket] != chat.recipents[1]) {
                console.log("user not found")
                return socket.emit('status', {
                    code: 403,
                    msg: 'User not found in the chats',
                });
            }
            socket.join(chatId);
            socket.leave(socketChatMap[socket]);
            socketChatMap[socket] = chatId;
            socket.emit('open chat success', chatId);
            return socket.emit('history', chat.messages); // Sending in the old messages saved using the chatId in the db
        });


        socket.on('privateMessage', async(data) => {
            if (!socketUserMap[socket]) {
                console.log("not auth")
                socket.emit('status', {
                    code: 403,
                    msg: 'User not authenticated',
                });
            }
            // No chat openned
            if (!socketChatMap[socket]) {
                console.log("No chat")
                socket.emit('status', {
                    code: 400,
                    msg: 'No chat openned',
                });
            }

            console.log('Received ', data.message);
            const conversation = await Conversation.findByIdAndUpdate(socketChatMap[socket],{
                $push:{messages:data.message},
                lastMessage:data.message.body
            })

            console.log("@@@@@@@@@@@@ Chat @@@@@@@@@@@")
            io.to(socketChatMap[socket]).emit("privateMessage", { msg: conversation.lastMessage })
            //io.sockets.sockets[socket.id].emit("privateMessage", { msg: chat.lastMessage })
            
        })
        socket.on('disconnect', () => {
            // Delete user and chat info from cache table
            delete socketUserMap[socket];
            delete socketChatMap[socket];
        });
    })

    return server;
}

module.exports = attactChatApp