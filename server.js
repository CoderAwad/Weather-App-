// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
//const req = require('express/lib/request');
//const res = require('express/lib/response');

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// Spin up the server
const port = 5500;
const server = app.listen(port , listening());

// callback to debug
function listening(){
    
    console.log(`server running on port ${port}`)
}

// Initialize all route  

app.get('/all' , sendData);

function sendData(req,res){
    res.send(projectData)
    projectData ={}
};



// Post Route
app.post('/weatherData', addData);

function addData(req , res){
    res.send(projectData)
    console.log(req.body);
    newData = {
        date: req.body.date,
        temp : req.body.temp,
        content:  req.body.content
    }

    projectData = newData;
}
