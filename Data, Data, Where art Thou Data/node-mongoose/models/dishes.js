const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema ({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},{
    timestamps: true //createdAt, updatedAt
})


const dishSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments : [ commentSchema ]
},{
    timestamps: true //createdAt, updatedAt 
})

//When you insert a doument, automactically will create a collection called Dishes 
var Dishes = mongoose.model('Dish', dishSchema)

module.exports = Dishes