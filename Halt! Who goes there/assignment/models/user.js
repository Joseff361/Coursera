var mongoose = require('mongoose')
var Schema = mongoose.Schema

var passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
    firstname: {
        type: String,
          default: ''
    },
    lastname: {
        type: String,
       default: ''
    },
    admin:{
        type: Boolean,
        default: false
    }
});

//Agrega: usuario, contrase;a + hash y algunos metodos extra
User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)