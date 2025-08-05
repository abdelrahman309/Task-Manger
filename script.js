// get all elements that we need
const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const containerOfTasks = document.querySelector(".tasks-cont");
const formContainer = document.querySelector(".form-container");
const filterSelect = document.getElementById("filter");
const modeButton = document.getElementById("theme-toggle");
let staticsOfTasks = document.createElement("p");
// start buliding local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// rebulid all tasks
renderingTasks();
// dark-light mode
const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.body.classList.add("dark-mode");
  modeButton.textContent = "☀️";
} else {
  document.body.classList.remove("dark-mode");
  modeButton.textContent = "🌙";
}
//clear button created in js
let clearButton = document.createElement("button");

clearButton.textContent = "Clear ALL";
formContainer.appendChild(clearButton);
// event on clicking add
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  let valueOfInput = input.value.trim();
  if (valueOfInput === "") {
    alert(`please insert task`);
    return;
  }
  tasks.push({ value: valueOfInput, completed: false });
  saveTasks();
  renderingTasks();
  input.value = "";
});
formContainer.appendChild(staticsOfTasks);
// start the functin that apply all methods
function renderingTasks() {
  containerOfTasks.innerHTML = "";

  let taskLength = tasks.length;
  let completedTaskLength = tasks.filter((el) => el.completed).length;
  staticsOfTasks.textContent = `Total: ${taskLength} | Completed: ${completedTaskLength} | Pending: ${
    taskLength - completedTaskLength
  }`;

  let filteredTasks = tasks.filter((ele) => {
    if (filterSelect.value === "completed") return ele.completed;
    if (filterSelect.value === "uncompleted") return !ele.completed;
    return true; // all
  });

  filteredTasks.forEach((ele) => {
    // real index fter making filter

    let realIndex = tasks.indexOf(ele);
    //created elements
    let div = document.createElement("div");
    div.classList.add("task-item");
    div.innerHTML = `<p>${ele.value}</p>`;
    //start create edit button
    let editButton = document.createElement("button");
    editButton.textContent = "✏️ Edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", function () {
      let taskText = div.querySelector("p");
      let inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = ele.value;
      div.replaceChild(inputEdit, taskText);
      inputEdit.focus();
      inputEdit.addEventListener("blur", saveEdit);
      inputEdit.addEventListener("keydown", function (e) {
        if (e.key === "Enter") saveEdit();
      });
      // function that save edit
      function saveEdit() {
        let newOutPut = inputEdit.value.trim();
        if (newOutPut) {
          tasks[realIndex].value = newOutPut;
          saveTasks();
        }
        renderingTasks();
      }
    });
    //

    //completed button

    let comButton = document.createElement("button");
    comButton.textContent = `✅ completed`;
    comButton.textContent = ele.completed ? "↩ Undo" : "✅ Completed";

    if (ele.completed) div.classList.add("completed");

    comButton.addEventListener("click", function () {
      tasks[realIndex].completed = !tasks[realIndex].completed;
      saveTasks();
      renderingTasks();
    });
    // زر Remove
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      tasks.splice(realIndex, 1);
      saveTasks();
      renderingTasks();
    });

    div.appendChild(comButton);
    div.appendChild(editButton);
    div.appendChild(removeButton);

    containerOfTasks.appendChild(div);
    setTimeout(() => div.classList.add("show"), 50);
  });
}

clearButton.addEventListener("click", () => {
  tasks = [];
  saveTasks(); // return [] insistance of null
  renderingTasks();
});

filterSelect.addEventListener("change", renderingTasks);
//
modeButton.onclick = function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    modeButton.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    modeButton.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
};
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
