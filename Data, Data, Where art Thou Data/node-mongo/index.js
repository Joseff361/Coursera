const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const dboper = require('./operations')

const dbname = 'conFusion'
const url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null)
    console.log('Connected correctly to server')

    const db = client.db(dbname)


    //Si quisiera realizar una serie de acciones sobre la bd, las tendria que representar asi, por ahora...
    dboper.insertDocument(db, { name: 'Vadonut', description: 'test'}, 'dishes', (result) => {
        console.log('Inserted document \n', result.ops)

        dboper.findDocument(db, "dishes", (docs) => {
            console.log('Found documents\n', docs)

            dboper.updateDocument(db, { name: "Vadonut" },{ description: "Updated Test" }, "dishes", (result) => {
                console.log("Updated Document:\n", result.result)

                dboper.findDocument(db, "dishes", (docs) => {
                    console.log('Found updated documents\n', docs)

                    db.dropCollection("dishes", (result) => {
                        console.log('Dropped collection\n')

                        client.close()
                    })

                })
            })
        })
    })

})