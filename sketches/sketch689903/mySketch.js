const num = 3;
const cells = 5;
const cols = cells;
const rows = cells;

const offset = 40;
const margin = offset / 2;
let w, h;
let r;
let sw;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  //blendMode(ADD);
  smooth();

  r = map(cells, 3, 10, width / 2, width / 20);
  sw = r / 4;
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
}

function draw() {
  background(0, 0, 90);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - w);
      let r = w / 5;
      drawSeparatedShapeOutline(x + w / 2, y + h / 2, r, num, i + j * cols)
    }
  }
  noLoop();
}

function drawSeparatedShapeOutline(_x, _y, _r, _num, _n) {
  let cx = _x;
  let cy = _y;
  let sep = 2; //int(random(2, 5));
  let shapePoints = [];
  let shapePointsOutSide = [];
  let points = [];
  let pointsOutSide = [];
  push();
  if (_n % 2 == 0) {
    translate(cx, cy + _r * 1 / 1.1);
  } else {
    translate(cx, cy - _r * 1 / 1.1);
    rotate(180);
  }
  for (let angle = 0; angle < 360; angle += 360 / _num) {
    let x = cos(30 + angle) * _r;
    let y = sin(30 + angle) * _r;
    shapePoints.push(createVector(x, y));

    let x2 = cos(30 + angle) * (_r + sw);
    let y2 = sin(30 + angle) * (_r + sw);
    shapePointsOutSide.push(createVector(x2, y2));
  }

  for (let i = 0; i < shapePoints.length; i++) {
    let current = i;
    let next = (i + 1) % shapePoints.length;
    for (let f = 0; f < 1; f += 1 / sep) {
      let pc = p5.Vector.lerp(shapePoints[current], shapePoints[next], f);
      let pcOutSide = p5.Vector.lerp(shapePointsOutSide[current], shapePointsOutSide[next], f);
      points.push(pc);
      pointsOutSide.push(pcOutSide);
    }
  }

  let sepArr = [];
  let sepNum = 0;
  let sepSum = 0;

  for (let i = 0; i < points.length; i++) {
    let _sep = random();
    sepArr.push(_sep);
    sepSum += _sep;
  }
  let sepSum2 = 0;
  let sepPrev = 0;
  for (let i = 0; i < sepArr.length; i++) {
    sepArr[i] = Math.round((sepPrev + (sepArr[i] / sepSum) * points.length) * 100) / 100;
    sepSum2 += sepArr[i];
    sepPrev = sepArr[i];
  }

  let h_base = random(360);
  let s_base = random(70, 100);

  let prev = 0;
  for (let i = 0; i < sepArr.length; i++) {
    let pA_int = int(prev);
    let pA_float = Math.round((prev % 1) * 100) / 100;
    let pB_int = (prev + 1) % points.length;
    let pC_int = int(sepArr[i]) % points.length;
    let pC_float = Math.round((sepArr[i] % 1) * 100) / 100;
    let pD_int = int(sepArr[i] + 1) % points.length;

    if (pA_int != pB_int && random(100) < 66) {
      let p0 = p5.Vector.lerp(points[pA_int], points[pB_int], pA_float);
      let p1 = p5.Vector.lerp(points[pC_int], points[pD_int], pC_float);
      let p0Outside = p5.Vector.lerp(pointsOutSide[pA_int], pointsOutSide[pB_int], pA_float);
      let p1Outside = p5.Vector.lerp(pointsOutSide[pC_int], pointsOutSide[pD_int], pC_float);
      let b = int(random(5, 10)) * 100 / 10;
      fill(h_base, s_base, b);
      noStroke();

      beginShape();
      vertex(p0.x, p0.y);
      let n = pA_int;
      while (n <= pC_int) {
        vertex(points[n].x, points[n].y);
        n++;
      }
      vertex(p1.x, p1.y);
      vertex(p1Outside.x, p1Outside.y);
      while (n > pA_int) {
        vertex(pointsOutSide[n % points.length].x, pointsOutSide[n % points.length].y);
        n--;
      }
      vertex(p0Outside.x, p0Outside.y);
      endShape(CLOSE);
    }
    prev = sepArr[i];
  }
  pop();
}