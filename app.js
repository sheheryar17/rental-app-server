const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//helps us manage environment variables and preevnt writing secret values
require('dotenv').config();
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(cors());


// Requiring Routes
const CarsRoutes = require('./routes/cars.routes');
const UsersRoutes = require('./routes/users.routes');

// connection to mongoose
const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon,{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });


const fs = require('fs');
fs.readdirSync(__dirname + "/models").forEach(function(file) {
    require(__dirname + "/models/" + file);
});

// in case you want to serve images 
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));
app.use(express.static('uploads/users'));

app.get('/',  function (req, res) {
  res.status(200).send({
    message: 'Express backend server'});
});

app.set('port', (3000));

app.use(accessControls);
app.use(cors());

// Routes which should handle requests
app.use("/users",UsersRoutes);
app.use("/cars", CarsRoutes);
// app.use("/users", userRoutes);

app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get('port'));
console.log('listening on port',app.get('port'));
