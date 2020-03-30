let graphics, bc;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let center, angle;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function draw() {
  frameRate(1);
  dotInit();
  image(graphics, 0, 0);
}


function init() {
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
}

function dotInit() {

  background(0, 0, 100);
  cells = constrain(int(random(2, 10)) * int(random(2, 10)),3,100);
  cols = cells;
  rows = cells;

  offset = -width / 8;
  margin = offset * -1 / int(random(5, 15));

  let w = sqrt(sq(width) + sq(height));

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w - offset * 2 - margin * (rows - 1)) / rows;

  center = createVector(width / 2, height / 2);
  angle = 0;

  push();
  translate(center.x, center.y);
  rotate(angle);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -w / 2 + offset, w / 2 - offset - cellW);
      //rect(x,y,cellW,cellH);
      drawDot(x, y, cellW, cellH);
    }
  }
  pop();
}

function drawDot(x, y, w, h) {
  let cell = int(random(5, 10));
  let colStart;
  let col
  if (cell % 2 == 0) {
    col = cell / 2;
    colStart = 0;
  } else {
    col = ceil(cell / 2);
    colStart = 0.5;
  }
  row = cell;

  cW = w / cell;
  cH = h / cell;

  let num = 2;

  push();
  translate(x, y);
  if (cell % 2 == 0) {
    for (let j = 0; j < row; j++) {
      for (let i = colStart; i < col; i++) {
        let x = map(i, 0, col - 1, w / 2, 0 + cW);
        let x2 = map(i, 0, col - 1, w / 2, w - cW);
        let y = map(j, 0, row - 1, 0, h - cH);

        let b = int(random(num)) * 100 / (num - 1);
        fill(0, 0, 10, b);
        noStroke();
        rect(x, y, -cW, cH);
        rect(x2, y, cW, cH);
      }
    }
  } else {
    for (let j = 0; j < row; j++) {
      for (let i = colStart; i < col; i++) {
        let x = map(i, 0.5, col - 1, w / 2 + cW / 2, cW * 3 / 2);
        let x2 = map(i, 0.5, col - 1, w / 2 - cW / 2, w - cW * 3 / 2);
        let y = map(j, 0, row - 1, 0, h - cH);
        let b = int(random(num)) * 100 / (num - 1);
        fill(0, 0, 10, b);
        noStroke();
        rect(x, y, -cW, cH);
        if (i != 0.5) {
          rect(x2, y, cW, cH);
        }
      }
    }
  }
  pop();
}


function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 0, 3);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}