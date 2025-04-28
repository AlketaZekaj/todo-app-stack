async function loadImage() {
    const res = await fetch('https://picsum.photos/1200');
    document.getElementById("random-image").src = res.url;
  }
  
  async function loadTodos() {
    const res = await fetch("/todos");
    const todos = await res.json();
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    todos.forEach(todo => {
      const item = document.createElement("li");
      item.textContent = todo.text;
      list.appendChild(item);
    });
  }
  
  async function addTodo() {
    const input = document.getElementById("todo-input");
    const text = input.value.trim();
    if (!text || text.length > 140) return;
    await fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    input.value = "";
    loadTodos();
  }
  
  document.getElementById("todo-button").onclick = addTodo;
  window.onload = () => {
    loadImage();
    loadTodos();
  };
  