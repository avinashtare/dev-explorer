let canvas = document.getElementById("canvas");

let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

let ctx = canvas.getContext("2d");
let gap = 40;
let wheelZome = 10;
function drawLines() {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ddd";
  for (let i = 0; i < w / gap; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gap, 0);
    ctx.lineTo(i * gap, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * gap);
    ctx.lineTo(w, i * gap);
    ctx.stroke();
  }
}
input.addEventListener("mousemove", () => {
  gap = input.value;
  ctx.clearRect(0, 0, w, h);
  drawLines();
});

window.addEventListener("wheel", (e) => {
  if (e.wheelDeltaY > 0) {
    gap + wheelZome >= 100 ? null : (gap += wheelZome);
  } else {
    gap - wheelZome <= 10 ? null : (gap -= wheelZome);
  }
  ctx.clearRect(0, 0, w, h);
  drawLines();
  input.value = gap;
});

window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  drawLines();
});
canvas.addEventListener("mousemove", (e) => {
  ctx.clearRect(0, 0, w, h);
  drawLines();
  let { x, y } = { x: Math.floor(e.x / gap), y: Math.floor(e.y / gap) };
  ctx.beginPath();
  ctx.rect(x * gap, y * gap, gap, gap);
  ctx.fill();
});