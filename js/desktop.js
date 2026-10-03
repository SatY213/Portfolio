import { loadFolder } from './loadWindow.js';
import { openProject } from './projectViewer.js';

const mobile = matchMedia('(max-width: 767px), (max-height: 500px) and (pointer: coarse)');
const touchLayout = matchMedia('(pointer: coarse)');
const apps = { project: 'project', about: 'aboutMe', contact: 'contact', resume: 'resume', form: 'form', browser: 'browser', music: 'music', menu: 'menu' };
const labels = { project: 'Projects', about: 'About Me', contact: 'Contact', resume: 'Resume', form: 'Contact Form', browser: 'Browser', music: 'Music', menu: 'Start menu' };
const cards = [...document.querySelectorAll('.app-card')];
const menu = document.getElementById('menu_bar');
let active = null;
let drag = null;
const returnFocus = new Map();

function button(element, label) {
  element.setAttribute('role', 'button');
  element.tabIndex = 0;
  element.setAttribute('aria-label', label);
}

function hide(name, closed = false) {
  const card = document.getElementById(name === 'menu' ? 'menu_bar' : `${name}_card`);
  card.style.display = 'none';
  if (closed && name === 'music') card.querySelector('audio')?.pause();
  document.body.classList.toggle('tool-open', cards.some(item => item.style.display === 'block'));
  const task = document.getElementById(`${name}_task_icon`).parentElement;
  task.style.background = 'transparent';
  task.classList.toggle('short-border', !closed && name !== 'menu');
  if (closed && ['about', 'resume', 'contact'].includes(name)) task.style.display = 'none';
  if (active === card) active = null;
  const trigger = returnFocus.get(name);
  if (trigger?.getClientRects().length) trigger.focus();
  else document.getElementById('menu_task_icon').parentElement.focus();
}

function focusWindow(card) {
  if (mobile.matches) {
    cards.forEach(other => {
      if (other !== card && other.style.display === 'block') hide(other.id.replace('_card', ''));
    });
  }
  cards.forEach(other => { other.style.zIndex = other === card ? (mobile.matches ? '3000' : '1000') : '1'; });
  active = card;
}

export async function openApp(name, toggle = false, trigger = document.activeElement) {
  const card = document.getElementById(name === 'menu' ? 'menu_bar' : `${name}_card`);
  if (!card) return;
  if (toggle && card.style.display === 'block' && (name === 'menu' || active === card)) { hide(name); return; }
  returnFocus.set(name, trigger);
  if (name !== 'menu') { menu.style.display = 'none'; focusWindow(card); }
  card.style.display = 'block';
  document.body.classList.toggle('tool-open', cards.some(item => item.style.display === 'block'));
  const task = document.getElementById(`${name}_task_icon`).parentElement;
  task.style.display = 'flex';
  task.style.background = '#ffffff33';
  task.classList.remove('short-border');
  try {
    await loadFolder({ container: card, url: `./folders/${apps[name]}.html` });
    card.querySelectorAll('.project-folder').forEach(el => button(el, `View ${el.textContent.trim()} details`));
    if (card.style.display !== 'block') return;
    card.querySelector('[id^="close_btn"], input, button')?.focus({ preventScroll: true });
  } catch (error) {
    card.replaceChildren();
    const panel = document.createElement('div');
    panel.className = 'load-error';
    panel.setAttribute('role', 'alert');
    panel.textContent = 'This window could not be loaded. ';
    const retry = document.createElement('button');
    retry.textContent = 'Retry';
    retry.onclick = () => openApp(name);
    const close = document.createElement('button');
    close.textContent = 'Close';
    close.onclick = () => hide(name, true);
    panel.append(retry, document.createTextNode(' · '), close);
    card.append(panel);
    close.focus();
    console.error(error);
  }
}

Object.keys(apps).forEach(name => {
  const desktop = document.getElementById(`${name}_icon`);
  if (desktop) {
    button(desktop, `Open ${labels[name]}`);
    desktop.addEventListener('click', event => {
      // Pointer type also handles touch on hybrid laptops; detail 0 is keyboard activation.
      if (event.detail === 0 || event.pointerType === 'touch' || event.pointerType === 'pen' || touchLayout.matches) {
        openApp(name, false, desktop);
      }
    });
    desktop.addEventListener('dblclick', event => {
      if (!touchLayout.matches && event.pointerType !== 'touch' && event.pointerType !== 'pen') openApp(name, false, desktop);
    });
  }
  const task = document.getElementById(`${name}_task_icon`).parentElement;
  button(task, labels[name]);
  task.addEventListener('click', () => openApp(name, true, task));
});

