const MongoClient = require('mongodb').MongoClient //Instancia de la Base de Datos
const assert = require('assert')

const url = 'mongodb://localhost:27017/'; //This path was specified when the server was initialized
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => { //La instancia tiene acceso a todas las bases de datos
    assert.equal(null, err) // If an error ocurrs, the connection ends an print out something hehe
    console.log('Connected correctly to server')

    const db = client.db(dbname)
    const collection = db.collection('dishes')

    collection.insertOne({"name": "Uthappizza", "description": "test"}, (err, result) => {
        assert.equal(null, err)
        console.log('After Insert \n')
        
        console.log(result.ops) //operations performed

        //Transforms the BSON in an array of JSON objects
        collection.find({}).toArray((err, docs) => {
            assert.equal(null, err)

            console.log('Found \n')
            console.log(docs)

            db.dropCollection("dishes", (err, result) => {
                assert.equal(null, err)

                client.close()
            })
        })

    })
})