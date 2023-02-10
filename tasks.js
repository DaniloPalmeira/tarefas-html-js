var AccidentallyRemoved = null;
var editInProgress = [];
var lastID = 0;

const deleteByID = (id, empyt=false) => {
    if (!empyt){
        AccidentallyRemoved = document.getElementById(`task__${id}`).value
    }
    document.getElementById(`container__${id}`).remove();
}

const recoveryTask = () => {
    if (AccidentallyRemoved == null){
        return;
    }
    addNewTask(AccidentallyRemoved);
    AccidentallyRemoved = null;
}

const toggleTaskCompletedByID = (id) => {
    if (document.getElementById(`checkbox__${id}`).checked){
        document.getElementById(`task__${id}`).classList.add(`text-decoration-line-through`);
    } else {
        document.getElementById(`task__${id}`).classList.remove(`text-decoration-line-through`);
    }
}

const toogleTaskEditByID = (id) => {
    if (document.getElementById(`task__${id}`).disabled){
        document.getElementById(`task__${id}`).disabled = false;
        document.getElementById(`edit__${id}`).innerHTML = `<i class="fa fa-check"></i>`;
    } else {
        document.getElementById(`task__${id}`).disabled = true;
        document.getElementById(`edit__${id}`).innerHTML = `<i class="fa fa-edit"></i>`;
    }

    // Remover caso a tarefa esteja em branco
    if (document.getElementById(`task__${id}`).value == ``){
        deleteByID(id, true);
    }
}

const addNewTask = (title=null) => {
    if (title == null){
        var newTaskContent = document.getElementById(`newTaskContent`).value;
    } else {
        var newTaskContent = title;
    }

    if (newTaskContent !== ``){
        document.getElementById(`taskList`).innerHTML += newTask(newTaskContent);
        document.getElementById(`newTaskContent`).value = ``;
        const tempDiv = document.getElementById(`addNewTaskDiv`);
        document.getElementById(`addNewTaskDiv`).remove();
        document.getElementById(`taskList`).appendChild(tempDiv);
    }
}

const newTask = (title) => {
    var id = lastID++;
    return `<div id="container__${id}" class="input-group mb-3">
        <div class="input-group-text">
            <input id="checkbox__${id}" onclick="toggleTaskCompletedByID(${id})" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
        </div>
        <input id="task__${id}" type="text" class="form-control" aria-label="Text input with checkbox" value="${title}" disabled>
        <button id="edit__${id}" class="btn btn-outline-secondary" type="button" onClick="toogleTaskEditByID(${id});"><i class="fa fa-edit"></i></button>
        <button id="delete__${id}" class="btn btn-outline-secondary" type="button" onClick="deleteByID(${id});"><i class="fa fa-trash"></i></button>
    </div>`;
}