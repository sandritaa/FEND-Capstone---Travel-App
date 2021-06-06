import { createTodoButton, createTodoList } from "./todoList.js"

// Function to add items to the list
function updateTodo() { 
    
    // Create the li elements
    let createli = document.createElement("li");

    // Get user input
    var inputValue = document.getElementById("todoInput");
    
    // If the value is empty, alert the user and don't add anything
    if(inputValue.value === ''){
        alert("Please enter something to do") 
    } else {
        // Otherwise, everything is ok and we can add the item to the todo list
        let text = document.createTextNode(inputValue.value)
        createli.appendChild(text);

        // Add li to the previously created UL
        let myUL = document.getElementById("myUL")
        myUL.appendChild(createli);

        // Leave the input field empty once its dnoe
        inputValue.value= "" ;
    }

}

// Generate skeleton for to do list
let todoListener = createTodoList()

// Add an event listener to button2
todoListener.addEventListener("click", updateTodo)

export { todoListener, updateTodo }