const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dishRouter = require('./routes/dishRouter')
const promotionRouter = require('./routes/promotionRouter')
const leaderRouter = require('./routes/leaderRouter')

//Server information
const hostname = 'localhost'
const port = 3000

//initialize the app
const app = express()

//Middlewares

//console log whit style xD
app.use(morgan('dev'))

//Translate the JSON string to an javascript object
app.use(bodyParser.json())

app.use('/dishes', dishRouter)
app.use('/promotions', promotionRouter)
app.use('/leaders', leaderRouter)

//Now we can use the static files from our project
app.use(express.static(__dirname + '/public'))

//When you don't require an resource, you will recieve this
app.use((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
})





// Creating a web server
const server = http.createServer(app)

server.listen(port , hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})