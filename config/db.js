const mongoose = require('mongoose');

//Mongoose returns a promise so we will use async and await
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`\nMongoDB Connected: ${conn.connection.host}`.brightBlue.bold);
};

module.exports = connectDB;
