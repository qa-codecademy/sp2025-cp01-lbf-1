// Constants
const STORAGE_KEY = 'todos';
const MAX_TODOS = 100;

// Todo class for data structure
class Todo {
	constructor(id, text, completed = false) {
		this.id = id;
		this.text = text;
		this.completed = completed;
		this.createdAt = new Date().toISOString();
	}
}

// Data management functions
async function getTodos() {
	try {
		const todosJson = localStorage.getItem(STORAGE_KEY);
		if (!todosJson) {
			// Initialize with mock data if no data exists
			try {
				// Use the mock data from our mock-data.js file
				const mockData = MOCK_DATA;
				saveTodos(mockData.todos);
				return mockData.todos;
			} catch (error) {
				console.error('Error loading mock data:', error);
				// Fallback to empty array if mock data fails to load
				return [];
			}
		}
		return JSON.parse(todosJson);
	} catch (error) {
		console.error('Error reading todos from localStorage:', error);
		return [];
	}
}

function saveTodos(todos) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	} catch (error) {
		console.error('Error saving todos to localStorage:', error);
		showError(
			'Failed to save todos. Please check your browser storage settings.'
		);
	}
}

// UI functions
async function renderTodos() {
	const todoList = document.getElementById('todoList');
	const todos = await getTodos();

	todoList.innerHTML = todos
		.map(
			todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${
				todo.id
			}">
            <input type="checkbox" class="checkbox" 
                   ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${
							todo.id
						})">Delete</button>
        </div>
    `
		)
		.join('');
}

async function addTodo() {
	const input = document.getElementById('newTodo');
	const text = input.value.trim();

	if (!text) {
		showError('Please enter a todo text');
		return;
	}

	const todos = await getTodos();
	if (todos.length >= MAX_TODOS) {
		showError('Maximum number of todos reached');
		return;
	}

	const newTodo = new Todo(Date.now(), text);
	todos.push(newTodo);
	saveTodos(todos);

	input.value = '';
	await renderTodos();
	clearError();
}

async function toggleTodo(id) {
	const todos = await getTodos();
	const todoIndex = todos.findIndex(todo => todo.id === id);

	if (todoIndex !== -1) {
		todos[todoIndex].completed = !todos[todoIndex].completed;
		saveTodos(todos);
		await renderTodos();
	}
}

async function deleteTodo(id) {
	const todos = await getTodos();
	const filteredTodos = todos.filter(todo => todo.id !== id);
	saveTodos(filteredTodos);
	await renderTodos();
}

// Utility functions
function showError(message) {
	const errorElement = document.getElementById('errorMessage');
	errorElement.textContent = message;
}

function clearError() {
	const errorElement = document.getElementById('errorMessage');
	errorElement.textContent = '';
}

function escapeHtml(unsafe) {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// Event listeners
document.getElementById('newTodo').addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		addTodo();
	}
});

// Initialize the app
async function initializeApp() {
	await renderTodos();
}

// Start the application
initializeApp();
