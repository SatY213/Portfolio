const card = document.getElementById("resume_card");
const resume_task_icon = document.getElementById("resume_task_icon");
let isDragging = false;
let offsetX, offsetY;
let isMaximized = false;
function startDragging(clientX, clientY) {
  isDragging = true;
  offsetX = clientX - card.offsetLeft;
  offsetY = clientY - card.offsetTop;
  card.style.userSelect = "none";
}

// Common function to move card
function moveCard(clientX, clientY) {
  if (isDragging) {
    card.style.left = `${clientX - offsetX}px`;
    card.style.top = `${clientY - offsetY}px`;
  }
}

function stopDragging() {
  isDragging = false;
  card.style.userSelect = "";
}

// Mouse events
card.addEventListener("mousedown", (e) => {
  if (isMaximized) return;
  e.preventDefault();

  const element = e.target;
  const id = element.id;
  if (id !== "resume_window_header") {
    return;
  }
  startDragging(e.clientX, e.clientY);
});

document.addEventListener("mousemove", (e) => {
  if (isMaximized) return;

  e.preventDefault();

  moveCard(e.clientX, e.clientY);
});

document.addEventListener("mouseup", stopDragging);

document.addEventListener("click", (e) => {
  if (e.target.closest("#close_btn_resume")) {
    const card = document.getElementById("resume_card");
    card.innerHTML = "";
    card.style.display = "none";
    resume_task_icon.parentElement.style.background = "transparent";
    resume_task_icon.parentElement.style.display = "none";

    resume_task_icon.parentElement.classList.remove("short-border");
  }
});

// Maximize/Restore functionality
isMaximized = false;
let prevStyle = {};

// Mouse click for maximize
document.addEventListener("click", (e) => {
  if (e.target.closest("#maximize_btn_resume")) {
    toggleMaximize();
  }
});

function toggleMaximize() {
  if (!isMaximized) {
    // Save current position/size
    prevStyle = {
      left: card.style.left,
      top: card.style.top,
      width: card.style.width,
      height: card.style.height,
    };

    // Maximize
    card.style.left = "0px";
    card.style.top = "0px";
    card.style.width = "100%";
    card.style.minWidth = "100vh";
    card.style.height = "100%";
    card.style.borderRadius = "0";

    isMaximized = true;
  } else {
    // Restore previous size/position
    card.style.left = prevStyle.left || "100px";
    card.style.top = prevStyle.top || "100px";
    card.style.width = prevStyle.width || "600px";
    card.style.height = prevStyle.height || "400px";
    card.style.borderRadius = "0.5rem";

    isMaximized = false;
  }
}

// Minimize functionality
document.addEventListener("click", (e) => {
  if (e.target.closest("#minimize_btn_resume")) {
    card.style.display = "none";
    resume_task_icon.parentElement.style.background = "transparent";
    resume_task_icon.parentElement.classList.add("short-border");
  }
});
