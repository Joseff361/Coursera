const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const favoriteSchema = new Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
    }]
},{
    timestamps: true
})


var Favorites = Mongoose.model('Favorite', favoriteSchema)
module.exports = Favorites