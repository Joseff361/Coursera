const mongoose = require('mongoose')
const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

connect.then((db) => {
    console.log('Connected correctly to server')

    Dishes.create({ //create and add
        name: 'Uthappiza9',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish)
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}},
            {new: true} //Means that the new documente come back to us
        ).exec()
    })
    .then((dish) => {
        console.log(dish)

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        })

        return dish.save()
    })
    .then((dish) => {
        console.log(dish)
        return Dishes.deleteMany({})
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch((err) => { console.log(err)})
})
.catch((err) => { console.log(err)})