let pallete = ["#193257", "#FFE6CF", "#F58426", "#007F91", "#96F3FA"];
const cells = 5;
const cols = cells;
const rows = cells;

const offset = 40;
const margin = offset / 1.5;
let w, h;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(EXCLUSION);

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
}

function draw() {
  background(211, 73, 15);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      //rect(x, y, w, h);
      let n = int(random(cells / 3, cells * 1.5));
      drawRectShadow(x, y, w, h, );
      drawSymmetryBlock(x, y, w, h, n);
    }
  }
  drawNoise(10000);
  noLoop();
}

function drawSymmetryBlock(_x, _y, _w, _h, _n) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  let arr = [];
  if (random(100) < 10) {
    for (let j = 0; j < _n * 2; j++) {
      arr[j] = [];
      for (let i = _n; i < _n * 2; i++) {
        let m = int(random(pallete.length));
        arr[j][i] = m;
        arr[j][_n * 2 - i - 1] = m;
        let x1 = map(i, 0, _n * 2, -_w / 2, w / 2);
        let x2 = map(_n * 2 - i - 1, 0, _n * 2, -_w / 2, w / 2);
        let y = map(j, 0, _n * 2, -_h / 2, _h / 2);
        fill(pallete[m]);
        noStroke();
        rect(x1, y, _w / (_n * 2), _h / (_n * 2));
        rect(x2, y, _w / (_n * 2), _h / (_n * 2));
      }
    }
  } else {
    for (let j = 0; j < _n * 2; j++) {
      arr[j] = [];
      arr[_n * 2 - j] = [];
      for (let i = _n; i < _n * 2; i++) {
        let m = int(random(pallete.length));
        arr[j][i] = m;
        arr[_n * 2 - j][_n * 2 - i - 1] = m;
        let x1 = map(i, 0, _n * 2, -_w / 2, w / 2);
        let x2 = map(_n * 2 - i - 1, 0, _n * 2, -_w / 2, w / 2);
        let y = map(j, 0, _n * 2, -_h / 2, _h / 2);
        fill(pallete[m]);
        noStroke();
        rect(x1, y, _w / (_n * 2), _h / (_n * 2));
        rect(x2, y, _w / (_n * 2), _h / (_n * 2));
      }
    }

  }

  pop();
  noLoop();
}

function drawRectShadow(x, y, w, h, n = margin * 1.3) {
  rectMode(CENTER);
  push();
  translate(x + w / 2, y + h / 2);
  for (let i = n; i > 0; i--) {
    noFill();
    let t = map(i, n, 0, 0, 3.8);
    stroke(0, 0, 100, t * t);
    rect(0, 0, w + i, h + i, 5);
  }
  pop();
  rectMode(CORNER);
}


function drawNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    noStroke();
    fill(0, 0, 100, random(5, 10));
    ellipse(x, y, w, h);
  }
}