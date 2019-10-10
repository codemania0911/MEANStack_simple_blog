const express = require("express")
const users = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const cors = require('cors');

users.use(cors());

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    
    const userData = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    console.log(userData)

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json({status: user.email + 'Registered'})
                })
                .catch(err => {
                    res.send('error:' + err)
                })
            })
        }else{
            res.json({error: 'User already '})
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})

users.post('/login', (req, res) => {
    User.findOne({
        username:req.body.username
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload = {
                    _id: user._id,
                    name: user.name,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.status(200).send({token})
            }else{
                res.json({error: "User does not exist"})
            }
        }else{
            res.json({error: "User does not exist"})
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})

users.get('/viewusers', verifyToken, (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("meanloginreg");
        dbo.collection("users").find({}).toArray(function(err, result) {
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

users.post('/delete', verifyToken, (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("meanloginreg");
        var myquery = { username: req.body.username };
        dbo.collection("users").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          // res.send("ok");
          db.close();
        });
    });
})

users.post('/changerole', verifyToken, (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meanloginreg");
    var myquery = { username: req.body.username };
    var newvalues = { $set: { role: "admin" } };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
})

users.get('/access', verifyToken, (req, res) => {
    res.status(200).send("Success");
})

function verifyToken(req, res, next) {
    console.log("start1")
    if(!req.headers.authorization){
        console.log("verify")
        return res.status(401).send('Unauthorized request')
    }
    console.log("start2")
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        console.log("verify1")
        return res.status(401).send('Unauthorized request')
    }
    
    try {
        console.log("start3")
        let payload = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = payload.subject
        next();
    } catch (error) {
        console.log("start4")
        return res.status(401).send("Unothorized request")
    }
    // let payload = jwt.verify(token, process.env.SECRET_KEY)
    // console.log("start5")
    // if(!payload){
    //     console.log("verify2")
    //     return res.status(401).send('Unauthorized request')
    // }
    // 
    // console.log("verify3")
    // next()
}

users.get('/profile', verifyToken, (req, res) => {
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        if(user){
            res.json(user)
        }else{
            res.send("User does not exist")
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})
module.exports = users