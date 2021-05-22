async function getFromServer() {
    const backEnd = await fetch('/getroute128'); 
    const data = await backEnd.json();
    return data;
}

// front end to back end (call post function we created)
// const idx = getFromServer() 

/* POST - Async Funtion*/


async function postWaitTime(city, date, weather, picture) { 
    let myTripAllTogether = { 
        destinationCity: city,
        arrivalDate: date,
        destinationWeather: weather,
        destinationPic: picture
    }
    
    await fetch('/postroute136', { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(myTripAllTogether)
    }) 
   
}

async function getDataFromBackEnd() {
    const lastPromise = await fetch('/getroute128',{
        method: 'GET'  
})
}



/* GET - Async Function to API*/


//GEONAMES API
const geoURL = 'http://api.geonames.org/';
const geoQuery ='searchJSON?formatted=true&q=';
const geoKey = '&username=sandrita';

// http://api.geonames.org/searchJSON?formatted=true&q=florence&username=sandrita

async function geoApi(urlGeo,queryGeo,locationGeo,keyGeo) { 
    const cityFetch = await fetch(urlGeo+queryGeo+locationGeo+keyGeo);  
    const cityGeo = await cityFetch.json(); //converting from JSON to an object
    const cordsGeo = {
        latGeo:cityGeo.geonames[0].lat,
        lngGeo:cityGeo.geonames[0].lng,
    }
    return cordsGeo;

    // return cityGeo.main.temp; 
};



let packGeoApi= geoApi(geoURL,geoQuery,'paris',geoKey) //only for testing


// let a = fetch('http://api.geonames.org/searchJSON?formatted=true&q=florence&username=sandrita')
// http://api.geonames.org/
// searchJSON?formatted=true&q=
// florence
// sandrita

//WEATHERBIT API
const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherKey = ',NC&key=925a0421821c4963b0c150342f7e173b';


// https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543,NC&key=API_KEY


async function weatherApi(urlWeather, keyWeather, geoApi) { 
    const weatherFetch = await fetch(urlWeather+'&lat='+geoApi.lat+'&lon='+geoApi.lng+keyWeather);
    const weatherBit = await weatherFetch.json();
    return weatherBit
    // return weatherBit.main.temp 
};

let packWeatherApi=weatherApi(weatherURL,weatherKey,packGeoApi);


// PINABAY API
const pinaURL = 'https://pixabay.com/api/'
const pinaKey = '?key=21697550-400e4664c2106af48cb147104&q='

// https://pixabay.com/api/?key=21697550-400e4664c2106af48cb147104&q=yellow+flowers&image_type=photo

async function pictureApi(urlPina,keyPina,cityPina,typePina) { 
    const pictureFetch = await fetch(urlPina+keyPina+cityPina+typePina); 
    const pictureBay = await pictureFetch.json(); 
    return pictureBay
    //  return pictureBay.main.temp 
};

pictureApi(pinaURL,pinaKey,'paris','&image_type=photo')

/*Create a new date instance dynamically with JS*/

let day = new Date();
let date = day.getMonth()+'.'+ day.getDate()+'.'+ day.getFullYear(); //name only in app.js



/*Creating Event Listener*/

const generateListener = document.getElementById('generate');// Defining variable that will be used in event listener

generateListener.addEventListener("click", function(){ //Here we kick off our event listener
   
    const city = document.getElementById('cityDestination')
    const date = document.getElementById('arrivalDate').value; // Here we are pulling this information from our HTML, creating a variable where we will next the information and use it in the above function and event listener command.
    const temperatureDos = getWeatherApi(geoURL, geokey, geoQuery)// Create variable to nest getWeatherAPI info. Temprature variable only in app.js 
    
    postWaitTime(city, weather, picture, date)
})
  

//     front end to back end (call post function we created)
//     const idx = getFromServer() 
//     idx, as agreed in the app.get method in the server.js, will be an object with the following keys: fetcha, temperatura, sentimiento
    
//     front end to HTML (we still need to create this function)
//     updateHTML(idx)                                                                                                                                                                                                                                                                  
// }); 