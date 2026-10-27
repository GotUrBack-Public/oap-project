'use strict';

const tasks = {
  pick: { name: 'Pick-and-place', description: 'Place the eraser on top of the box and release it.' },
  cup: { name: 'Cup Reorientation', description: 'Grasp the cup and tilt it while keeping it held.' },
  push: { name: 'Direct Push', description: 'Push the box through direct contact with the robot.' },
  toolpush: { name: 'Push with Tool', description: 'Use the held eraser to push the box.' }
};

const selector = document.getElementById('task-select');
const taskVideo = document.getElementById('task-video');
const overviewVideo = document.getElementById('overview-video');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches) taskVideo.play().catch(() => {});

selector.addEventListener('change', () => {
  const key = selector.value;
  const task = tasks[key];
  taskVideo.pause();
  taskVideo.poster = `./static/videos/${key}-poster.jpg`;
  taskVideo.setAttribute('aria-label', `${task.name} real-world demonstration`);
  taskVideo.querySelector('source').src = `./static/videos/${key}.mp4`;
  taskVideo.querySelector('a').href = `./static/videos/${key}.mp4`;
  document.getElementById('task-description').textContent = task.description;
  taskVideo.load();
  if (!reduceMotion.matches) taskVideo.play().catch(() => {});
});

// Keep the overview audio and task preview from playing simultaneously.
overviewVideo.addEventListener('play', () => taskVideo.pause());
taskVideo.addEventListener('play', () => overviewVideo.pause());

document.getElementById('copy-citation').addEventListener('click', async () => {
  const citation = document.getElementById('citation-text');
  const status = document.getElementById('copy-status');
  const button = document.getElementById('copy-citation');
  try {
    await navigator.clipboard.writeText(citation.textContent.trim());
    button.textContent = 'Copied';
    status.textContent = 'Citation copied to clipboard.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection.removeAllRanges();
    selection.addRange(range);
    button.textContent = 'Text selected';
    status.textContent = 'Citation selected. Use your browser copy command.';
  }
  window.setTimeout(() => { button.textContent = 'Copy'; }, 2500);
});
