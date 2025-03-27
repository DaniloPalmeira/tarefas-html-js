// CARREGAR TASKS ARMAZENADAS NO LOCALSTORAGE
// QUANDO A PÁGINA ABRIR.
// CASO SEJA O PRIMEIRO ACESSO ENTÃO PREPARAMOS
// O AMBIENTE PARA GERENCIAR TASKS
window.onload = () => {
  const tasks = getTasks();
  for (const taskId in tasks) {
    addNewTask({ ...tasks[taskId], id: taskId });
  }
};

// GERENCIAR TASKS NO LOCALSTORAGE
const getTasks = (id = null) => {
  if (!localStorage.getItem("tasks")) {
    setTasks();
  }
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (id) {
    return tasks[id] ?? null;
  }
  return tasks;
};

const setTasks = (tasks = {}) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const setNewTask = (task = {}) => {
  const tasks = getTasks();
  tasks[task.id] = task;
  setTasks(tasks);
};

// GERENCIAR RECUPERAÇÃO DE TASK APAGADA
const setRecovery = (task) => {
  if (!task) {
    localStorage.removeItem("task_recovery");
  }
  localStorage.setItem("task_recovery", JSON.stringify(task));
};

const getRecovery = () => {
  if (!localStorage.getItem("task_recovery")) {
    return null;
  }
  return JSON.parse(localStorage.getItem("task_recovery"));
};

// GERAR UM ID PARA CADA TASK
const randomID = (len = 32) => {
  const chars = "01234567890abcdef";
  let id = "";
  for (i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  console.log(id);
  return id;
};

// APAGAR A TASK (VISUALMENTE E DO LOCALSTORAGE)
const deleteByID = (id, empty = false) => {
  const tasks = getTasks();
  if (!empty) {
    setRecovery(tasks[id]);
  }
  delete tasks[id];
  setTasks(tasks);
  document.getElementById(`container__${id}`).remove();
};

// RECUPERAR A TASK VISUALMENTE E LIMPAR LOCALSTORAGE DE RECUPERAÇÃO
const recoveryTask = () => {
  if (!getRecovery()) {
    return;
  }
  addNewTask(getRecovery());
  setRecovery(null);
};

// MARCAR OU DESMARCAR TASK COM O STATUS "COMPLETA"
const toggleTaskCompletedByID = (id) => {
  if (document.getElementById(`checkbox__${id}`).checked) {
    document
      .getElementById(`task__${id}`)
      .classList.add(`text-decoration-line-through`);
    const tasks = getTasks();
    tasks[id] = { ...tasks[id], completed: true };
    setTasks(tasks);
  } else {
    const tasks = getTasks();
    tasks[id] = { ...tasks[id], completed: false };
    setTasks(tasks);
    document
      .getElementById(`task__${id}`)
      .classList.remove(`text-decoration-line-through`);
  }
};

// ATIVAR EDIÇÃO OU CONFIRMAR EDIÇÃO DA TASK
const toogleTaskEditByID = (id) => {
  if (document.getElementById(`task__${id}`).disabled) {
    document.getElementById(`task__${id}`).disabled = false;
    document.getElementById(
      `edit__${id}`
    ).innerHTML = `<i class="fa fa-check"></i>`;
  } else {
    setNewTask({ id, title: document.getElementById(`task__${id}`).value });
    document.getElementById(`task__${id}`).disabled = true;
    document.getElementById(
      `edit__${id}`
    ).innerHTML = `<i class="fa fa-edit"></i>`;
  }

  if (document.getElementById(`task__${id}`).value == ``) {
    deleteByID(id, true);
  }
};

// ADICIONAR NOVA TASK VISUALMENTE
const addNewTask = (task = {}) => {
  console.log(task);
  if (!task.id) {
    task.id = randomID();
  }

  if (!task.title) {
    task.title = document.getElementById(`newTaskContent`).value;
  }

  if (task.title !== "") {
    document.getElementById(`taskList`).innerHTML += newTask(task);
    document.getElementById(`newTaskContent`).value = ``;
    const tempDiv = document.getElementById(`addNewTaskDiv`);
    document.getElementById(`addNewTaskDiv`).remove();
    document.getElementById(`taskList`).appendChild(tempDiv);
  }
};

// CRIAR O ELEMENTO VISUAL DA NOVA TASK
const newTask = (task) => {
  const { title, id, completed } = task;
  setNewTask(task);
  return `<div id="container__${id}" class="input-group mb-3">
        <div class="input-group-text">
            <input id="checkbox__${id}" onclick="toggleTaskCompletedByID('${id}')" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" ${
    completed ? "checked" : ""
  }>
        </div>
        <input id="task__${id}" type="text" class="form-control ${
    completed ? "text-decoration-line-through" : ""
  }" aria-label="Text input with checkbox" value="${title}" disabled>
        <button id="edit__${id}" class="btn btn-outline-secondary" type="button" onClick="toogleTaskEditByID('${id}');"><i class="fa fa-edit"></i></button>
        <button id="delete__${id}" class="btn btn-outline-secondary" type="button" onClick="deleteByID('${id}');"><i class="fa fa-trash"></i></button>
    </div>`;
};
