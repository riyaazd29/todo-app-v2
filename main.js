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
    formValidation();
    
});

// Form validation
const formValidation = () => {
    if (taskTitle.value === "") {
        taskValidationError.textContent = "Please enter a task title.";
    } else {
        taskValidationError.textContent = "";
        saveTask();
        resetForm();
        // renderTasks();
    }
};

// Save task
const saveTask = () => {
    tasksArray.push ({
        taskTitle: taskTitle.value,
        taskDueDate: taskDueDate.value,
        taskDescription: taskDescription.value
    })

    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    console.log(tasksArray);
}

// Reset form
const resetForm = () => {
    taskTitle.value = "";
    taskDueDate.value = "";
    taskDescription.value = "";
}
