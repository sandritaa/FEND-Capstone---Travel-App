////////////////////////////////////////////////////////
/* SET UP SERVER*/
////////////////////////////////////////////////////////

// Add package for access environment variables. This is used to access the API KEY stored in .env
const dotenv = require('dotenv');
dotenv.config();

// Use express for our server side app and body-parser as middleware
const express = require('express')
const bodyParser = require('body-parser')

// Node-fetch enables us to use the fetch() function in NodeJS 
const fetch = require('node-fetch');

// Start up an instance of app
const app = express()

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');

// Enable our app to use the middleware in the app
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('dist'))

// Enable connection between server and client
const port = 3000;
app.listen(port, function () {
    console.log(`Server running on port: ${port}`)
})


////////////////////////////////////////////////////////
/* API SETTINGS*/
////////////////////////////////////////////////////////

// Set up API URLs and KEYs in objects
const geonamesAPI = {
  url: 'https://api.geonames.org/searchJSON?',
  query: 'formatted=true&q=',
  access: '&username=',
  username: process.env.GEOMAP_API_USERNAME
}
const weatherbitAPI = {
  url: 'https://api.weatherbit.io/v2.0/forecast/daily?',
  querylat = '&lat=',
  querylong = '&lon=',
  access = '&key=',
  key: process.env.WEATHERBIT_API_KEY
}
const pixabayAPI = {
  url: 'https://pixabay.com/api/?',
  query: '&q=',
  type: '&image_type=photo',
  access: 'key=',
  key: process.env.PIXABAY_API_KEY
}

////////////////////////////////////////////////////////
/* GET ROUTE */
////////////////////////////////////////////////////////

// GET Route - we use this route to send the html to the server
app.get('/getRoute', function (req, res) {
    res.sendFile('dist/index.html')
})

////////////////////////////////////////////////////////
/* POST ROUTE */
////////////////////////////////////////////////////////

// Initialize userInput variable
let userInput = {};

// Initialize projectData variable
let projectData = {};

// POST Route - we use this route to send data to and fro the server
app.post('/postRoute', async function(req, res) {
    // Save the user input from the client side locally
    userInput.arrivalDate = req.body.arrivalDate;
    userInput.destinationCity = req.body.destinationCity;

    // Log in server incoming data
    console.log('User arrival date: ' + userInput.arrivalDate);
    console.log('User destination city: ' + userInput.destinationCity);

    // Call the geonames APIs
    let geonamesAddress = geonamesAPI.url + geonamesAPI.query + userInput.arrivalDate + geonamesAPI.access + geonamesAPI.username;
    let destinationJSON = await fetch(geonamesAddress);
    let destination = await destinationJSON.json();
    let destinationCoords = {
      lat: destination.geonames[0].lat,
      lng: destination.geonames[0].lng
    }

    // Call the weatherbit API
    let weatherbitAddress = weatherbitAPI.url + weatherbitAPI.querylat + destinationCoords.lat + weatherbitAPI.querylong + destinationCoords.lng + weatherbitAPI.access + weatherbitAPI.key;
    let weatherJSON = await fetch(weatherbitAddress);
    let weather = await weatherJSON.json();

    // Call the pixabay API
    let pixabayAddress = pixabayAPI.url + pixabayAPI.access + pixabayAPI.key + pixabayAPI.query + userInput.destinationCity + pixabayAPI.type
    let pictureJSON = await fetch(pixabayAddress);
    let picture = await pictureJSON.json();

    // Pack API results in the projectData object so we can send it back to the client side
    // The data and the city are already available on the client side but we send it back anyways so we can deal with one single object on the front end
    projectData = {
      city: userInput.destinationCity,
      date: userInput.arrivalDate,
      weather: weather,
      picture: picture
    }

    // Now the result from the API to the post route so that the client side can fetch it
    console.log('Sending data back to client');
    res.send(projectData)
    console.log('Data sent to client')
})

