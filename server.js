const express = require('express');
const bodyparser = require('body-parser');
const posts = require('./server/routes/Post');
const users = require('./server/routes/User');
const port = 3000;
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use('/posts', posts);
app.use('/users', users);
app.use(cors());

//DataBase
const mongoURI = 'mongodb://localhost:27017/meanloginreg'

mongoose
  .connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log())

app.get('/', function(req, res){
  res.send('Hello from server');
});

app.listen(port, function(){
  console.log("Server is run" + port);
});
