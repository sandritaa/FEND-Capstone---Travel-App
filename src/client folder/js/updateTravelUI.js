
// Add an event listener to button1
const generateListener = document.getElementById('button1');
generateListener.addEventListener("click", weatherUpdate);


/*UpdateUI Function*/
function updateTravelInfo(projectData, daysDiff){
    const titleElement = document.getElementById('itineraryTitle');
    const dateElement = document.getElementById('date');
    const tempElement = document.getElementById('temp');
    const locationElement = document.getElementById('location');
    const imageElement = document.getElementById('image');
    const countdown = document.getElementById('count'); 
    debugger;

    titleElement.innerHTML = `<span class="entry-item">itinerary</span>`;
    dateElement.innerHTML = `<span class="entry-item">Date: </span>${projectData.date}`;
    tempElement.innerHTML = `<span class="entry-item">Temperature: </span>${projectData.weather} °C`;
    locationElement.innerHTML = `<span class="entry-item">City: </span>${projectData.city}`;
    imageElement.innerHTML = `<img src=${projectData.pic.hits[3].webformatURL}>`;
     

    countdown.innerText = daysDiff + ' days to trip! ✈️';
}



else if (daysDiff >=  weatherForecast.data.length +1) {
    tempAtArrival = 'idk'
     ////////////////////////////////////////////////////////
    /*GOING LIVE */
    ///////////////////////////////////////////////////////     
    postToServer(city, departureDate, tempAtArrival, cityPhoto);
    let projectData = getFromServer();
    await updateUI(projectData, daysDiff)
} 
else {
    tempAtArrival = weatherForecast.data[daysDiff].temp;


    
}