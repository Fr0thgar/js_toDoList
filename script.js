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

        // Set dynamic text color based on background color
        const backgroundColor = '#000000'; // Replace with your actual background color
        li.style.color = getContrastYIQ(backgroundColor); // Set text color dynamically

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);
        
        li.appendChild(deleteBtn); // Append the delete button to the list item
        taskList.appendChild(li); // Append the list item to the task list
    });
}

// Function to determine text color based on background color
function getContrastYIQ(hexcolor) {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white'; // Return black for light backgrounds, white for dark
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