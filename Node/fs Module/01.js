const fs = require("fs");
const path = "./tasks.json";

const command = process.argv[2];
const arg = process.argv[3];

loadTask = () => {
  try {
    const dataBufffer = fs.readFileSync(path);
    const data = dataBufffer.toString();
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

addTask = (task) => {
  const tasks = loadTask();
  tasks.push(task);
  if (saveTask(tasks)) {
    console.log("Task Added");
  }
};

saveTask = (tasks) => {
  try {
    const data = JSON.stringify(tasks);
    console.log(data);
    fs.writeFileSync(path, data);
  } catch (err) {
    console.log(err, "cant write to the file");
  }
};

removeTask = (idx) => {
    const tasks=loadTask();
    idx=Number(idx);
    tasks.splice(idx,1);
    saveTask(tasks);
};

listTask = () => {
    const tasks =loadTask();
    console.table(tasks);
};

if (command === "add") {
  addTask(arg);
} else if (command === "list") {
  listTask();
} else if (command === "remove") {
  removeTask(arg);
} else {
  console.log("Command not found");
}
