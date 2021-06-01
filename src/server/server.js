// Setup empty JS object to act as endpoint for all routes
myTripInfo = {}

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
app.use(express.static('../src/client folder/js'));

// Establish a connection to the server
const port = 3000; 
app.listen(port, function() { //here we listen out for the port name and display friendly message to use letting them know if our code is working
  console.log(`Server running on port ${port}`) //message that will pop up if code work and we use a short cut to pull port inforamtion
});


// respond with projectData when a GET request is made to the japanfotos
app.get('/getroute128', function (req, res){
  res.send(myTripInfo)
});

// Prepared server to receive data
app.post('/postroute136', function (req, res) {

    myTripInfo.city = req.body.destinationCity
    myTripInfo.date = req.body.arrivalDate
    myTripInfo.pic = req.body.destinationPic
    myTripInfo.weather = req.body.destinationWeather

    console.log(myTripInfo.city)

});

