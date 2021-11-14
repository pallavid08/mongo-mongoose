require('dotenv').config();

const express = require('express');

//Require mongoose(install it from npm)
const mongoose = require('mongoose');

//Use the .connect() method to connect to mongo atlas. Remember to use username and password
mongoose
   .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mmebn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
   )
   .then((result) => console.log('Connected to MONGO ATLAS'))
   .catch((err) => console.log(err));

//Import the models
//All of the queries will be through the model
//Not required after introducing routes
const Student = require('./models/Student');
const School = require('./models/School');

const app = express();

//Middleware needed to receive the req.body
app.use(express.json());

//Routes
app.use('/api/students', require('./routes/students.routes'));
app.use('/api/schools', require('./routes/schools.routes'));

app.listen(5000, () => {
   console.log('Connected to Port 5000');
});
