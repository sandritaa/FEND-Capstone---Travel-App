// Setup empty JS object to act as endpoint for all routes
projectDataBackEnd = {}

// Require Express to run server and routes

// Import a function under the name express, cors and body parse which are all of the Node packages we have installed
const express = require('express'); // the librarian - this is how we get access to the server and create it (its a framework or template for node) 
const cors = require('cors'); //type of middleware - security 
const bodyParser = require('body-parser');//type of middleware - translator

// Start up an instance of app
const app = express(); //here we are creating the app. creating the app variable that will use the information from the express method and will work as instructions

/* Middleware*/
//tellling our app to use body parser and cors for our apps middlewear. Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Establish a connection to the server
const port = 3000; // we always need a port name. This name is how we will be able to keep calling back

app.listen(port, function() { //here we listen out for the port name and display friendly message to use letting them know if our code is working
  console.log(`Server running on port ${port}`) //message that will pop up if code work and we use a short cut to pull port inforamtion
});

// GET request:
// Retrieves data from the server

// POST request:
// Submit data to the server

// respond with projectData when a GET request is made to the japanfotos
app.get('/getroute128', function (req, res){// here the '/japanfotos' is an example of a path or route. This route or path can be given any name. This is also where the information that we are sending to the server  At this stage it is just being created. Here we are also creating a function within the .get
  res.send(projectDataBackEnd)
});

// Prepared server to receive data
app.post('/postroute136', function (req, res) {

  projectDataBackEnd.fecha = req.body("dateZeroServer")
  projectDataBackEnd.temperatura = req.body("temperatureZeroServer")
  projectDataBackEnd.sentimiento = req.body("userMoodZeroServer")

});