let cells;
let cols, rows;
let offset, margin;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  smooth();
  init();
}

function init() {
  cells = 6; //int(random(3, 10));
  cols = cells;
  rows = cells;
  offset = (width / cols) / int(random(2, 4));
  margin = offset / int(random(2, 4));
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
}


function draw() {
  background(0, 0, 100);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      noFill();
      stroke(0, 0, 0);
      strokeWeight(.5);
      drawCheckerPattern(x, y, w, h);
      strokeWeight(1.2);
      stroke(0, 0, 0);
      rect(x, y, w, h);
    }
  }
  noLoop();
}

function drawCheckerPattern(_x, _y, _w, _h) {
  let sepW = int(random(5, 10));
  let sepH = int(random(3, 15));
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(int(random(4)) * 90);
  translate(-_w / 2, -_h / 2);
  
  let stepH = int(random(1, 10)) / 10;
  let stepV = int(random(1, 10)) / 10;

  for (let y0 = -_h * 2; y0 < _h; y0 += _h / sepH) {
    let y = y0;
    let x = 0;
    let px = constrain(x, 0, w);
    let py = constrain(y, 0, h);
    while (x < _w) {
      let dx, dy;
      x += _w / sepW / 1;
      dx = constrain(x, 0, w);
      dy = constrain(y, 0, h);
      for (let i = 0; i < 1; i += stepH * 2) {
        let x1 = constrain(lerp(dx, px, i), 0, _w);
        let y1 = constrain(lerp(dy, py, i), 0, _h);
        let x2 = constrain(lerp(dx, px, i + stepH), 0, _w);
        let y2 = constrain(lerp(dy, py, i + stepH), 0, _h);
        line(x1, y1, x2, y2);
      }

      px = dx;
      py = dy;
      y += _h / sepH / 2;
      dx = constrain(x, 0, w);
      dy = constrain(y, 0, h);
      for (let i = 0; i < 1; i += stepV * 2) {
        let x1 = constrain(lerp(dx, px, i), 0, _w);
        let y1 = constrain(lerp(dy, py, i), 0, _h);
        let x2 = constrain(lerp(dx, px, i + stepH), 0, _w);
        let y2 = constrain(lerp(dy, py, i + stepH), 0, _h);
        line(x1, y1, x2, y2);
      }
      px = dx;
      py = dy;
    }
  }
  pop();
}