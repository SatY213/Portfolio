function updateClock() {
  const now = new Date();

  // Time
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Date
  const date = now.toLocaleDateString();

  document.getElementById("live-time").textContent = time;
  document.getElementById("live-date").textContent = date;
}

// Update every second
setInterval(updateClock, 1000);
updateClock();
