let pallete = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];
const cols = 8;
const rows = 8;
const offset = 40;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 95);
  
  for (let i = 0; i < 1000; i++) {
    stroke(0, 0, 0, random(1, 10));
    point(random(width), random(height));
  }
  
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);
      let w = (width - offset * 2) / cols * 0.8;
      let h = (width - offset * 2) / cols * 0.8;
      drawPattern(x, y, w, h);
    }
  }

  blendMode(ADD);
  for (let i = 0; i < 100000; i++) {
    stroke(0, 0, 95, random(1, 8));
    point(random(width), random(height));
  }

  noLoop();
}

function drawPattern(_x, _y, _w, _h) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(45);
  for (let angle = 0; angle < 360; angle += 90) {
    push();
    rotate(angle);
    if (random(100) < 50) {
      let step = floor(random(1, 5)) * floor(random(1, 3));
      let i = step;
      for (let d = _w; d > 0; d -= _w / step) {
        noStroke();
        if (random(100) < 50) {
          i++;
        }
        fill(pallete[i % pallete.length]);
        arc(0, 0, d, d, 0, 90, PIE);
      }
    } else {
      let step = floor(random(1, 5)) * floor(random(1, 3));
      let i = step;
      for (let d = _w / 2; d > 0; d -= _w / 2 / step) {
        fill(pallete[i % pallete.length]);
        noStroke();
        if (random(100) < 50) {
          i++;
        }
        triangle(0, 0, d, 0, 0, d);
      }
    }
    pop();
  }
  pop();
}