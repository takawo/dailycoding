const rMax = 200;

const cells = 3;
const rows = cells;
const cols = cells;
const offset = 100;
const margin = offset / 8;
const ratio = 12;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  strokeWeight(0.75);
  stroke(0, 0, 100);
}

function draw() {
  blendMode(NORMAL);
  background(int(random(12)) * 360 / 12, 90, 10);
  drawNoise(80000);
  blendMode(ADD);
  let w = (width - offset * 2 - margin * (cols - 1)) / cols;
  let h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let num = int(random(2,8));
      drawWavyShapes(x, y, w, h, num);
    }
  }
  noLoop();
}

function drawWavyShapes(_x, _y, _w, _h, _num) {
  let sep = int(random(2, 5) * 1.5);
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(int(random(8)) * 45);
  for (let r = random(0); r < _w / 2; r += (_w / 2) / sep) {
    let points = [];
    for (let angle = 0; angle < 360; angle += 360 / _num) {
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      points.push(createVector(x, y));
    }
    for (let i = 0; i < points.length; i++) {
      let p1 = points[i];
      let p2 = points[(i + 1) % points.length];
      push();
      translate(p1.x, p1.y);
      rotate((atan2(p2.y - p1.y, p2.x - p1.x) - int(random(-sep, sep)) * 3) % 360);
      let d = p5.Vector.dist(p1, p2);
      let n = int(random(3, 10)) * 0.5;
      drawShape(d, n, r);
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

function drawShape(_d, _n, _r) {
  let countMax = 100;
  for (let j = 0; j < countMax; j++) {
    let _t = map(sq(j), 0, sq(countMax), 0, 3);
    let _sw = map(j, 0, countMax, _r / 2, 0.01);
    wavyLine(_d, _n, _r, _t, _sw);
  }
}

function wavyLine(_d, _n, _r, _t, _sw) {
  stroke(0, 0, 100, _t);
  strokeWeight(_sw);
  noFill();

  beginShape();
  for (let i = 0; i < _d; i += 3) {
    let x = i;
    let y = sin(i / _d * 360 * _n) * _r / 20;
    vertex(x, y);
    if (random(100) < 1) {
      let angle = random(360);
      let r = random(_r / 10, _r / 4);
      let x2 = x + cos(angle) * r;
      let y2 = y + sin(angle) * r;
      // stroke(0, 0, 100, _t*2);
      // strokeWeight(_sw/5);
      // fill(0,0,100,_t);
      // ellipse(x2, y2, 3);
    }
    stroke(0, 0, 100, _t);
    strokeWeight(_sw);
    noFill();
  }
  endShape();
  stroke(0, 0, 100, _t * 1.6);
  fill(0, 0, 100, _t * 1.6);
  let nn = random(100);
  switch (true) {
    case nn < 33:
      ellipse(0, 0, _r / ratio);
      ellipse(_d, sin(360 * _n) * _r / 20, _r / ratio);
      break;
    case nn >= 33 && nn < 66:
      ellipse(0, 0, _r / ratio);
      break;
    case nn >= 66 && nn < 100:
      ellipse(_d, sin(360 * _n) * _r / 20, _r / ratio);
      break;
  }

}

function drawNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    noStroke();
    fill(0, 0, 100, random(5));
    ellipse(x, y, w, h);
  }
}