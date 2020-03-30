const cell_num =10;
const cols = cell_num;
const rows = cell_num;
const offset = 40;
const margin = offset / 3;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  background(255);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let w = (width - offset * 2 - margin * (cols - 1)) / cols;
      let h = (height - offset * 2- margin * (rows - 1)) / rows;
      let x = map(i, 0, cols, offset, width - offset) + w / 2;
      let y = map(j, 0, cols, offset, width - offset) + h / 2;
      stroke(0, 0, 0);
      noFill();
      rectMode(CENTER);
      rect(x, y, w, h);
      let points = [];
      points = createPoints(w, h);
      drawPoints(x, y, w, h, points);
    }
  }
}

function drawPoints(_x, _y, _w, _h, points) {
  push();
  translate(_x, _y);
  rotate(int(random(4)) * 90);
  let noiseScale = 10;
  let n = noise(_x / noiseScale, _y / noiseScale);
  let step = 1 / sq(map(n, 0, 1, 0.1, 3.5));
  for (let i = 0; i < points.length / 2; i += step) {
    let n = i;
    let m = points.length - i;
    let n_int = floor(n) % points.length;
    let n_float = n % 1;
    let n_next = (n_int + 1) % points.length;
    let m_int = (points.length - n_int) % points.length;
    let m_next = (points.length - n_next) % points.length;
    let m_float = n_float;

    let pA = points[n_int];
    let pB = points[n_next];
    let p1 = p5.Vector.lerp(pA, pB, n_float);

    let pC = points[m_int % points.length];
    let pD = points[m_next];
    let p2 = p5.Vector.lerp(pC, pD, m_float);


    line(p1.x, p1.y, p2.x, p2.y);
  }
  pop();
}

function isInsidePoint(x, y, points) {
  let bool = true;
  for (let p of points) {

  }
  return bool;
}


function createPoints(_w, _h) {
  let arr = [];
  let p1 = createVector(-_w / 2, -_h / 2);
  arr.push(p1);
  let p2 = createVector(_w / 2, -_h / 2);
  arr.push(p2);
  let p3 = createVector(_w / 2, _h / 2);
  arr.push(p3);
  let p4 = createVector(-_w / 2, _h / 2);
  arr.push(p4);
  return arr;
}