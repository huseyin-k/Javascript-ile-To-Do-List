let userFormDOM = document.querySelector('#userForm');
userFormDOM.addEventListener('submit', formHandler);

const alertDOM = document.querySelector('#liveToast');  

function formHandler(event) {
    event.preventDefault();
    const USER_NAME = document.querySelector('#username');
    if (USER_NAME.value) {
        addItem(USER_NAME.value);
        USER_NAME.value = "";
        $(".success").toast("show");
    } else {
        $(".error").toast("show");
    }
}

let userListDOM = document.querySelector('#list');

const addItem = (userName) => {
    let li = document.createElement('li');
    li.innerHTML = `${userName} <span class="close">&times;</span>`;
    userListDOM.append(li);
}

const list = document.getElementById("list");

list.addEventListener("click", function (task) {
    if (task.target.tagName === "LI") {
        task.target.classList.toggle("checked");
    }
});

list.onclick = function (event) {
    let target = event.target;
    if (target.tagName === "SPAN") {
        let li = target.parentNode;
        if (li.classList.contains("checked")) {
            let index = Array.from(list.children).indexOf(li);
            list.removeChild(li);
            tasks.splice(index, 1);
            let tasksString = JSON.stringify(tasks);
            localStorage.setItem("tasks", tasksString);
        } else {
            li.classList.add("checked");
        }
    }
};

window.onload = function () {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(function (task) {
            let li = document.createElement("li");
            li.innerHTML = `${task} <span class="close">&times;</span>`;
            list.appendChild(li);
        });
    }
};