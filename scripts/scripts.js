const newTaskBtn = document.querySelector(".newTask");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modalContainer");
const cancelBtn = document.querySelector(".cancelBtn");
const btnTasks = document.querySelectorAll(".btnTasks");
const weekdayEl = document.querySelector("#weekday");
const dateEl = document.querySelector("#date");
const addTaskBtn = document.querySelector("#addTaskBtn");
const doneTaskBtn = document.querySelector("#doneTaskBtn");
const allBtn = document.querySelector("#allBtn");
const activeTaskBtn = document.querySelector("#activeTaskBtn");
const error = document.querySelector("#error");

const today = new Date();
weekdayEl.textContent = today.toLocaleDateString("en-Uk", {
  weekday: "long",
});
dateEl.textContent = today.toLocaleDateString("en-Uk", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});

newTaskBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
});

btnTasks.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnTasks.forEach((b) => b.classList.remove("isActive"));
    btn.classList.add("isActive");
  });
});

const filterTodos = (filter) => {
  const todos = JSON.parse(localStorage.getItem("todosStorage")) || [];
  if (filter === "active") {
    return todos.filter((todo) => !todo.done);
  }
  if (filter === "done") {
    return todos.filter((todo) => todo.done);
  }
  return todos;
};

allBtn.addEventListener("click", () => {
  const list = filterTodos("all");
  renderTodos(list);
});

activeTaskBtn.addEventListener("click", () => {
  const list = filterTodos("active");
  renderTodos(list);
});

doneTaskBtn.addEventListener("click", () => {
  const list = filterTodos("done");
  renderTodos(list);
});

const getTodos = () => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));
  return localStorageTodos;
};

const createTodo = (descriptInp, dateInp, timeInput) => {
  const localStorageTodos = getTodos();
  const newTodo = {
    id: "todo_" + Math.random().toString(16).slice(2),
    dateInp,
    descriptInp,
    timeInput,
    done: false,
  };
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    localStorageTodos.push(newTodo);
    localStorage.setItem("todosStorage", JSON.stringify(localStorageTodos));
  } else {
    localStorage.setItem("todosStorage", JSON.stringify([newTodo]));
  }
  renderTodos();
};

const renderTodos = (todosList) => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));
  const list = document.querySelector(".containerTask");
  const todos = todosList || localStorageTodos || [];
  list.innerHTML = "";
  todos.forEach((todo) => {
    const id = todo.id;
    list.insertAdjacentHTML(
      "beforeend",
      `
<li class="todoBlock">
  <label class="checkbox" for="${id}">
    <input type="checkbox" id="${id}" ${todo.done ? "checked" : ""}/>
    <span class="material-symbols-rounded checkbox__check-icon">
      <svg><use href="assets/icons/check_18dp_1D192B_FILL0_wght400_GRAD0_opsz20.svg"></use></svg>
    </span>
  </label>
  <div class="todoBlockData">
    <p class="todoBlockDateText">${todo.timeInput}, ${todo.dateInp}</p>
    <h3 class="todoBlockTitle">${todo.descriptInp}</h3>
  </div>
</li>
`
    );
  });

  const checkboxes = list.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const id = e.target.id;
      const todos = JSON.parse(localStorage.getItem("todosStorage")) || [];
      const updated = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: e.target.checked };
        }
        return todo;
      });
      localStorage.setItem("todosStorage", JSON.stringify(updated));
    });
  });
};

addTaskBtn.addEventListener("click", () => {
  const descriptInp = document.querySelector("#descriptInp").value.trim();
  const dateInp = document.querySelector("#dateInp").value.trim();
  const timeInput = document.querySelector("#time").value.trim();
  if (!descriptInp || !dateInp || !timeInput) {
    error.textContent = "Please fill in all fields";
    return;
  }

  error.textContent = "";
  createTodo(descriptInp, dateInp, timeInput);
  renderTodos();
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  const form = document.querySelector(".formNewTask");
  form.reset();
});
