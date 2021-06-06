// Function to generate unordered list where all the todo items will go
function createTodoList() {

    // Get parent from HTML
    let app = document.getElementById('app'); 
    
    // Create a div element which will be child of the eleemnt with id app
    let classDiv = document.createElement('div');
    classDiv.className = "listClass";
    classDiv.setAttribute('id', 'todo');

    // Create child elemetns of div
    let newlabel = document.createElement('label');
    let inputBar = document.createElement("input");
    let createUl = document.createElement("ul");
    let button = document.createElement("button");
    let text = document.createTextNode("click to add");

    // Set button attributes
    button.setAttribute("id", "button2" );

    // Set attributes of label
    newlabel.setAttribute('class', 'todoLabel')
    newlabel.setAttribute('for','label');
    newlabel.innerHTML = "to-do list:";
    
    // Set attributes of input bar
    inputBar.setAttribute("type", "text");
    inputBar.setAttribute("placeholder", "enter to do here");
    inputBar.setAttribute("id", "todoInput" );

    // Set attributes of ul
    createUl.setAttribute("id", "myUL");

    // Establish hierarchy
    app.appendChild(classDiv);
    classDiv.appendChild(newlabel);
    classDiv.appendChild(inputBar);
    classDiv.appendChild(button);
    classDiv.appendChild(createUl);    
    button.appendChild(text);

    return button

}

export {createTodoList }