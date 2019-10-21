const express = require('express');
const posts = express.Router();
const Post = require('../models/Posts');
const cors = require('cors');

posts.use(cors());

posts.post('/save', (req, res) => {

  const postData = {
    title: req.body.title,
    author: req.body.author,
    postdate: req.body.postdate,
    image: req.body.image,
    content: req.body.content,
    updated_on: req.body.updated_on,
    status: req.body.status,
    tag: req.body.tag
  }

  console.log(postData)

  Post.create(postData)
  .then(() => {
    res.json({status:'post registered'})
  })
  .catch(err => {
    res.send('error:' + err)
  })
})

posts.post('/blog', (req, res) => {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meanloginreg");
    dbo.collection("posts").find({}).toArray(function(err, result) {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      } else{
        res.json(result);
      }
      db.close();
    });
  });   
})

posts.get('/viewposts', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meanloginreg");
    dbo.collection("posts").find({}).toArray(function(err, result) {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      } else{
        res.json(result);
      }
      db.close();
    });
  });
})

posts.post('/delete', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  console.log(req.body.id)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meanloginreg");
    var myquery = { author: req.body.author };
    dbo.collection("posts").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      // res.send("ok");
      db.close();
    });
  });
})

posts.post('/published', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meanloginreg");
    var myquery = { author: req.body.author };
    var newvalues = { $set: { status: "published" } };
    dbo.collection("posts").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
})


module.exports = posts;
