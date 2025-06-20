const addNew = document.getElementById("addNew");
const form = document.getElementById("form");
const taskTitle = document.getElementById("taskTitle");
const taskDueDate = document.getElementById("taskDueDate");
const taskDescription = document.getElementById("taskDescription");
const tasksList = document.getElementById("tasks");
const validationError = document.getElementById("validationError");
const addTaskButton = document.getElementById("addTask");
let tasksArray = [];

// adds an event listener to the submit button to prevent default refresh on click behavior, followed by executing the form validation and renderTask (i.e. display task on screen) functions
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
    renderTask();
})

// checks the task title field for input and if blank, displays an error message to the user. if not blank, the saveTask function is called and the attribute to dismiss the modal is added on clicking the "add task" button, followed by removing the attribute once more
const formValidation = () => {
    if (taskTitle.value ==="") {
        validationError.textContent = "Please enter a task title";
    } else {
        console.log("task saved");
        saveTask();

        addTaskButton.setAttribute("data-te-modal-dismiss", "modal");
        addTaskButton.click();

        (() => {
            addTaskButton.setAttribute("data-te-modal-dismiss", "")
        });
    }
}

// adds the values for the input fields in the modal to the tasks array and stores in browser localstorage. this is followed by resetting the form to blank using the resetForm function, and then removes any validation message if it exists.
const saveTask = () => {
    tasksArray.push({
        taskTitle: taskTitle.value,
        taskDueDate: taskDueDate.value,
        taskDescription: taskDescription.value,
    });

    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

    console.log(tasksArray);

    resetForm();

    validationError.textContent = "";
}

// resets the input form to blank
const resetForm = () => {
    taskTitle.value = "";
    taskDueDate.value = "";
    taskDescription.value = "";
}

// resets the tasksList HTML to blank and then iterates over the array using a map function to add any new tasks to the list. this is accomplished by pulling in the value in the array for each property.
const renderTask = () => {
    tasksList.innerHTML = "";
    tasksArray.map((x,y) => {
        return(tasksList.innerHTML += `
        <div id=${y}>    
            <div class="bg-gradient-to-tr from-blue-200 via-indigo-200 to-blue-200 rounded-lg border-2 border-indigo-700 p-1">
                <sp class="font-semibold text-indigo-950 uppercase">${x.taskTitle}</sp>
                <sp class="font-medium text-xs text-slate-400">${x.taskDueDate}</sp>
                <p class="font-light text-sm px-1 text-indigo-900">${x.taskDescription}</p>

                <span class="options">
                    <i onClick="editTask(this)" data-te-toggle="modal" data-te-target="#form" class="fas fa-edit text-indigo-900"></i>
                    <i onClick="deleteTask(this); renderTask()" class="fas fa-trash text-indigo-900"></i>
                </span>
            </div>
        </div>
        `)
    });
}

// when the event occurs, the selected task is deleted by selecting the parent of the parent element. then this selected task is removed from the array and the localStorage is updated with the new array.
const deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    tasksArray.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

    console.log(tasksArray);
}

// the selected task is based on the event which then references the relevant property from the tasks array and sets the form field values accordingly. the selected task is then deleted to ensure the updated task details replaces the selected task.
const editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    taskTitle.value = selectedTask.children[0].innerHTML;
    taskDueDate.value = selectedTask.children[1].innerHTML;
    taskDescription.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
}

// fetches the array data from localStorage, or if there is none, it sets the tasks array to blank. the tasks that are retrieved are then rendered using the renderTask function.
(() => {
    tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];
    console.log(tasksArray);
    renderTask();
})();