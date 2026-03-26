export async function loadFolder({
  container,
  url,
  taskIcon = null,
  toggle = false,
}) {
  if (toggle) {
    const isVisible = container.style.display === "block";
    container.style.display = isVisible ? "none" : "block";
    if (!taskIcon.exist) {
      taskIcon.element.parentElement.style.display = "flex";
      taskIcon.exist = true;
    }
    if (taskIcon.exist)
      taskIcon.element.parentElement.style.background = isVisible
        ? "transparent"
        : "#ffffff33";
    if (isVisible) return;
  } else {
    container.style.display = "block";
  }

  // Load only once
  if (container.innerHTML) {
    updateTaskIcon(taskIcon.element);
    return;
  }

  const response = await fetch(url);
  const html = await response.text();
  container.innerHTML = html;

  executeScripts(container);
  updateTaskIcon(taskIcon.element);
}

function executeScripts(container) {
  container.querySelectorAll("script").forEach((oldScript) => {
    const script = document.createElement("script");
    if (oldScript.src) {
      script.src = oldScript.src;
    } else {
      script.textContent = oldScript.textContent;
    }
    document.body.appendChild(script);
  });
}

function updateTaskIcon(icon) {
  if (!icon) return;
  icon.parentElement.style.background = "#ffffff33";
  icon.parentElement.classList.remove("short-border");
}
