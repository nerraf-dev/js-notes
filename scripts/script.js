
//Select todo form
// const todoForm = document.querySelector('.todo-form');
const todoForm = document.querySelector('.todo-add-btn');
// select input box
const todoInputText = document.querySelector('.todo-input-text');
// select ul
const todoItemsList = document.querySelector('.todo-items');

//Array to store the todo items
//array will contain todo objects. the object has id, name, completed (see below! *1)
let todos = [];

// add eventlistener to the form - listen for click. 
todoForm.addEventListener('click', function(event){
    //Prevent page from reloading on submit
    // event.preventDefault();
    addTodo(todoInputText.value.trim()); // call addTodo function with input box current value
});

// Add Todo item to list
function addTodo(item){
    //if item is not empty (can't add empty item!)
    if (item !== ''){
        //make todo object - (*1)
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
    //Add to array
    todos.push(todo);
    addToLocalStorage(todos);
    todoInputText.value = '';
    }
}

// function to render given todos to screen
function renderTodos(todos) {
    // clear everything inside <ul> with class=todo-items
    todoItemsList.innerHTML = '';
    // run through each item inside todos
    todos.forEach(function(item) {
      // check if the item is completed
      const checked = item.completed ? 'checked': null;
      // make a <li> element and fill it - <li> </li>
      const li = document.createElement('li');
      //Set <li> class: <li class="item"> </li>
      li.setAttribute('class', 'todo-item');
      
      // Set the LI attribute to be the ID (date stamp) <li class="item" data-key="20200708"> </li>
      li.setAttribute('data-key', item.id);
      
      /* <li class="item" data-key="20200708"> 
            <input type="checkbox" class="checkbox">
            Go to Gym
            <button class="delete-button">X</button>
          </li> */
      // if item is completed, then add a class to <li> called 'checked', which will add line-through style
      if (item.completed === true) {
        li.classList.add('todo-checked');
      }
  
      li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${checked}>
            <span class="todo-item-text">${item.name}</span>
            <button class="todo-delete-btn far fa-trash-alt"></button>
      `;
      // finally add the <li> to the <ul>
      todoItemsList.append(li);
    });
  
  }

  // Adds the todos to local storage
  function addToLocalStorage(todos){
      //convert array to string, searialize - JSON
      //localStorage is part of the DOM
      //access these values like an object, or with the Storage.getItem() and Storage.setItem() methods
      //https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
      localStorage.setItem('todos', JSON.stringify(todos));
      //render to the screen
      renderTodos(todos);
  }

  //Get the items from local storage on page refresh
  function getFromLocalStorage(){
      const reference = localStorage.getItem('todos')
      //if reference exists
      if (reference){
          //convert JSON back to array
          todos = JSON.parse(reference);
          renderTodos(todos);
      }
  }

  //toggle complete
  function completeToggle(id){
      todos.forEach(function(item){
          if (item.id == id){
              //toggle item
              item.completed = !item.completed;
          }
      });
      //Update storage
      addToLocalStorage(todos);
  }

  //deletes the todo item
  function deleteTodo(id){
    //   filters out <li> with id and updates array
    todos = todos.filter(function(item){
        return item.id != id;
    });
    //Update storage
    addToLocalStorage(todos);
  }


  //initially get from local
  getFromLocalStorage();

  // set toggle and delete.
  // addEventListener on <ul> has class todo-items. Listen to click on checkbox or delete
  todoItemsList.addEventListener('click',function(event){
      //check if on checkbox or delete button
      if (event.target.type === 'checkbox'){
          //toggle state
          completeToggle(event.target.parentElement.getAttribute('data-key'));
      }

      if(event.target.classList.contains('todo-delete-btn')){
          //get id from data-key or parent <li> 
            deleteTodo(event.target.parentElement.getAttribute('data-key'));        
      }
  });