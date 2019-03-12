var express = require('express');
var router = express.Router();
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'public/images/users' })
const artload = multer({ dest: 'public/images/articles' })
const User = require('../models/users')
const Article = require('../models/articles')
router.use(cors())
process.env.SECRET_KEY = 'secret'


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
function time() {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  return dateTime;
}

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


router.get('/profile', (req, res) => {
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

router.post('/new-article', artload.single('file'), function (req, res, next) {
  // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  // User.findOne({
  //   _id: decoded._id
  // })
  //   .then(user => {
  //     if (user) {
  //       res.json(user)
  //     } else {
  //       res.send("User does not exist!")
  //     }
  //   })
  //   .catch(err => {
  //     res.send('error: ' + err)
  //   })
  console.log(req.body)
  const tempPath = req.file.path;
  fs.rename(tempPath, req.file.destination + "/" + req.file.originalname, function (err) {
    if (err) {
      res.send(err)
    }
  })
  const BODY = req.body;
  const FILE = req.file;

  const articleData = {

    title: BODY.title,
    // author: decoded.username,
    // username: BODY.username,
    text: BODY.text,
    pic: '/images/articles/' + FILE.originalname,
    date: time()
  }


  Article.create(articleData)
    .then(article => {
      // res.json({ status: article.title + 'created!' })
      res.redirect('/users/articles')
    })
    .catch(err => {
      res.send('error:' + err)
    })
})


router.get('/articles', function (req, res) {
  Article.find({}, function (err, data) {
    if (err) { res.send(err) }

    res.render('articles.ejs', {
      data
    })
  }).sort({ date: -1 })
})

router.get('/new-article', function (req, res) {

  res.render('new article.ejs', {

  })
})


router.get('/articles', function (req, res) {
  Article.find({}, function (err, data) {
    if (err) { res.send(err) }

    res.render('articles.ejs', {
      data
    })
  }).sort({ date: -1 })

})

router.get('/:title', function (req, res) {
  let title = req.params.title
  Article.deleteOne({ title: title }, (err, data) => {
    console.log(req.body)
    if (err) { res.send(err) }
    res.redirect('/users/articles')
  })
})




router.get('/edit-article/:title', function (req, res) {
  let title = req.params.title
  Article.findOne({ title: title }, (err, data) => {
    console.log(req.body)
    if (err) { res.send(err) }
    res.render('edit article.ejs', {
      data
    })
  })
})


router.post('/edit-article/:title', artload.single('file'), (req, res, next) => {
  
    const tempPath = req.file.path;
    fs.rename(tempPath, req.file.destination + "/" + req.file.originalname, function (err) {
      if (err) {
        res.send(err)
      }
    })
  

  const BODY = req.body;
  const FILE = req.file;
  let title = BODY.title
  Article.updateOne({ title: title }, {
    $set: {
      title: BODY.title,
      text: BODY.text,
      pic: '/images/articles/' + FILE.originalname,
      date: time()

    }
  }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Post updated successfully!");
      res.redirect('/users/articles')
    }
  })
})






module.exports = router;
