const cols = 8;
const rows = 8;
const offset = 40;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);

  let w = (width - offset * 2) / cols;
  let h = (height - offset * 2) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);
      push();
      translate(x, y);
      point(0, 0);
      let n = floor(random(3, 99));
      drawPattern(x, y, w, h, n);
      pop();
    }
  }
  noLoop();
}

function drawPattern(_x, _y, _w, _h, _n) {
  for (let j = 0; j <= _h; j++) {
    for (let i = 0; i <= _w; i++) {
      let m = j * _w + i;
      if (m % _n == 0) {
        strokeWeight(1.5);
        point(i, j);
      }
    }
  }
}
