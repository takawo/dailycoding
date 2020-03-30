const cols = 9;
const rows = 9;

const offset = 40;

function setup() {
  createCanvas(800, 800);
	colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
}

function draw() {
  background(0,0,100);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);
      let w = (width - offset * 2) / cols;
      let h = (width - offset * 2) / cols;
      drawDiagonalPattern(x, y, w, h);
    }
  }
  noLoop();
}

function drawDiagonalPattern(_x, _y, _w, _h) {
  push();
  noFill();
  let step = floor(random(1, 4)) * floor(random(1, 10));
  translate(_x, _y);

  push();
  translate(_w / 2, 0);
  for (let w = 0; w <= _w / 2; w += _w / 2 / step) {
    triangle(
      w, 0,
      -w, 0,
      0, w
    );
  }
  pop();
  step = floor(random(1, 4)) * floor(random(1, 10));
  push();
  translate(_w / 2, _h);
  rotate(180);
  for (let w = 0; w <= _w / 2; w += _w / 2 / step) {
    triangle(
      w, 0,
      -w, 0,
      0, w
    );
  }
  pop();

  step = floor(random(1, 4)) * floor(random(1, 10));
  push();
  translate(0, _h / 2);
  rotate(-90);
  for (let w = 0; w <= _w / 2; w += _w / 2 / step) {
    triangle(
      w, 0,
      -w, 0,
      0, w
    );
  }
  pop();
  step = floor(random(1, 4)) * floor(random(1, 10));
  push();
  translate(_w, _h / 2);
  rotate(90);
  for (let w = 0; w <= _w / 2; w += _w / 2 / step) {
    triangle(
      w, 0,
      -w, 0,
      0, w
    );
  }
  pop();
  pop();
}