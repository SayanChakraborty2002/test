document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const taskChart = document.getElementById("task-chart");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    renderTasks(task);
  });

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const val = input.value.trim();
    if (val === "") {
      alert("please write task");
      return;
    }
    const task = {
      id: Date.now(),
      value: val,
      isComplete: false,
    };

    tasks.push(task);
    saveTolocalStorage();
    renderTasks(task);
    input.value = "";
  });

  function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
      <p>${task.value}</p>
      <button class="delete">Delete</button>
    `;
    taskChart.appendChild(li);
  }

  function saveTolocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  taskChart.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("delete")) {
      tasks = tasks.filter((t) => t.id !== id);
      li.remove();
      saveTolocalStorage();
      return;
    }
    let task = tasks.find((t) => t.id === id);
    if (!task) return;
    task.isComplete = !task.isComplete;
    li.classList.toggle("completed");
    saveTolocalStorage();
  });
});

//  li.addEventListener("click", function (e) {
//     if (e.target.className === "delete") return;
//     li.isComplete = !li.isComplete;
//     li.classList.toggle("completed");
//     saveTolocalStorage();
//   });

//   li.querySelector("button").addEventListener("click", function (e) {
//     e.stopPropagation();
//     tasks = tasks.filter((t) => t.id !== task.id);
//     li.remove();
//     saveTolocalStorage();
//   });
