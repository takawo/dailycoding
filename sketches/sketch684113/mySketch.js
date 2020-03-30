function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawRecursiveRect(0, 0, width, height, 0);
  noLoop();
}


function drawRecursiveRect(_x, _y, _w, _h, _d) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  let angle = floor(random(0, 4)) * 90;
  rotate(angle);
  rect(-_w / 2, -_h / 2, _w * 0.666, _h * 0.666);
  rect(_w / 2, _h / 2, -_w * 0.333, -_h * 0.333);
  while (_d < 2) {
    drawRecursiveRect(-_w / 2, -_h / 2, _w * 0.666, _h * 0.666, _d + 1);
    drawRecursiveRect(_w / 2, _h / 2, -_w * 0.333, -_h * 0.333, _d + 1);
  }
  pop();
}