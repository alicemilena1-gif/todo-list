const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");
const toggleTheme = document.getElementById("toggleTheme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// salvar no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// renderizar tarefas
function renderTasks() {
  taskList.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleTask(${index})">✔</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;

      taskList.appendChild(li);
    });
}

// adicionar tarefa
addTaskBtn.onclick = () => {
  if (taskInput.value === "") return;

  tasks.push({ text: taskInput.value, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
};

// concluir tarefa
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// deletar tarefa
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// filtros
filterButtons.forEach(btn => {
  btn.onclick = () => {
    filter = btn.dataset.filter;
    renderTasks();
  };
});

// dark mode
toggleTheme.onclick = () => {
  document.body.classList.toggle("dark");
};

// iniciar
renderTasks();
