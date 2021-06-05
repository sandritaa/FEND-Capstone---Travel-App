// Function that gets the data the user has inputted and checks if the input is sensible
function calculateDays(arrivalDate) {
    
    // Get current date and convert it to a more usable format
    let today = new Date();
    let dateToday = today.getMonth()+1+'.'+ today.getDate()+'.'+ today.getFullYear();

    // Convert arrivalDate to a more usable format
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let userDate = new Date(arrivalDate);

    // Calculate days until trip
    let timeDiff = userDate.getTime() - dateToday.getTime();
    let daysDiff = Math.round(timeDiff / oneDay);

    return daysDiff;

}
 
export { calculateDays }




