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
  form.addEventListener("submit", addTask); // add task
  taskList.addEventListener("click", removeTask); // remove task
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
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

// remove task from ui
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove(); // remove element two up from icon
      console.log(e.target);
    }
  }
}

// clear btn
function clearTasks() {
  // while loop faster: while there is an li in taskList div remove it
  // taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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
