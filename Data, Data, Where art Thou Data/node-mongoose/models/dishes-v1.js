const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true //createdAt, updatedAt 
})

//When you insert a doument, automactically will create a collection called Dishes 
var Dishes = mongoose.model('Dish', dishSchema)

module.exports = Dishes