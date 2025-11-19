const newTaskBtn = document.querySelector(".newTask");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modalContainer");
const cancelBtn = document.querySelector(".cancelBtn");
const btnTasks = document.querySelectorAll(".btnTasks");
const weekdayEl = document.querySelector("#weekday");
const dateEl = document.querySelector("#date");

const today = new Date();
weekdayEl.textContent = today.toLocaleDateString("en-Uk", {
  weekday: "long",
});
dateEl.textContent = today.toLocaleDateString("en-Uk", {
  day: "numeric",
  month: "long",
  year: "numeric",
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
