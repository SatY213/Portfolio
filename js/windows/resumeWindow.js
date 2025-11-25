const card = document.getElementById("resume_card");

// const card_icon = document.getElementById("contact_taskbar_icon");
let isDragging = false;
let offsetX, offsetY;

// Start dragging on mousedown
card.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - card.offsetLeft;
  offsetY = e.clientY - card.offsetTop;
  card.style.cursor = "grabbing";
});

// Move card on mousemove
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    card.style.left = `${e.clientX - offsetX}px`;
    card.style.top = `${e.clientY - offsetY}px`;
  }
});

// Stop dragging
document.addEventListener("mouseup", () => {
  isDragging = false;
  card.style.cursor = "grab";
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#close_btn_resume")) {
    const card = document.getElementById("resume_card");
    card.innerHTML = "";
    card.style.display = "none";
  }
});

let isMaximizedResume = false;
let prevStyle = {}; // store previous position/size

document.addEventListener("click", (e) => {
  if (e.target.closest("#maximize_btn_resume")) {
    if (!isMaximizedResume) {
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
      card.style.borderRadius = "0"; // Windows-like

      isMaximizedResume = true;
    } else {
      // Restore previous size/position
      card.style.left = prevStyle.left || "100px";
      card.style.top = prevStyle.top || "100px";
      card.style.width = prevStyle.width || "600px";
      card.style.height = prevStyle.height || "400px";
      card.style.borderRadius = "0.5rem";

      isMaximizedResume = false;
    }
  }
});

// Handle minimize
document.addEventListener("click", (e) => {
  if (e.target.closest("#minimize_btn_resume")) {
    card.style.display = "none";
    // card_icon.style.background = "transparent";
    // hide it
    // later you can show again by clicking icon in taskbar
  }
});
