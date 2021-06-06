import { callServer } from "./callServer.js"

// Function to update the travel information section of the 
function updateTravelUI(projectData){

    // Get all the elements from HTML
    const titleElement = document.getElementById('itineraryTitle');
    const dateElement = document.getElementById('date');
    const tempElement = document.getElementById('temp');
    const locationElement = document.getElementById('location');
    const imageElement = document.getElementById('image');
    const countdown = document.getElementById('count'); 

    // Modify all elements in HTML with new data
    titleElement.innerHTML = `<span class="entry-item">itinerary</span>`;
    dateElement.innerHTML = `<span class="entry-item">Date: </span>${projectData.date}`;
    tempElement.innerHTML = `<span class="entry-item">Temperature: </span>${projectData.forecast}`;
    locationElement.innerHTML = `<span class="entry-item">City: </span>${projectData.city}`;
    imageElement.innerHTML = `<img src=${projectData.photo}>`;     
    countdown.innerText = projectData.countdown + ' days to trip! ✈️';
    console.log(projectData)
}

// Function that is called by the event listener
async function runNewTravel() {

    // First we call the server
    let projectData = await callServer();

    // Finally we update the UI
    updateTravelUI(projectData)

}

// Add an event listener to button1
let travelListener = document.getElementById('button1');
travelListener.addEventListener("click", runNewTravel);

export { travelListener, updateTravelUI, runNewTravel }
