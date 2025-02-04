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

        // Task text
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent the li click event from firing
            deleteTask(index);
        });
        li.appendChild(deleteBtn);

        // Toggle completion on click
        li.addEventListener('click', () => toggleTaskCompletion(index));

        // Add the task to the list
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== ''){
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

// Toggle task completion
function toggleTaskCompletion(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete a task 
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();