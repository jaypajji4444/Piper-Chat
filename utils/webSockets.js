const http = require("http")
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken")
const Conversation = require("../models/Conversations");
// @@@@@@@@@@@@@ Working @@@@@@@@@@@@@@

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
                socketUserMap[socket.id] = decoded.id
                console.log("AuthenticateUser:",socketUserMap[socket.id])
                console.log("AuthenticateSocket:",socket.id)
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
        
            console.log("ChatID",chat._id)
            
            if (!chat) {
                console.log("chat not found")
                return socket.emit('status', {
                    code: 400,
                    msg: 'Chat not found',
                });
            }
            if (socketUserMap[socket.id] !== chat.recipents[0].toString() && socketUserMap[socket.id] !== chat.recipents[1].toString()) {
                console.log("user not found")
                return socket.emit('status', {
                    code: 403,
                    msg: 'User not found in the chats',
                });
            }
        
            console.log("Room Joined:",id)  
            // @@@@ join @@@@@@@@@@@@@@
            socket.join(id)
            console.log("Room join Socket:",socket.id)
            console.log("Room Leave",socketChatMap[socket.id])
            console.log("Room Leave Socket",socket.id)
            console.log("Room Leave user:",socketUserMap[socket.id])
            // @@@@@@ leave @@@@@@@@@@@
            socket.leave(socketChatMap[socket.id]);
            // @@ add @@@@@@@@@@@@@@
            socketChatMap[socket.id] = id;
            console.log("socket Chat socket",socket.id)
            console.log("socket Chat room",socketChatMap[socket.id])
            socket.emit('open chat success', id);
             socket.emit('history', chat.messages); // Sending in the old messages saved using the chatId in the db
        });


        socket.on('privateMessage', async(message) => {
            console.log("Msg Sockeet",socket.id)
            console.log("msg user:",socketUserMap[socket.id])
            
            if (!socketUserMap[socket.id]) {
                console.log("not auth")
                socket.emit('status', {
                    code: 403,
                    msg: 'User not authenticated',
                });
            }
            // No chat openned
            if (!socketChatMap[socket.id]) {
                console.log("No chat")
                socket.emit('status', {
                    code: 400,
                    msg: 'No chat openned',
                });
            }

            console.log('Received: ', message);
            const messageObject ={
                from:socketUserMap[socket.id],
                body:message,
                date: new Date().toISOString()
            }
            console.log("MESSAGE",message)
            const conversation = await Conversation.findByIdAndUpdate(socketChatMap[socket.id],{
                $push:{messages:messageObject},
            })
            conversation.lastMessage=message
            await conversation.save()
            
            console.log("@@@@@@@@@@@@ Chat @@@@@@@@@@@")
            console.log("current scoket",socket.id)
            console.log("current user:",socketUserMap[socket.id])
            console.log("To ROOM",socketChatMap[socket.id])
           // console.log(io.sockets.clients(socketChatMap[socket.id]))
            //io.to(socketChatMap[socket.id]).emit("privateMessage", messageObject)
            io.to(socketChatMap[socket.id]).emit("privateMessage", {messages:[...conversation.messages,messageObject]})
            //io.sockets.sockets[socket.id].emit("privateMessage", { msg: chat.lastMessage })
            
        })
        socket.on('disconnect', () => {
            // Delete user and chat info from cache table
            console.log(socket.id," disconnected")
            delete socketUserMap[socket.id];
            delete socketChatMap[socket.id];
        });
    })

    return server;
}

module.exports = attactChatApp