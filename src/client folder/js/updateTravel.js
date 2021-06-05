import { callServer } from "./callServer"

// Add an event listener to button1
const travelListener = document.getElementById('button1');
travelListener.addEventListener("click", runNewTravel);

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
    tempElement.innerHTML = `<span class="entry-item">Temperature: </span>${projectData.weather} °C`;
    locationElement.innerHTML = `<span class="entry-item">City: </span>${projectData.city}`;
    imageElement.innerHTML = `<img src=${projectData.picture.hits[0].webformatURL}>`;     
    countdown.innerText = projectData.countdown + ' days to trip! ✈️';
}

// Function that is called by the event listener
function runNewTravel() {

    // First we call the server
    let projectData = callServer();

    // Now we check if the date inputted is further away than what the API provides. 
    // If it is, we simply tell the user its too far in advance to display the weather but we still display eveerything else
    // To do this, we create a new field in the object called weather
    if (projectData.countdown >= projectData.weather.data.length + 1) {
        projectData.weather = 'No forecast available'
    } else {
        projectData.weather = projectData.forecast[projectData.countdown].temp;
    }

    // Finally we update the UI
    updateTravel(projectData)

}

export { travelListener, updateTravelUI, runNewTravel }
