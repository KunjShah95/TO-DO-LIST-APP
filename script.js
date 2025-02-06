const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const charCount = document.querySelector('#charCount');
const totalTasks = document.querySelector('#totalTasks');
const completedTasks = document.querySelector('#completedTasks');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateStats() {
    totalTasks.textContent = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    completedTasks.textContent = completed;
}

function createTodoElement(todo, index) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
        <div class="action-buttons">
            <button class="btn complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
            <button class="btn edit-btn">Edit</button>
            <button class="btn delete-btn">Delete</button>
        </div>
    `;

    li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
    li.querySelector('.edit-btn').addEventListener('click', () => editTodo(index));

    return li;
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        todoList.appendChild(createTodoElement(todo, index));
    });
    updateStats();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        updateLocalStorage();
        renderTodos();
    }
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    updateLocalStorage();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    updateLocalStorage();
    renderTodos();
}

function editTodo(index) {
    const newText = prompt('Edit your task:', todos[index].text);
    if (newText !== null) {
        todos[index].text = newText.trim();
        updateLocalStorage();
        renderTodos();
    }
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

todoInput.addEventListener('input', () => {
    charCount.textContent = `${todoInput.value.length}/100`;
});

// Initial render
renderTodos();