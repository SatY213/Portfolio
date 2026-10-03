function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });

  document.getElementById("live-time").textContent = time;
  document.getElementById("live-date").textContent = date;
  document.getElementById('taskbar-clock').title = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

setInterval(updateClock, 1000);
updateClock();
