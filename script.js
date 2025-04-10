let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("tasklist");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-100 p-2 rounded-lg";

        const taskText = document.createElement("span");
        taskText.textContent = `${task.text} (Priority: ${task.priority}, Due: ${task.dueDate}, Created: ${task.creationDate})`;
        taskText.className = task.completed ? "line-through text-gray-500" : "";
        taskText.onclick = () => toggleTask(index);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "text-blue-500 hover:text-blue-700 mx-2";
        editBtn.onclick = () => editTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "text-red-500 hover:text-red-700";
        delBtn.onclick = () => deleteTask(index);

        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const dueDateInput = document.getElementById("dueDateInput");

    const text = input.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;
    const creationDate = new Date().toLocaleDateString(); // Get the current date

    if (text === "") return;

    tasks.push({ text, completed: false, priority, dueDate, creationDate });
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function clearAllTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

renderTasks();