document.getElementById('show-desktop').addEventListener('click', event => {
  cards.filter(card => card.style.display === 'block').forEach(card => hide(card.id.replace('_card', '')));
  hide('menu');
  event.currentTarget.focus();
});

// The taskbar search opens the working app filter in the Start menu.
const search = document.querySelector('#tasks_container > :nth-child(2)');
search.removeAttribute('onclick');
button(search, 'Search apps');
search.addEventListener('click', async () => {
  await openApp('menu', false, search);
  menu.querySelector('input')?.focus();
});

document.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[role="button"]')) {
    event.preventDefault(); event.target.click();
  }
  if (event.key === 'Escape') {
    if (menu.style.display === 'block') hide('menu');
    else if (active) hide(active.id.replace('_card', ''));
  }
});

document.addEventListener('click', event => {
  const opener = event.target.closest('[data-open]');
  if (opener) openApp(opener.dataset.open, false, opener);
  const control = event.target.closest('[id*="_btn_"]');
  if (control) {
    const [action, , name] = control.id.split('_');
    const card = document.getElementById(`${name}_card`);
    if (!card) return;
    if (action === 'close' || action === 'minimize') hide(name, action === 'close');
    if (action === 'maximize' && !mobile.matches) {
      const maximized = card.classList.toggle('is-maximized');
      if (maximized) {
        card.dataset.left = card.style.left; card.dataset.top = card.style.top;
        card.style.left = ''; card.style.top = '';
      } else {
        card.style.left = card.dataset.left || ''; card.style.top = card.dataset.top || '';
        clamp(card);
      }
      control.setAttribute('aria-label', maximized ? 'Restore window' : 'Maximize window');
    }
  }
  const project = event.target.closest('[data-project]');
  if (project) {
    document.querySelectorAll('#project_card [id$="-details"]').forEach(el => el.classList.add('hidden'));
    document.getElementById(`${project.dataset.project}-details`)?.classList.remove('hidden');
    document.querySelectorAll('.project-folder').forEach(el => { el.classList.toggle('selected', el === project); el.setAttribute('aria-pressed', String(el === project)); });
    if (event.detail === 0 || event.pointerType === 'touch' || event.pointerType === 'pen' || touchLayout.matches) openProject(project);
  }
  if (!event.target.closest('#menu_bar, #tasks_container')) menu.style.display = 'none';
});

document.addEventListener('dblclick', event => {
  const project = event.target.closest('[data-project]');
  if (project && !touchLayout.matches) openProject(project);
});

function clamp(card) {
  if (mobile.matches || card.classList.contains('is-maximized') || card.style.display !== 'block') return;
  const bounds = document.getElementById('background');
  card.style.left = `${Math.max(0, Math.min(card.offsetLeft, bounds.clientWidth - card.offsetWidth))}px`;
  card.style.top = `${Math.max(0, Math.min(card.offsetTop, bounds.clientHeight - card.offsetHeight))}px`;
}

document.addEventListener('pointerdown', event => {
  const card = event.target.closest('.app-card');
  if (!card) return;
  focusWindow(card);
  const header = event.target.closest('.window-header');
  if (!header || mobile.matches || card.classList.contains('is-maximized') || event.button !== 0 || event.target.closest('[role="button"], button, a, input')) return;
  drag = { card, header, x: event.clientX - card.offsetLeft, y: event.clientY - card.offsetTop };
  header.setPointerCapture(event.pointerId);
  event.preventDefault();
});
document.addEventListener('pointermove', event => {
  if (!drag) return;
  drag.card.style.left = `${event.clientX - drag.x}px`;
  drag.card.style.top = `${event.clientY - drag.y}px`;
  clamp(drag.card);
});
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => document.addEventListener(type, () => { drag = null; }));
window.addEventListener('resize', () => {
  drag = null;
  if (active) focusWindow(active);
  cards.forEach(clamp);
});
