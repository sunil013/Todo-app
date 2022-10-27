let todoItemsContainer = document.getElementById("todoItemsContainer");
let savaTodoBtn = document.getElementById("saveTodoButton");


function getItemFromLocal() {
    let stringifiedList = localStorage.getItem("todolist");
    let parsedList = JSON.parse(stringifiedList);

    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }
}

let todoList = getItemFromLocal();

savaTodoBtn.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
};

let todoCount = todoList.length;
let addTodoButton = document.getElementById("addTodoButton");

addTodoButton.onclick = function() {
    addTodo();
};

function onTodoStatusChange(checkBoxId, labelId, todoId) {
    let checkBoxEle = document.getElementById(checkBoxId);
    let labelEle = document.getElementById(labelId);
    labelEle.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachItem) {
        let eachItemId = "todo" + eachItem.uniqueNo;
        if (todoId === eachItemId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function deleteTask(todoId) {
    let listEle = document.getElementById(todoId);
    todoItemsContainer.removeChild(listEle);
    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        console.log(eachTodoId);
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkBoxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkBoxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        deleteTask(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

function addTodo() {
    let userInputEle = document.getElementById("todoUserInput");
    let userInputValue = userInputEle.value;
    if (userInputValue === "") {
        alert("Enter Valid Input");
        return;
    }
    todoCount = todoCount + 1;
    let Todo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    todoList.push(Todo);
    createAndAppendTodo(Todo);
    userInputEle.value = "";

}
for (let eachtodo of todoList) {
    createAndAppendTodo(eachtodo);
}
