'use strict';

const researchMenu = document.querySelector('.more-research');
document.addEventListener('click', (event) => {
  if (researchMenu.open && !researchMenu.contains(event.target)) researchMenu.open = false;
});
document.addEventListener('keydown', (event) => {
  if (researchMenu.open && event.key === 'Escape') {
    researchMenu.open = false;
    researchMenu.querySelector('summary').focus();
  }
});

const tasks = {
  pick: {
    name: 'Pick-and-place',
    instruction: 'Place the eraser on top of the box and release it.',
    frame: 'The eraser rests on the box in both the camera view and the reconstructed scene.'
  },
  cup: {
    name: 'Cup Reorientation',
    instruction: 'Grasp the cup and tilt it while holding it.',
    frame: 'The gripper holds a tilted cup in the camera view and the reconstructed scene.'
  },
  push: {
    name: 'Direct Push',
    instruction: 'Push the box directly with the robot.',
    frame: 'The camera view and the reconstructed scene show the box after the push.'
  },
  toolpush: {
    name: 'Push with Tool',
    instruction: 'Use the eraser as a tool to push the box.',
    frame: 'In both views, the robot holds the eraser against the box.'
  }
};

const picker = document.querySelector('.task-picker');
const taskVideo = document.getElementById('task-video');
const clipToggle = document.getElementById('clip-toggle');
const overviewVideo = document.getElementById('overview-video');
const comparison = document.getElementById('twin-frame');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function playPreview() {
  if (!reduceMotion.matches) taskVideo.play().catch(() => {});
}

function updatePlaybackControl() {
  clipToggle.classList.toggle('is-paused', taskVideo.paused);
  clipToggle.setAttribute('aria-label', taskVideo.paused ? 'Play the clip' : 'Pause the clip');
}

function togglePlayback() {
  if (taskVideo.paused) taskVideo.play().catch(updatePlaybackControl);
  else taskVideo.pause();
}

clipToggle.addEventListener('click', togglePlayback);
taskVideo.addEventListener('click', togglePlayback);
taskVideo.addEventListener('play', updatePlaybackControl);
taskVideo.addEventListener('pause', updatePlaybackControl);
taskVideo.addEventListener('emptied', updatePlaybackControl);
reduceMotion.addEventListener('change', () => {
  if (reduceMotion.matches) taskVideo.pause();
});
taskVideo.controls = false;
clipToggle.hidden = false;

function selectTask(key) {
  const task = tasks[key];
  const clip = './static/videos/' + key + '.mp4';
  taskVideo.pause();
  taskVideo.poster = './static/videos/' + key + '-poster.jpg';
  taskVideo.setAttribute('aria-label', task.name + ' demonstration');
  taskVideo.querySelector('source').src = clip;
  taskVideo.querySelector('a').href = clip;
  document.getElementById('task-description').textContent = task.instruction;
  comparison.src = './static/frames/' + key + '-late.webp';
  comparison.alt = task.frame;
  taskVideo.load();
  playPreview();
}

picker.hidden = false;
picker.addEventListener('change', (event) => selectTask(event.target.value));
const initialTask = picker.querySelector('input:checked').value;
if (initialTask === 'pick') playPreview();
else selectTask(initialTask);
overviewVideo.addEventListener('play', () => taskVideo.pause());
taskVideo.addEventListener('play', () => overviewVideo.pause());

const copyButton = document.getElementById('copy-citation');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  const citation = document.getElementById('citation-text');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(citation.textContent.trim());
    copyButton.textContent = 'Copied';
    status.textContent = 'Citation copied to clipboard.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(citation);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyButton.textContent = 'Text selected';
    status.textContent = 'Citation selected. Use your browser copy command.';
  }
  window.setTimeout(() => { copyButton.textContent = 'Copy'; }, 2500);
});
