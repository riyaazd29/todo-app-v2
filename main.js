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
        renderTasks();
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

// Render tasks
const renderTasks = () => {
    taskList.innerHTML = "";
    tasksArray.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.id = index;
        taskDiv.classList.add('bg-gradient-to-tr', 'from-blue-200', 'via-indigo-200', 'to-blue-200', 'rounded-lg', 'border-2', 'border-indigo-700', 'p-1');

        const taskTitleSpan = document.createElement('span');
        taskTitleSpan.textContent = task.taskTitle;
        taskTitleSpan.classList.add('font-semibold', 'text-indigo-950', 'uppercase');

        const taskDueDateSpan = document.createElement('span');
        taskDueDateSpan.textContent = task.taskDueDate;
        taskDueDateSpan.classList.add('font-light', 'text-sm', 'text-slate-400', 'px-1');

        const taskDescriptionP = document.createElement('p');
        taskDescriptionP.textContent = task.taskDescription;
        taskDescriptionP.classList.add('font-light', 'text-sm', 'px-1');

        const optionsSpan = document.createElement('span');
        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-edit', 'text-indigo-900');
        editIcon.setAttribute('data-te-toggle', 'modal');
        editIcon.setAttribute('data-te-target', '#form');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash', 'text-indigo-900');

        editIcon.onclick = function() {
            console.log("Edit button clicked for task at index:", taskDiv.id);
        }

        deleteIcon.onclick = function() {
            console.log("Delete button clicked for task at index:", taskDiv.id);
        }

        // Append icons to optionsSpan
        optionsSpan.appendChild(editIcon);
        optionsSpan.appendChild(deleteIcon);

        // Append taskTitleSpan, taskDueDateSpan, taskDescriptionP, optionsSpan to taskDiv
        taskDiv.appendChild(taskTitleSpan);
        taskDiv.appendChild(taskDueDateSpan);
        taskDiv.appendChild(taskDescriptionP);
        taskDiv.appendChild(optionsSpan);

        // Append taskDiv to tasksList
        taskList.appendChild(taskDiv);
    })
};

// Load tasks from localStorage and render
(() => {
    tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];
    console.log("tasksArray");
    renderTasks();
})();