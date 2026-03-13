document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-btn");
  const todoForm = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const body = document.body;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    renderTasks(task);
  });
  // const tasksChart = document.createElement("ul");
  // tasksChart.className = "task-chart";
  // body.appendChild(tasksChart);

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

    input.value = "";
  });
  function renderTasks(task) {
    console.log(task);
  }
  function saveTolocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

// const deleteBtn = document.createElement("button");
// deleteBtn.innerText = "delete";
// deleteBtn.id = "delete-btn";

// const newTask = document.createElement("li");
// newTask.innerText = task.value;
// newTask.className = "list-item";

// newTask.appendChild(deleteBtn);

// tasksChart.appendChild(newTask);
