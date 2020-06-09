const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieparser = require('cookie-parser')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')
const cors = require('cors');
const bodyParser = require("body-parser");

//load env vars
dotenv.config({
  path: './config/config.env'
});



//Route files
const auth = require('./routes/auth');
const chat = require('./routes/chat');

const app = express();

// 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//disable cors
app.use(cors());

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieparser())

//Dev middleware Morgan (request logger)
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

//Mount routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/chat',chat)
app.use(errorHandler);





module.exports=app;