async function getFromServer() {
    const backEnd = await fetch('http://localhost:3000/getoute128');
    const data = await backEnd.json();
    return data;
}
/* POST - Async Funtion*/
async function postToServer(city, date, weather, picture) {
    let projectData = {
        destinationCity: city,
        arrivalDate: date,
        destinationWeather: weather,
        destinationPic: picture
    }

    await fetch('/http://localhost:3000/postRoute136', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(projectData)
    })

}
/* GET - Async Function to API*/

//GEONAMES APIs
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

// let packGeoApi= geoApi(geoURL,geoQuery,'paris',geoKey) //only for testing


// let a = fetch('http://api.geonames.org/searchJSON?formatted=true&q=florence&username=sandrita')
// http://api.geonames.org/
// searchJSON?formatted=true&q=
// florence
// sandrita

//WEATHERBIT API
const weatherKey = '&key=925a0421821c4963b0c150342f7e173b';
const weatherForecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherCurrentURL = 'https://api.weatherbit.io/v2.0/current?';

// https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543,NC&key=API_KEY

async function weatherCurrentApi(urlCurrentWeather, keyWeather, geoApi) {

    const weatherFetch = await fetch(urlCurrentWeather+'&lat='+geoApi.latGeo+'&lon='+geoApi.lngGeo+keyWeather);
    const weatherBit = await weatherFetch.json();
    return weatherBit

};

async function weatherForecastApi(urlForecastWeather, keyWeather, geoApi) {
    
    const weatherFetch = await fetch(urlForecastWeather+'&lat='+geoApi.latGeo+'&lon='+geoApi.lngGeo+keyWeather);
    const weatherBit = await weatherFetch.json();
    return weatherBit

 };
myGeo = {
    latGeo:38.123,
    lngGeo:-78.543,
}
weatherForecastApi(weatherForecastURL, weatherKey, myGeo)

async function runTest(){
    let packGeoApi= await geoApi(geoURL,geoQuery,'paris',geoKey);
    let packWeatherApi = await weatherCurrentApi(weatherForecastURL,weatherKey,packGeoApi);
    debugger;
}

runTest()

let packWeatherApi = packGeoApi.then(function(weatherURL,weatherKey,packGeoApi) {
    weatherApi(weatherURL,weatherKey,packGeoApi)
});


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

// UPDATE UI with data from server
function updateUI(projectData){
    const dateElement = document.getElementById('date');
    const tempElement = document.getElementById('temp');
    const locationElement = document.getElementById('location');
    const imageElement = document.getElementById('image');

    dateElement.innerHTML = `<span class="entry-item">Date: </span>${projectData.date}`;
    tempElement.innerHTML = `<span class="entry-item">Temperature: </span>${projectData.weather}`;
    locationElement.innerHTML = `<span class="entry-item">City: </span>${projectData.city}`;
    imageElement.innerHTML = `<span class="entry-item">Destination Image: </span>${projectData.image}`;
}

// Function called by event listener
async function performCurrentWeatherUpdate() {


let day = new Date();
let date = day.getMonth()+1+'.'+ day.getDate()+'.'+ day.getFullYear(); //name only in app.js

let fecha = document.getElementById('arrivalDate').value;
let ciudad = document.getElementById('cityDestination').value;

let climaCurrent = await packWeatherApi(weatherCurrentURL,weatherKey,packGeoApi);
let foto = await pictureApi(pinaURL,pinaKey,ciudad,'&image_type=photo');

postToServer(city, date, weather, picture);

let projectData = await getFromServer();

updateUI(projectData);
};


async function performForecastWeatherUpdate() {

    debugger;
    let day = new Date();
    let date = day.getMonth()+1+'.'+ day.getDate()+'.'+ day.getFullYear(); //name only in app.js

    let fecha = document.getElementById('arrivalDate').value;

    let ciudad = document.getElementById('cityDestination').value;

    let climaForcast = await packWeatherApi(weatherForecastURL,weatherKey,packGeoApi);
    let foto = await pictureApi(pinaURL,pinaKey,ciudad,'&image_type=photo');


    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = date;
    const secondDate = fecha;
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    if (diffDays > 16){
        weather = climaForcast;
    }   else {
            weather = "please input departure date that is less than 16 days away"
        }
    debugger;


    postToServer(city, date, weather, picture);

    let projectData = await getFromServer();

    updateUI(projectData);
    };



/*Creating Event Listener*/

const generateListener = document.getElementById('generate');// Defining variable that will be used in event listener

generateListener.addEventListener("click", performCurrentWeatherUpdate)

generateListener.addEventListener("click", performForecastWeatherUpdate)



















//     front end to back end (call post function we created)
//     const idx = getFromServer()
//     idx, as agreed in the app.get method in the server.js, will be an object with the following keys: fetcha, temperatura, sentimiento

//     front end to HTML (we still need to create this function)
//     updateHTML(idx)
// APIs
// app.post('/all-apis', (req, res) => {







///////////////////////////////////////////////////////////////////////////


//     // User Input Variable
//         let appInputData = {
//             input: req.body
//         };

//         // Log: User Location Input
//         console.log(`user destination input: ${req.body.destinationInput}`);

//         // alert if a user submit without entering values
// 	if (cityName === '') {
// 		alert('Please enter a city name.');
// 		return;
// 	}

// 	// check if a user enter a valid date
// 	if (tripStart < today || tripEnd < tripStart) {
// 		alert(
// 			'Invalid date: either you select past date as start date or set end date earlier than start date.'
// 		);
// 		return;
// 	}
// // });