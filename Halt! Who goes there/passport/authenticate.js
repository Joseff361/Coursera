var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('./models/user')


//Para autenticar al usuario como una estrategia local; se le puede pasar otra funcion 
passport.use(new LocalStrategy(User.authenticate()))


//passport authentication crea req.user para autenticar al usuario
//Para usar sesiones, necesitamos serializar esa informacion 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do