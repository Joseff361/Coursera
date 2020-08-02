var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
var User = require('../models/user')

var passport = require('passport')

router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.json({err: err})
    }
    else {
      passport.authenticate('local')(req, res, () => { //si no hay error, autentifica el usuario 
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({success: true, status: 'Registration Successful!'})
      })
    }
  })
})

//Si el metodo authenticate dectecta algun error, devuelve al navegador la falla
//Y si no, passport agregara a a las solicitudes un header: req.user 
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({success: true, status: 'You are successfully logged in!'})
}) //succes: true ayudara a identificar si la respuesta es satisfactoria

router.get('/logout', (req, res) => {
  if (req.session) { //Si estas loggeado...
    req.session.destroy()  //destruir session local en el servidor
    res.clearCookie('session-id') //limipar cookie en el navegador
    res.redirect('/')
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})





module.exports = router;
