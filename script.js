const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
// Render todos
// Render todos
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.textContent = todo.text;
    if (todo.completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    // Delete button
    const delBtn = document.createElement("span");
    delBtn.textContent = "❌";
    delBtn.classList.add("delete-btn");

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Save to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add new todo
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  renderTodos();
});

// Initial render
renderTodos();