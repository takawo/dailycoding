const rMax = 200;

const cells = 3;
const rows = cells;
const cols = cells;
const offset = 100;
const margin = offset / 2;
const ratio = 12;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(ADD);
  strokeWeight(0.75);
  stroke(0, 0, 100);
}

function draw() {
  background(220, 90, 20);
  let w = (width - offset * 2 - margin * (cols - 1)) / cols;
  let h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let num = int(random(3, 7));
      drawWavyShapes(x, y, w, h, num);
    }
  }
  noLoop();
}

function drawWavyShapes(_x, _y, _w, _h, _num) {
	let sep = random(3,5) * 2;
  push();
  translate(_x + _w / 2, _y + _h / 2);
  for (let r = random(30); r < _w / 2; r += (_w / 2) / sep) {
    let points = [];
    for (let angle = 0; angle < 360; angle += 360 / _num) {
      let x = cos(30 + angle) * r;
      let y = sin(30 + angle) * r;
      points.push(createVector(x, y));
    }
    for (let i = 0; i < points.length; i++) {
      let p1 = points[i];
      let p2 = points[(i + 1) % points.length];
      push();
      translate(p1.x, p1.y);
      rotate(atan2(p2.y - p1.y, p2.x - p1.x) - 15);
      noFill();
      let d = p5.Vector.dist(p1, p2);
      let n = int(random(3, 10)) * 0.5;
      drawWavyLine(d, n, r);
      fill(0, 0, 100);
      // if (random(100) < 50) {
      //   let nn = random(100);
      //   switch (true) {
      //     case nn < 33:
      //       ellipse(0, 0, r / ratio);
      //       ellipse(d, sin(360 * n) * r / 20, r / ratio);
      //       break;
      //     case nn >= 33 && nn < 66:
      //       ellipse(0, 0, r / ratio);
      //       break;
      //     case nn >= 66 && nn < 100:
      //       ellipse(d, sin(360 * n) * r / 20, r / ratio);
      //       break;
      //   }
      // } else {
      //   let nn = random(100);
      //   switch (true) {
      //     case nn < 33:
      //       rotateRect(0, 0, r / ratio, r / ratio);
      //       rotateRect(d, sin(360 * n) * r / 20, r / ratio, r / ratio);
      //       break;
      //     case nn >= 33 && nn < 66:
      //       rotateRect(0, 0, r / ratio, r / ratio);
      //       break;
      //     case nn >= 66 && nn < 100:
      //       rotateRect(d, sin(360 * n) * r / 20, r / ratio, r / ratio);
      //       break;
      //   }
      // }
      pop();
    }
  }
  pop();
}

function rotateRect(_x, _y, _w, _h) {
  rectMode(CENTER);
  push();
  translate(_x, _y);
  rotate(30);
  rect(0, 0, _w, _h);
  pop();
}

function drawWavyLine(_d, _n, _r) {
  for (let j = 0; j < 30; j++) {
    let t = map(sq(j), 0, 900, 0, 5);
    let sw = map(j, 0, 30, _r / 1.5, 0);
    stroke(0, 0, 100, t);
    strokeWeight(sw);
    beginShape();
    for (let i = 0; i < _d; i += 3) {
      let x = i;
      let y = sin(i / _d * 360 * _n) * _r / 20;
      vertex(x, y);
    }
    endShape();
    noStroke();
  }
}