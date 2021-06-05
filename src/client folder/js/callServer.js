import { calculateDays } from "./calculateDays";

// Post to server - pass userInput and return the data to send to the UI
async function postToServer(userInput) {
    let projectData = await fetch('https://localhost:3000/postRoute', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInput)
    })
    return projectData
}

// Call the server
async function callServer() {
    
        // Get user input
        let departureDate = document.getElementById('departureDate').value;
        let destinationCity = document.getElementById('cityDestination').value;
        
        // Calculate days away to trip
        let daysDiff = calculateDays(departureDate)

        // Check if a city has been inputted
        let cityEntered;
        if (destinationCity === ''){
            // No city entered
            cityEntered = false;
            alert("Please enter a city name.")
        } else {
            // Otherwise its ok
            cityEntered = true;
        }

        // Check if a date has been inputted or if a past date has been inputted
        let correctDateEntered;
        if (daysDiff < 0) {
            // Past date
            correctDateEntered = false;
            alert('Entered a day in the past, please enter a date in the future')
        } else if (departureDate === ''){
            // No date entered
            correctDateEntered = false;
            alert('Please enter a departure date')
        } else {
            // Otherwise its ok
            correctDateEntered = true;
        }

        // If a date not in the past has been entered and a city has been entered, call the server
        if (cityEntered || correctDateEntered){
            // Everything is ok, post to server
            // First, assemble the userInput object
            let userInput = {
                departureDate: departureDate,
                destinationCity: destinationCity
            }

            // Post to server
            let projectData = postToServer(userInput);
        } else {
            // Something is missing, do not call the server and populate the projectData with the incorrect data
            let projectData = {
                city: 'Error in inputs',
                date: 'Error in inputs',
                weather: 'Error in inputs',
                picture: '../error.jpeg'
            }
        }

        return projectData
};

// Export the event listener
export { callServer }