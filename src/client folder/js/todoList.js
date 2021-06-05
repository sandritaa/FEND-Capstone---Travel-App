/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*TO DO LIST*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////// 

function buttonToDoList() {

    let button2 = document.getElementById('app'); 
    let button = document.createElement("button");
    let text = document.createTextNode("click to add");
    button.setAttribute("id", "button2" );
    button2.appendChild(button);
    button.appendChild(text);
   
    // document.body.appendChild(button);
    // button2.appendChild(button)
  
    return button
}

let buttonListener = buttonToDoList()

function skeletonToDoList() {

    let labelClass = document.getElementById('app'); 
    let newlabel = document.createElement('label');
    newlabel.setAttribute('class', 'todoLabel')
    newlabel.setAttribute("for",'label');
    newlabel.innerHTML = "to-do list:";
    
    labelClass.appendChild(newlabel);
     
    let createClass = document.getElementById('app'); 
    let classDiv = document.createElement('div');
    classDiv.className = "listClass";
    let inputBar = document.createElement("input");
    inputBar.setAttribute("type", "text");
    inputBar.setAttribute("placeholder", "enter to do here");
    inputBar.setAttribute("id", "todoInput" );

    let createUl = document.createElement("ul");
    createUl.setAttribute("id", "myUL");
    classDiv.appendChild(newlabel);
    createClass.appendChild(classDiv);
    classDiv.appendChild(inputBar);
    classDiv.appendChild(button2);
    classDiv.appendChild(createUl);
}

skeletonToDoList()

function itemsToDolist() { 
    
    let createli = document.createElement("li");
    var inputValue = document.getElementById("todoInput");
    if(inputValue.value === ''){
        alert("redo") 
    } else {
        let text = document.createTextNode(inputValue.value)
        createli.appendChild(text);
        let createUl = document.getElementById("myUL")
        createUl.appendChild(createli);
        inputValue.value= "" ;
    }

    // const startDate = document.getElementById('start').value;
	// const endDate = document.getElementById('end').value;
	// const today = new Date();
	// const tripStart = new Date(startDate);
	// const tripEnd = new Date(endDate);


   
    

}

buttonListener.addEventListener("click", itemsToDolist)