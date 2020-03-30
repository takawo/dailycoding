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
  cells = int(random(3, 10));
  cols = cells;
  rows = cells;
  offset = (width / cols) / int(random(2, 4));
  margin = offset / int(random(2, 4));
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
}

function draw() {
  background(220);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      rect(x, y, w, h);
    }
  }
  noLoop();
}