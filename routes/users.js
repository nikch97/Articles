var express = require('express');
var router = express.Router();
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'public/images/users' })
const User = require('../models/users')
const Article = require('../models/articles')
router.use(cors())
process.env.SECRET_KEY = 'secret'


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


/////sign up//////


router.post('/register', upload.single('avatar'), function (req, res, next) {
  console.log(req.body)
  const tempPath = req.file.path;
  console.log(tempPath)
  fs.rename(tempPath, req.file.destination + "/" + req.file.originalname, function (err) {
    if (err) {
      res.send(err)
    }
  })
  const BODY = req.body;
  const FILE = req.file;

  const userData = {

    name: BODY.name,
    family: BODY.family,
    mobile: BODY.mobile,
    username: BODY.username,
    password: BODY.password,
    gender: BODY.gender,
    avatar: 'images/users/' + FILE.originalname,
    role: 2
  }

  User.findOne({
    username: BODY.username
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(BODY.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.username + ' registered!' })
            })
            .catch(err => {
              res.send('error:' + err)
            })
        })
      }
      else {
        res.json({ error: 'User already exist! ' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })

})


////login////

router.post('/login', function (req, res) {

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payLoad = {
            _id: user._id,
            name: user.name,
            family: user.family,
            username: user.username
          }
          let token = jwt.sign(payLoad, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        } else {
          res.json({ error: "user does not exist!" })
        }
      } else {
        res.json({ error: "user does not exist!" })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })

})


router.post('/profile', (req, res) => {
  //get data from front end local storage
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send("User does not exist!")
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

router.post('/add-article', upload.single('pic'), function (req, res, next) {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send("User does not exist!")
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
  // console.log(req.body)
  // const tempPath = req.file.path;
  // fs.rename(tempPath, req.file.destination + "/" + req.file.originalname, function (err) {
  //   if (err) {
  //     res.send(err)
  //   }
  // })
  const BODY = req.body;
  const FILE = req.file;

  const articleData = {

    title: BODY.title,
    author: decoded.username,
    text: BODY.text,
    // pic: 'images/users/' + FILE.originalname,
    date: new Date().toLocaleDateString()
  }


  Article.create(articleData)
    .then(article => {
      res.json({ status: article.title + 'created!' })
    })
    .catch(err => {
      res.send('error:' + err)
    })
})



module.exports = router;
