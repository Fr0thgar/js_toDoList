// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.foreach((task, index)=> {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.innerHTML = `
        <span>${task.text}</span> 
        <button onclick="deleteTask(${index})">Delete</button>
        `;
        li.addEventListener('click', () => toggleTaskCompletion(index));
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '')
}