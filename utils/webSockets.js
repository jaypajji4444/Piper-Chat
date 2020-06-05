const http = require("http")
const socketIo= require("socket.io");
const attactChatApp=(app)=>{
    const server=http.createServer(app)
    const io = socketIo(server)

    io.on("connection",(socket)=>{
        console.log(`${socket.id} connecte successfullt`)
        socket.emit("coolpa","coolpa")
    })
    
    return server;
}

module.exports=attactChatApp