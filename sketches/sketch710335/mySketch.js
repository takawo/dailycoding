let graphics;
let bc;

let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let prevC = -1;

const num = 3;
const r = 400;
let allPoints = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(ADD);
  init();
  noLoop();
}

function init() {
	let colorNum = int(random(5,10));
  background(int(random(colorNum)) * 360/colorNum, 90, 10);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(3, 7));
  cols = cells;
  rows = cells;
  w = sqrt(sq(width) + sq(height));
  h = w;

  offset = 0;
  margin = w / 100;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 90);

  let jStep = 1;
  for (let j = 0; j < rows; j += jStep) {
    let iStep = 1;
    let ch = cellH * jStep;
    for (let i = 0; i < cols; i += iStep) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
      let cw = cellW * iStep;
      stroke(0, 0, 100);
      noFill();
      //rect(x, y, cw, ch);
      allPoints = [];
      recursiveShape(x, y, cw, ch);
    }
  }
  pop();
  image(graphics, 0, 0);
}

function recursiveShape(x, y, cw, ch) {
  push();
  translate(x + cw / 2, y + ch / 2);
  rotate(int(random(8)) * 360/8);
  let r = cw / 2;
  let num = int(random(3, 6+1));
  let points = [];
  for (let angle = 0; angle < 360; angle += 360 / num) {
    let x = cos(angle) * r;
    let y = sin(angle) * r;
    points.push(createVector(x, y));
    allPoints.push(createVector(x, y));
  }
  let depth = 1;
  drawRecursiveTriangle(points, depth);
  let tempArr = [];
  for (let p of allPoints) {
    for (let q of allPoints) {
      if (p.equals(q) != true) {
        let d = p5.Vector.dist(p, q);
        if (d > r / num) {
          let s = p5.Vector.lerp(p, q, 1 / 2);
          tempArr.push(s);
        }
      }
    }
  }
  for (let p of tempArr) {
    allPoints.push(p);
  }

  let t = 3 * (sq(3) / sq(num));
  for (let p of allPoints) {
    for (let q of allPoints) {
      if (p.equals(q) != true) {
        let d = p5.Vector.dist(p, q);
        let angle = atan2(p.y - q.y, p.x, -q.x);
        //print(angle);
        if (d < r && angle % 45 < 0.1) {
          stroke(0,0,100,t);
          strokeWeight(0.5);
          line(p.x, p.y, q.x, q.y);
        }
      }
    }
  }
  pop();
}

function drawRecursiveTriangle(_arr, _n) {
  if (_n < 0) {
    return;
  }

  let middle = [];
  for (let i = 0; i < _arr.length; i++) {
    let current = i;
    let next = (i + 1) % _arr.length;
    let p1 = _arr[current];
    let p2 = _arr[next];
    middle.push(p5.Vector.lerp(p1, p2, 1 / 2));
    allPoints.push(p5.Vector.lerp(p1, p2, 1 / 2));
  }
  drawRecursiveTriangle(middle, _n - 1);
}

function createStep(min, max) {
  return random(min, max) * random(min, max) + 1;
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 3);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

function getRandomColor(_pallete) {
  let _c = prevC;
  while (_c == prevC) {
    _c = pallete[int(random(pallete.length))];
  }
  prevC = _c;
  return _c;
}