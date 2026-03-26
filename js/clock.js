function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString();

  document.getElementById("live-time").textContent = time;
  document.getElementById("live-date").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();
