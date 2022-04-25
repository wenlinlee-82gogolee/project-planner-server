//pull dotenv and use config()to load our variables
require('dotenv').config();
//pull the express library
const express = require('express');
//create an app variable which we can use to configure our server
const app = express();
//pull the mongoose library to connect to our mongoDB database
const mongoose = require('mongoose');

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

//connect to our database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
//if here is any error
db.on('error', error => console.error(error));
//.once means when it runs our database we will..
db.once('open', () => console.log('connected to db'));

//accept json use() will accpt any middleware
//let our server accept json as a body inside a post element or get element
app.use(express.json());

//set up our routes
const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter); //path of our route

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Started on port ${port}`));
