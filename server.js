const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieparser = require('cookie-parser')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')

//load env vars
dotenv.config({
  path: './config/config.env'
});

//Connect to database
connectDB();

//Route files
const auth = require('./routes/auth')

const app = express();

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieparser())

//Dev middleware Morgan (request logger)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/auth', auth)
app.use(errorHandler);

//access env vars
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `\nThe server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightBlue.bold
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold.underline);
  //close server and exit process
  server.close(() => process.exit(1));
});
