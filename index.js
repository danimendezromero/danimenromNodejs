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

crudRepository.createConnection();

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/media', require('./routes/mediaRoutes'));
app.use('/api/v1/capitols', require('./routes/capitolsRoutes'));

/*
app.post('/', function (req, res) {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
        if(err) {
            res.send(`error: ${err}`);
        } else {
            res.send(`Success: ${req.query.id} // ${req.body.name}`);
        }
    });
});
*/
app.listen(process.env.PORT);
