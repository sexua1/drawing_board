'use strict';
const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d'); // getContext는 canvas안의 픽셀을 컨트롤 할 수 있게 해준다
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');
const DEFAULT_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;
let painting = false;
let filling = false;

// default
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

// drawing
function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting && !filling) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}
function canvasClickHandler() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function contextCLickHandler(event) {
  event.preventDefault();
}
if (canvas) {
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('click', canvasClickHandler);
  canvas.addEventListener('contextmenu', contextCLickHandler);
}

// color changer
function colorClickHandler(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
Array.from(colors) //
  .forEach((color) => color.addEventListener('click', colorClickHandler)); //Array.from(object)는 object를 배열로 만들어준다

// line width changer
function rangeChangeHandler(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
if (range) {
  range.addEventListener('input', rangeChangeHandler);
}

// mode changer
function modeClickHandle() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}
if (mode) {
  mode.addEventListener('click', modeClickHandle);
}

// save
function saveClickHandler() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS';
  link.click();
}
if (saveBtn) {
  saveBtn.addEventListener('click', saveClickHandler);
}
