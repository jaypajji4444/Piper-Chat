const app = require("./app")
const connectDB = require('./config/db');
const attachChatApp= require("./utils/webSockets");


const main = async ()=>{
  //Connect to database
  await connectDB();

  // Websockets setup
  const server = attachChatApp(app);

   // Return after setup
  return server;

}

main().then((server)=>{
  
  //access env vars
const PORT = process.env.PORT || 5000;
  server.listen(PORT,()=>{
    console.log(
      `The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
        .brightBlue.bold
    )
  })

  //Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold.underline);
  //close server and exit process
  server.close(() => process.exit(1));
});

})





