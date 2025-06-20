// DOM element selections
const taskForm = document.getElementById("form");
const taskTitle = document.getElementById("taskTitle");
const taskDueDate = document.getElementById("taskDueDate");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("tasks");
const taskValidationError = document.getElementById("validationError");
const addTask = document.getElementById("addTask");

// Data array
let tasksArray = [];

// Form submission handler
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // formValidation();
    // renderTasks();
})