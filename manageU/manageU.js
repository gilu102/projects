import TaskManager from "./classes/taskManager.js";

let manager = new TaskManager();
console.log(manager);
manager.addTask("HW");
manager.addTask("Clean the mmd");
console.log(manager);

window.addNewTask = function addNewTask() {
    let description = document.getElementById("description").value;
    manager.addTask(description);
    showTasks();
};

function showTasks() {
    document.getElementById("activeTasks").innerHTML = "";
    document.getElementById("completedTasks").innerHTML = "";
    for (let task of manager.tasks) {
        if (task.completed) {
            document.getElementById(
                "completedTasks"
            ).innerHTML += `<div><li class='list-group-item d-inline-block w-50'> ${task.description}</li> <button class='btn btn-success me-1' onclick='completeTask(${task.id})'> <i class="fa-solid fa-check"></i> </button><button class='btn btn-primary me-1'> <i class="text-light fa-sharp fa-solid fa-pencil"></i> </button><button class='btn btn-danger me-1'> <i class="fa-solid fa-trash"></i> </button </div>
    `;
        } else {
            document.getElementById(
                "activeTasks"
            ).innerHTML += `<div><li class='list-group-item d-inline-block w-50'> ${task.description}</li> <button class='btn btn-success me-1' onclick='completeTask(${task.id})'> <i class="fa-solid fa-check"></i> </button><button class='btn btn-primary me-1'> <i class="text-light fa-sharp fa-solid fa-pencil"></i> </button><button class='btn btn-danger me-1'> <i class="fa-solid fa-trash"></i> </button </div>
    `;
        }
    }
}

showTasks();

window.completeTask = function completeTask(id) {
    manager.completeTask(id);
    showTasks();
};