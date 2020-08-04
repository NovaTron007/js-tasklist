// ui vars
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

// load event listeners
loadEventListeners();

// events
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks); // when dom renders load tasks from storage
  form.addEventListener("submit", addTask); // add task
  taskList.addEventListener("click", removeTask); // remove task
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

// get tasks form storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // loop storage and create element for storage item
  tasks.forEach(task => {
    // create a tasklist element
    const taskItem = task;
    const li = document.createElement("li");
    const link = document.createElement("a"); // create a link for li
    const deleteIcon = document.createElement("i"); // create icon for link

    // add class to list element and storage item inside it
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskItem));

    // add classes to link
    link.className = "delete-item secondary-content";

    // add class to delete icon, add icon inside link
    deleteIcon.className = "fa fa-remove";
    link.appendChild(deleteIcon);

    li.appendChild(link); // add link to li
    taskList.appendChild(li); // add item to list div
  });
}

// add task to UI
function addTask(e) {
  // create a tasklist element
  const li = document.createElement("li");
  const link = document.createElement("a"); // create a link for li
  const deleteIcon = document.createElement("i"); // create icon for link

  // add class to list element and text inside it
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  // add classes to link
  link.className = "delete-item secondary-content";

  // add class to delete icon, add icon inside link
  deleteIcon.className = "fa fa-remove";
  link.appendChild(deleteIcon);

  li.appendChild(link); // add link to li
  taskList.appendChild(li); // add item to list div

  // pass task to storage function
  storeTaskInLocalStorage(taskInput.value);

  // prevent form behaviour
  e.preventDefault();
}

// localStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // 1. Add to array
  tasks.push(task);
  // 2. Add tasks array to storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // clear input field
  taskInput.value = "";
}

// remove task from ui
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove(); // remove element two up from icon
    // pass item to delete, to remove from storage
    removeTaskFromStorage(e.target.parentElement.parentElement);
  }
}

// remove item from localStorage: pass in element
function removeTaskFromStorage(task) {
  const removedItem = task.innerText;

  // set tasks for storage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((item, index) => {
    if (removedItem === item) {
      console.log(removedItem);
      tasks.splice(index, 1);
    }
  });
  // update storage tasks now item is removed
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear btn
function clearTasks() {
  // while loop faster: while there is an li in taskList div remove it
  // taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear storage
  localStorage.clear();
}

// filter
function filterTasks(e) {
  const filterInput = e.target.value.toLowerCase();

  // loop all items in UI
  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent; // current item
    // indexOf returns -1  when no match
    if (item.toLowerCase().indexOf(filterInput) == -1) {
      task.style.display = "none";
    } else {
      task.style.display = "block";
    }
  });
}
