const card = document.getElementById("project_card");
// const card_icon = document.getElementById("contact_taskbar_icon");
let isDragging = false;
let offsetX, offsetY;
let isMaximized = false;
let prevStyle = {}; // store previous position/size

// Start dragging on mousedown
card.addEventListener("mousedown", (e) => {
  if (isMaximized) return;
  isDragging = true;
  offsetX = e.clientX - card.offsetLeft;
  offsetY = e.clientY - card.offsetTop;
  card.style.cursor = "grabbing";
});

// Move card on mousemove
document.addEventListener("mousemove", (e) => {
  if (isMaximized) return;
  if (isDragging) {
    card.style.left = `${e.clientX - offsetX}px`;
    card.style.top = `${e.clientY - offsetY}px`;
  }
});

// Stop dragging
document.addEventListener("mouseup", () => {
  if (isMaximized) return;
  isDragging = false;
  card.style.cursor = "grab";
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#close_btn_project")) {
    const card = document.getElementById("project_card");
    card.innerHTML = "";
    card.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#maximize_btn_project")) {
    if (!isMaximized) {
      // Save current position/size
      prevStyle = {
        left: card.style.left,
        top: card.style.top,
        width: card.style.width,
        height: card.style.height,
      };
      const secondChild = card.children[1];
      console.log(secondChild);
      // Maximize
      card.style.left = "0px";
      card.style.top = "0px";
      card.style.width = "100%";
      card.style.height = "100%";
      secondChild.style.minHeight = "calc(100vh - 56px)"; // Adjust for taskbar height
      card.style.borderRadius = "0"; // Windows-like

      isMaximized = true;
    } else {
      // Restore previous size/position
      card.style.left = prevStyle.left || "100px";
      card.style.top = prevStyle.top || "100px";
      card.style.width = prevStyle.width || "1100px";
      card.style.height = prevStyle.height || "400px";
      card.style.borderRadius = "0.5rem";

      isMaximized = false;
    }
  }
});

// Handle minimize
document.addEventListener("click", (e) => {
  const project_task_icon = document.getElementById("project_task_icon");
  if (e.target.closest("#minimize_btn_project")) {
    card.style.display = "none";
    project_task_icon.parentElement.style.background = "transparent";
    project_task_icon.parentElement.classList.add("short-border");
    // card_icon.style.background = "transparent";
    // hide it
    // later you can show again by clicking icon in taskbar
  }
});
