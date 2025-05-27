const canvas = document.getElementById('shapeCanvas');
const ctx = canvas.getContext('2d');
const feedback = document.getElementById('feedback');

let currentLevel = 0;
let isDrawing = false;
let userPath = [];

const levels = ['star', 'rectangle', 'diamond', 'triangle', 'square'];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);

function startDrawing(e) {
  isDrawing = true;
  userPath = [];
  const pos = getMousePos(e);
  userPath.push(pos);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!isDrawing) return;
  const pos = getMousePos(e);
  userPath.push(pos);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function endDrawing() {
  isDrawing = false;
  if (checkTracing()) {
    feedback.textContent = '🎉 Correct!';
    currentLevel++;
    if (currentLevel < levels.length) {
      setTimeout(() => {
        feedback.textContent = '';
        drawShape();
      }, 1000);
    } else {
      feedback.textContent = '🏆 All Levels Complete!';
    }
  } else {
    feedback.textContent = '❌ Try Again!';
    setTimeout(() => {
      feedback.textContent = '';
      drawShape();
    }, 1500);
  }
}

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function drawShape() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000';

  const shape = levels[currentLevel];
  switch (shape) {
    case 'star': drawStar(200, 200, 5, 80, 40); break;
    case 'rectangle': drawRectangle(130, 150, 140, 80); break;
    case 'diamond': drawDiamond(200, 200, 60); break;
    case 'triangle': drawTriangle(200, 150, 120); break;
    case 'square': drawSquare(150, 150, 100); break;
  }

  ctx.stroke();
}

// === Shape Drawing Functions ===

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
    rot += Math.PI / spikes;
    ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
    rot += Math.PI / spikes;
  }
  ctx.closePath();
}

function drawRectangle(x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
}

function drawDiamond(cx, cy, size) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.lineTo(cx - size, cy);
  ctx.lineTo(cx, cy + size);
  ctx.lineTo(cx + size, cy);
  ctx.closePath();
}

function drawTriangle(cx, cy, size) {
  const height = size * Math.sqrt(3) / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - height / 2);
  ctx.lineTo(cx - size / 2, cy + height / 2);
  ctx.lineTo(cx + size / 2, cy + height / 2);
  ctx.closePath();
}

function drawSquare(x, y, size) {
  ctx.beginPath();
  ctx.rect(x, y, size, size);
}

// Tracing accuracy checker (simplified for now)
function checkTracing() {
  return userPath.length > 100;
}

// Start game
drawShape();
