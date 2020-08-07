const express = require('express')
const cors = require('cors')
const app = express()

//origins that will be acepted
const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) { //if exists
        corsOptions = { origin: true }; 
    }
    else {
        corsOptions = { origin: false };// access control allow origin not send
    }
    callback(null, corsOptions); //null: no error
};

//Send the access control allow origin whit the wild cards tool
//It's OK for GET operations
exports.cors = cors(); //cors whitout options

exports.corsWithOptions = cors(corsOptionsDelegate);