import * as io from 'socket.io-client';
const events = require("events")

class SocketChat{
    constructor(){
        this.socket=null;
        this.eventEmitter = new events.EventEmitter()
    }

    establishConnection(){
        try{
            this.socket=io("http://localhost:5000")
            console.log(this.socket)
        }
        catch(err){
            console.log(err)
        }
    }

    authenticate(token){
        this.socket.emit("authenticate",token)
    }

    sendMessage(message){
        this.socket.emit("privateMessage",message)
    }

    receiveMessage(){
        this.socket.on("privateMessage",(data)=>{
            this.eventEmitter.emit('add-message-response', data);
        })
    }

    openChat(chatID){
        this.socket.emit("open chat",chatID)
    }

    receiveChat(){
        this.socket.on("history",data=>{
            console.log(data)
        })

        this.socket.on("open chat success",(data)=>{
            console.log(data)
        })
    }
}

export default new SocketChat();