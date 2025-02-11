// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item${task.completed ? ' completed' : ''}`;

        // Add task name to the list item
        li.textContent = task.name; // Ensure the task name is displayed

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);
        
        li.appendChild(deleteBtn); // Append the delete button to the list item
        taskList.appendChild(li); // Append the list item to the task list
    });
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskName = taskInput.value.trim(); // Get the input value

    if (taskName) { // Check if the input is not empty
        tasks.push({ name: taskName, completed: false }); // Add task to the array
        taskInput.value = ''; // Clear the input field
        renderTasks(); // Call renderTasks to update the display
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