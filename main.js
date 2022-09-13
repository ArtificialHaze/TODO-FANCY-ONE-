// VARIABLES

const todoInput = document.querySelector(".todo__input");
const todoBtn = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const todosFilter = document.querySelector(".todo__filter");

// SAVE TO LOCAL STORAGE

const saveTodosTolocalStorage = (todo) => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// GETTING LOCAL STORAGE TODOS

const getTodosFromLocalStorage = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.classList.add("todo");

    const li = document.createElement("li");
    li.innerText = todo;
    li.classList.add("todo__item");
    div.appendChild(li);

    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = `<i class="fas fa-check"></i>`;
    doneBtn.classList.add("doneBtn");
    div.appendChild(doneBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add("deleteBtn");
    div.appendChild(trashBtn);

    //   APPEND TO PAGE
    todoList.appendChild(div);
  });
};

// REMOVE TODOS FROM LOCAL STORAGE

const removeTodosFromLocalStorage = (todo) => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// CHECK DOM LOADED OR NOT

document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage);

// ADDING TODO TO PAGE/LIST

const addToDo = (e) => {
  e.preventDefault();

  const div = document.createElement("div");
  div.classList.add("todo");

  const li = document.createElement("li");
  li.innerText = todoInput.value;
  li.classList.add("todo__item");

  div.appendChild(li);
  saveTodosTolocalStorage(todoInput.value);

  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = `<i class="fas fa-check"></i>`;
  doneBtn.classList.add("doneBtn");
  div.appendChild(doneBtn);

  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  trashBtn.classList.add("deleteBtn");
  div.appendChild(trashBtn);

  //   APPEND TO PAGE
  todoList.appendChild(div);
  todoInput.value = "";
};

// CHECKING AND DELETEING TODOS

const checkAndDelete = (e) => {
  const element = e.target;
  //   DELETE
  if (element.classList[0] === "deleteBtn") {
    const todo = element.parentElement;
    todo.classList.add("remove");
    removeTodosFromLocalStorage(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  //   CHECK
  if (element.classList[0] === "doneBtn") {
    const todo = element.parentElement;
    todo.classList.toggle("completed");
  }
};

// FILTER TODOS BASED ON THEIR STATE (e.i. "delete","comleted" etc.)

const filterTodo = (e) => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unfinished":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        break;
    }
  });
};

// EVENT LISTENERS

todoBtn.addEventListener("click", addToDo);
todoList.addEventListener("click", checkAndDelete);
todosFilter.addEventListener("click", filterTodo);
