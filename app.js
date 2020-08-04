// ui vars
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

// load event listeners
loadEventListeners();

// form event to trigger addTask
function loadEventListeners() {
  form.addEventListener("submit", addTask);
}

// addTask
function addTask(e) {
  if (taskInput.value === "") {
    alert("You must enter a task");
    return;
  }

  // create a tasklist elements
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

  // clear input field
  taskInput.value = "";

  e.preventDefault();
}
