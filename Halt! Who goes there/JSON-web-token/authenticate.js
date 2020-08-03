var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('./models/user')

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

//Para autenticar al usuario con una estrategia local; se le puede pasar otra funcion 
passport.use(new LocalStrategy(User.authenticate()))


//passport authentication crea req.user para autenticar al usuario
//Para usar sesiones, necesitamos serializar esa informacion 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do


var config = require('./config.js')

exports.getToken = function(user) { //payload, secret key, extra
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600}); //ms
}


var opts = {} //Obejto vacio, que sera asignado a continuacion:
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;


// jwt_payload is an object literal containing the decoded JWT payload.
// An example configuration which reads the JWT from the http Authorization header with the scheme 'bearer':
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => { //done is a callback
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user) //el seguno parametro es el usuario
            }
            else {
                return done(null, false);
            }
        });
    }));

//vamos a usar tokens, no sesiones
// Coge el token del header" req.user y verifica el usaurio
exports.verifyUser = passport.authenticate('jwt', {session: false});