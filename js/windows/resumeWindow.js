const card = document.getElementById("resume_card");
let isDragging = false;
let offsetX, offsetY;
let isTouchDevice = false;

// Common function to start dragging
function startDragging(clientX, clientY) {
  isDragging = true;
  offsetX = clientX - card.offsetLeft;
  offsetY = clientY - card.offsetTop;
  card.style.userSelect = "none"; // Prevent text selection during drag
}

// Common function to move card
function moveCard(clientX, clientY) {
  if (isDragging) {
    card.style.left = `${clientX - offsetX}px`;
    card.style.top = `${clientY - offsetY}px`;
  }
}

// Common function to stop dragging
function stopDragging() {
  isDragging = false;
  card.style.userSelect = ""; // Restore text selection
}

// Mouse events
card.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Prevent text selection
  const element = e.target; // The element you clicked
  const id = element.id; // Get its ID
  if (id !== "resume_window_header") {
    return;
  }
  startDragging(e.clientX, e.clientY);
});

document.addEventListener("mousemove", (e) => {
  e.preventDefault();
  moveCard(e.clientX, e.clientY);
});

document.addEventListener("mouseup", stopDragging);

// Touch events
card.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent scrolling
  const element = e.target; // The element you clicked
  const id = element.id; // Get its ID
  if (id !== "resume_window_header") {
    return;
  }
  isTouchDevice = true;
  const touch = e.touches[0];
  startDragging(touch.clientX, touch.clientY);
});

document.addEventListener("touchmove", (e) => {
  e.preventDefault(); // Prevent scrolling
  if (isDragging) {
    const touch = e.touches[0];
    moveCard(touch.clientX, touch.clientY);
  }
});

document.addEventListener("touchend", stopDragging);

// Handle card interactions
document.addEventListener("click", (e) => {
  if (e.target.closest("#close_btn_resume")) {
    const card = document.getElementById("resume_card");
    card.innerHTML = "";
    card.style.display = "none";
  }
});

document.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest("#close_btn_resume")) {
      e.stopPropagation(); // Prevent triggering drag when closing
      const card = document.getElementById("resume_card");
      card.innerHTML = "";
      card.style.display = "none";
    }
  },
  { passive: false }
);

// Maximize/Restore functionality
let isMaximizedResume = false;
let prevStyle = {};

// Mouse click for maximize
document.addEventListener("click", (e) => {
  if (e.target.closest("#maximize_btn_resume")) {
    toggleMaximize();
  }
});

// Touch for maximize
document.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest("#maximize_btn_resume")) {
      e.stopPropagation(); // Prevent triggering drag
      toggleMaximize();
    }
  },
  { passive: false }
);

function toggleMaximize() {
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
    card.style.borderRadius = "0";

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

// Minimize functionality
document.addEventListener("click", (e) => {
  if (e.target.closest("#minimize_btn_resume")) {
    card.style.display = "none";
  }
});

document.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest("#minimize_btn_resume")) {
      e.stopPropagation(); // Prevent triggering drag
      card.style.display = "none";
    }
  },
  { passive: false }
);

// Prevent context menu on touch devices for better UX
card.addEventListener("contextmenu", (e) => {
  if (isTouchDevice) {
    e.preventDefault();
  }
});
