const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const crudRepository = require('./database/crudRespository');

//const mongoose = require('mongoose');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

async function connectDB() {
  try{
      const responseFromDatabase = await crudRepository.createConnection();
  }catch(err) {
      console.log('ERROR-createConnection: ', err);
  }
}
connectDB();


app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/media', require('./routes/mediaRoutes'));
app.use('/api/v1/capitols', require('./routes/capitolsRoutes'));


app.listen(process.env.PORT);
