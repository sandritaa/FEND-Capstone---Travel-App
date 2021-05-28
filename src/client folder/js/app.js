// import {getPostTest} from './getPostTest.js';
// import '/src/clientfolder/js/updateUiTest.js';
// import '/src/clientfolder/js/apiTest.js';

////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*GET Function*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getFromServer() {
    const backEnd = await fetch('http://localhost:3000/getroute128');
    const data = await backEnd.json();
    return data;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*POST Function*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function postToServer(cityDest, dateDest, weatherDest, pictureDest) {
    let projectData = {
        destinationCity: cityDest,
        arrivalDate: dateDest,
        destinationWeather: weatherDest,
        destinationPic: pictureDest
    }

    await fetch('http://localhost:3000/postRoute136', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(projectData)
    })

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*GEONAMES API*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*WEATHERBIT API*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const weatherKey = '&key=925a0421821c4963b0c150342f7e173b';
const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
// const weatherCurrentURL = 'https://api.weatherbit.io/v2.0/current?';
// https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543,NC&key=925a0421821c4963b0c150342f7e173b

async function weatherApi(urlWeather, keyWeather, geoApi) {

    const weatherFetch = await fetch(urlWeather+'&lat='+geoApi.latGeo+'&lon='+geoApi.lngGeo+keyWeather);
    const weatherBit = await weatherFetch.json();
    return weatherBit
    // .data[0].temp; //TESTING ONLY

};



////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*PINABAY API*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const pinaURL = 'https://pixabay.com/api/'
const pinaKey = '?key=21697550-400e4664c2106af48cb147104&q='
// https://pixabay.com/api/?key=21697550-400e4664c2106af48cb147104&q=yellow+flowers&image_type=photo

async function pictureApi(urlPina,keyPina,cityPina,typePina) {
    const pictureFetch = await fetch(urlPina+keyPina+cityPina+typePina);
    const pictureBay = await pictureFetch.json();
    return pictureBay
    //  return pictureBay.main.temp //TESTING ONLY
};


// let picturePack = pictureApi(pinaURL, pinaKey, 'paris','&image_type=photo')

//THE BELOW IS FOR TESTING ONLY 
//pictureApi(pinaURL,pinaKey,'paris','&image_type=photo')




////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*UpdateUI Function*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Event Listener Function*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function weatherUpdate() {

    
        let day = new Date();
        let date = day.getMonth()+1+'.'+ day.getDate()+'.'+ day.getFullYear(); //name only in app.js
  
        let departureDate = document.getElementById('departureDate').value;
        let city = document.getElementById('cityDestination').value;
        
        let cityCords = await geoApi(geoURL,geoQuery,city,geoKey)
        let cityPhoto= await pictureApi(pinaURL,pinaKey,city,'&image_type=photo');
        let weatherForecast = await weatherApi(weatherURL, weatherKey, cityCords);
        
        let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let htmlDate = new Date(departureDate);
        let timeDiff = htmlDate.getTime() - day.getTime();
        let daysDiff = Math.round(timeDiff / oneDay);

        let tempAtArrival;
        if (daysDiff < weatherForecast.data.length){
            tempAtArrival = weatherForecast.data[daysDiff].temp;
        } else {
            tempAtArrival = "please input departure date that is less than 16 days away"
        }



        /////////////////////////////////////////////////////
        /*COUNTDOWN */
        ///////////////////////////////////////////////////////   
        let countdown = document.createElement('div')
        countdown.innertext = daysDiff;
        document.body.appendChild(countdown);

        ////////////////////////////////////////////////////////
        /*IMAGE PERAMETERS */
        /////////////////////////////////////////////////////// 

            // let myImage = new Image(100, 200);
            // myImage.src = cityPhoto ;
            // document.body.appendChild(myImage);

        ////////////////////////////////////////////////////////
        /*GOING LIVE */
        ///////////////////////////////////////////////////////     

        postToServer(city, departureDate, tempAtArrival, cityPhoto);
        // // city, departureDate, weatherForecast, cityPhoto
          
        // // Get data back from server to front end
        let projectData = getFromServer();
        // console.log(departureDate)
        // console.log(projectData.date)
        // // Update UI
        await updateUI(projectData)   
        
    };

   
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Creating Event Listener*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    const generateListener = document.getElementById('generate');// Defining variable that will be used in event listener

    generateListener.addEventListener("click", weatherUpdate)


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*TO DO LIST*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////// 

        // STEP 1. Create the input bar
        var x = document.createElement("input");
        x.setAttribute("type", "text");
        x.setAttribute("placeholder", "Enter to do here");
        x.setAttribute("id", "todoInput")
        document.body.appendChild(x)

        // STEP 2. Create the add button
        function buttonToDoList() {

            var createButton = document.createElement("button");
            var buttonTxt = document.createTextNode("Click me to add");
            createButton.appendChild(buttonTxt);
            document.body.appendChild(createButton);
            return createButton
        }

        let llk = buttonToDoList()

        // STEP 3. Create an empty ul
        function toDoListSkeleton() {

            const createClass = document.getElementById('app');
            var classDiv = document.createElement('div');
            classDiv.className = "listClass";
        
            var createUl = document.createElement("ul");
            createUl.setAttribute("id", "myUL");
            
            createClass.appendChild(classDiv);
            classDiv.appendChild(createUl);
        }

        toDoListSkeleton()

        // STEP 4. Create an event listener that adds an li to the ul when the add button is clicked
        function itemsToDolist() { 
            
            var createli = document.createElement("li");
            var inputValue = document.getElementById("todoInput").value;
            let text = document.createTextNode(inputValue)
            createli.appendChild(text);
            let createUl = document.getElementById("myUL")
            createUl.appendChild(createli);
        
        }
        llk.addEventListener("click", itemsToDolist)

         
    
    