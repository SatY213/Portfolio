const pending = new WeakMap();

export async function loadFolder({ container, url }) {
  if (container.dataset.loaded) return;
  if (pending.has(container)) return pending.get(container);
  const loading = (async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to load window (${response.status})`);
    container.innerHTML = await response.text();
    // Isolate each fragment's variables so closing and reopening cannot redeclare globals.
    container.querySelectorAll('script').forEach((oldScript) => {
      const script = document.createElement('script');
      script.textContent = `(() => {\n${oldScript.textContent}\n})();`;
      oldScript.replaceWith(script);
    });
    container.dataset.loaded = 'true';
  })();
  pending.set(container, loading);
  try { await loading; } finally { pending.delete(container); }
}
