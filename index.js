let tasks = [];

//check if there are any tasks in localStorage
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
    renderLists();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
        renderLists();
        saveTasks();
    }
}

function toggleTasks(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    renderLists();
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    renderLists();
    saveTasks();
}

function renderLists() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const ul = document.createElement('ul');
        ul.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
            <h4 onclick="deleteTask(${index})">Delete</h4>
            `;
            taskList.appendChild(ul);
        });
    }
    
    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
            <h4 onclick="deleteTask(${index})">Delete</h4>
            
        `;
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// service worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(reg => {
            console.log('service worker registered');
        })
        .catch(error => {
            console.error('service worker registration failed')
        });
}