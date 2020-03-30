//inspired by @414c45's  awesome artwork.
//https://twitter.com/414c45/status/1115548244359176192

const r = 300;
let num = 30;

let cells, cols, rows;
let offset, margin;
let w, h;
let bg;


let pallete = ["#3D5A80", "#98C1D9", "#E0FBFC", "#293241", "#EE6C4D"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function init() {
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, bg);


  cells = int(random(3, 8));
  cols = cells;
  rows = cells;

  offset = int(random(1, 4)) * width / 20;
  margin = offset / int(random(4, 8));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let r = w * 0.8;
      drowCircleWithCircle(x + w / 2, y + w / 2, r / 2, "INSIDE");
      drowCircleWithCircle(x + w / 2, y + w / 2, r / 2, "OUTSIDE");
    }
  }
}

function draw() {
  background(0, 0, 90);
  init();
  image(bg, 0, 0);

  noLoop();
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 0, 3);
    _graphics.ellipse(x, y, w, h);
  }
}

function drowCircleWithCircle(_x, _y, _r, _str) {

  let angleStep;
  for (let angle = 0; angle < 360; angle += angleStep) {
    angleStep = int(random(1, 5)) * 5;
    let d = int(random(1, 10)) / 20 * _r;
    let sAngle = angle;
    let eAngle = sAngle + angleStep;
    let isDraw = random(100) > 10;
    let cn = int(random(pallete.length));
    while (sAngle < eAngle && d > 0 && isDraw) {
      let d2 = map(sAngle, angle, eAngle, d, 0);
      let x, y;
      if (_str == "OUTSIDE") {
        x = _x + cos(sAngle) * (_r + d2 / 2);
        y = _y + sin(sAngle) * (_r + d2 / 2);
      } else if (_str == "INSIDE") {
        x = _x + cos(sAngle) * (_r - d2 / 2);
        y = _y + sin(sAngle) * (_r - d2 / 2);
      }
      stroke(0, 0, 100, 25);
			noStroke();
      fill(pallete[cn]);
      ellipse(x, y, d2);
      sAngle += 1;
      d += _r / 100;
    }
  }
}