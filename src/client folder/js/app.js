
async function getFromServer() { //attribute names assigned in function
    const backEnd = await fetch('/getroute128'); 
    const data = await backEnd.json();
    return data;
}

// front end to back end (call post function we created)
const idx = getFromServer() 

/* POST - Async Funtion*/


async function postWaitTime(userMoodUno, dateUno, temperatureUno ) { //attribute names assigned in function
    let processDataFrontEnd = { //crate object using the key (name) assosnged in server.js and pair with values in that we created in our function attributes. 
        dateZeroServer: dateUno,
        temperatureZeroServer: temperatureUno,
        userMoodZeroServer: userMoodUno,
    }
    

    await fetch('/postroute136', { //our route name that we created on server.js 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(processDataFrontEnd)//what the client side is sending to the server (this body extension can be pulled from server.js file)
    }) 
   
}

async function getDataFromBackEnd() {
    const lastPromise = await fetch('/getroute128',{
        method: 'GET'  
})
}
debugger;


/* GET - Async Function to API*/

async function getWeatherApi(urlUno, keyUno, zipCodeUno) { 
    const temperatureInCity = await fetch(urlUno+zipCodeUno+'&appid='+keyUno); // here we use as arguments the three parts of information that we need. The word &appid is requried by the API. We use our own arguments here.
    const temperature = await temperatureInCity.json(); // here we are using .json to translate our JS response in this case (temperatureInCity) to get data.
    return temperature.main.temp //return this item within our function to have access to this variable outside of the function. This will be used indirectly in the postWaitTime function. 
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*  API Global Variables*/ 

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';// Link is provided by API
const baseKey = '278a4bb0ed3e1dc04317050dfdf8f145';// Number key is provided by API   


/*Create a new date instance dynamically with JS*/

let day = new Date();
let date = day.getMonth()+'.'+ day.getDate()+'.'+ day.getFullYear(); //name only in app.js



/*Creating Event Listener*/

const generateListener = document.getElementById('generate');// Defining variable that will be used in event listener

generateListener.addEventListener("click", function(){ //Here we kick off our event listener
    //HTML to front end
    const city = document.getElementById('cityDestination')
    const date = document.getElementById('departureDate').value; // Here we are pulling this information from our HTML, creating a variable where we will next the information and use it in the above function and event listener command.
    const temperatureDos = getWeatherApi(baseURL, baseKey, zipcodeDos)// Create variable to nest getWeatherAPI info. Temprature variable only in app.js 
    .then(function(zipcodeDos, temperatureDos, userMoodDos) {
        postWaitTime(zipcodeDos, temperatureDos, userMoodDos)
    });    

    // front end to back end (call post function we created)
    const idx = getFromServer() 
    // idx, as agreed in the app.get method in the server.js, will be an object with the following keys: fetcha, temperatura, sentimiento
    
    // front end to HTML (we still need to create this function)
    updateHTML(idx)                                                                                                                                                                                                                                                                  
}); 



















// function sum(a,b){
//     let c = a+b
//     return c
// }

// let myValue = sum(2,3)

// console.log(myValue)







// js day (app.js name) = dia (function name ) = date (server name that we are promising our backend for storage )
// js tura (app.js name) = temp (function name) = temperature (server name that we are promising our backend for storage )
// js mood (app.js name) = feels (function name) = userMood (server name that we are promising our backend for storage )




// postWaitTime(date,tura, mood)

// function sum(a,b){
//     return a+b
// }

// function multiply(a,b){
//     return a*b
// }


// GOOD MORNING! I LOVE YOUUUUUU
// let addition = sum(2,3)

// let multiplication = multiply(4,5)
















// function printMyName() {
//     return "Tom"
// }

// let name  = printMyName(); // -> Tom


// async function printMyName() {
//     return "Tom"
// }

// printMyName().then(alert) // -> Tom




// function printMyName() {
//     Promise.resolve(console.log("Tom"))
// }
