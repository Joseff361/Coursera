const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')

//Server information
const hostname = 'localhost'
const port = 3000

//initialize the app
const app = express()

//Middlewares

//console log whit style xD
app.use(morgan('dev'))

//Translates the JSON to an javascript object
app.use(bodyParser.json())

//Now we can use the static files from our project
app.use(express.static(__dirname + '/public'))

app.all('/dishes', (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text-plain')
    next()
})

app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes to you!')
})

//bodyParser will parser and added to the req.body
//JSON string TO Javascript object
app.post('/dishes', (req, res, next) => {
    res.end(`Will add the dish: ${req.body.name} whit details: ${req.body.description}`)
})


app.put('/dishes', (req, res, next) => {
    res.statusCode = 403 //Operation not supported
    res.end('PUT operation not supported on /dishes')
})


app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all the dishes to you!')
})


//Support for parameters
app.get('/dishes/:dishId', (req, res, next) => {
    res.end(`Will send details of the dish: ${req.params.dishId} to you!`)
})

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403 
    res.end(`POST operation not supported on /dishes/${req.params.dishId}`)
})

app.put('/dishes/:dishId', (req, res, next) => {
    res.write(`Updating the dish: ${req.params.dishId} \n`)
    res.end(`Will update the dish: ${req.body.name} with the details: ${req.body.description}`)
})


app.delete('/dishes/:dishId', (req, res, next) => {
    res.end(`Deleting dish: ${req.params.dishId}`)
})



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