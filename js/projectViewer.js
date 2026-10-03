let currentRequest = 0;
let selectedFolder;

export async function openProject(folder) {
  const slug = folder.dataset.project;
  if (!/^[a-z0-9-]+$/.test(slug)) return;
  selectedFolder = folder;
  const request = ++currentRequest;
  const name = folder.querySelector("p").textContent.trim();
  const overview = document.getElementById("project-overview");
  const viewer = document.getElementById("project-viewer");
  overview.hidden = true;
  viewer.hidden = false;
  viewer.scrollTop = 0;
  document.getElementById("project-name").textContent = name;
  const readme = document.getElementById("project-readme");
  const gallery = document.getElementById("project-screenshots");
  const download = document.getElementById("project-readme-link");
  const base = `./projects/${slug}/`;
  download.href = `${base}readme.txt`;
  readme.textContent = "Loading project description...";
  gallery.textContent = "Loading screenshots...";
  document.getElementById("project-back").focus({ preventScroll: true });

  const [description, screenshots] = await Promise.allSettled([
    fetch(`${base}readme.txt`).then((response) => {
      if (!response.ok) throw new Error("README unavailable");
      return response.text();
    }),
    fetch(`${base}screenshots.json`).then((response) => {
      if (!response.ok) throw new Error("Screenshots unavailable");
      return response.json();
    }),
  ]);
  if (request !== currentRequest) return;
  readme.textContent =
    description.status === "fulfilled"
      ? description.value
      : "The project description is currently unavailable.";
  download.hidden = description.status !== "fulfilled";
  gallery.replaceChildren();
  if (screenshots.status !== "fulfilled" || !Array.isArray(screenshots.value)) {
    gallery.textContent = "Screenshots are currently unavailable.";
    return;
  }
  if (!screenshots.value.length) {
    gallery.textContent = "Screenshots coming soon.";
    return;
  }
  screenshots.value.forEach((item, index) => {
    if (!item || typeof item.file !== "string") return;
    // Images are local project assets, never executable or remote URLs.
    if (!/^[\w .-]+\.(png|jpe?g|webp|gif|avif)$/i.test(item.file)) return;
    const figure = document.createElement("figure");
    const link = document.createElement("a");
    link.href = `${base}${encodeURIComponent(item.file)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    const image = document.createElement("img");
    image.src = link.href;
    image.alt = item.caption || `${name} screenshot ${index + 1}`;
    image.loading = "lazy";
    const caption = document.createElement("figcaption");
    caption.textContent = image.alt;
    image.addEventListener("error", () => {
      link.replaceWith(document.createTextNode("Screenshot unavailable."));
    });
    link.append(image);
    figure.append(link, caption);
    gallery.append(figure);
  });
  if (!gallery.children.length)
    gallery.textContent = "Screenshots are currently unavailable.";
}

document.addEventListener("click", (event) => {
  if (!event.target.closest("#project-back")) return;
  currentRequest++;
  document.getElementById("project-overview").hidden = false;
  document.getElementById("project-viewer").hidden = true;
  selectedFolder?.focus({ preventScroll: true });
});
