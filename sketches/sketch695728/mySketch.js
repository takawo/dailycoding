let offset, margin;
let cells, cols, rows;
let w, h;
let bg;
let pallete = ["#3D315B", "#444B6E", "#708B75", "#F8F991", "#9AB87A"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function init() {
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, bg);

  offset = width / 10 / int(random(1, 3));
  margin = offset / int(random(2, 5));

  cells = int(random(3, 10));
  cols = cells;
  rows = cells;

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;


  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let r = sqrt(random(1));
      let depth = map(r, 0, 1, 2, 5); //int(random(3, 15));
      let n = int(random(pallete.length));
      separateRect(x, y, w, h, depth, n);
    }
  }

}


function draw() {
  blendMode(NORMAL);
  background(0, 0, 90);
  init();
  //background(255);
  blendMode(ADD);
  image(bg, 0, 0);

  noLoop();
}

function mousePressed() {
  redraw();
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = sqrt(random(1)) * width;
    let y = sqrt(random(1)) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 5);
    _graphics.ellipse(x, y, w, h);
  }
}


function separateRect(_x, _y, _w, _h, _depth, _n) {
  let density = sqrt(sq(_w) + sq(_h));
  let maxDensity = sqrt(sq(width - offset * 2) + sq(height - offset * 2));
  strokeWeight(0.5);
  noStroke();
  fill(pallete[_n % pallete.length]);
  rect(_x, _y, _w, _h);
  if (_depth > 0) {
    let n = map(sqrt(random(1)), 0, 1, 0.4, 0.6);
    let x1, y1;
    if (random(100) < 50) {
      x1 = _x;
      y1 = lerp(_y, _y + _h, n);
    } else {
      x1 = lerp(_x, _x + _w, n);
      y1 = _y;
    }
    let w = _w - abs(_x - x1);
    let h = _h - abs(_y - y1);
    separateRect(x1, y1, w, h, _depth - 1, _n + 3);
    if (_w - w != 0) {
      separateRect(_x, _y, _w - w, h, _depth - 1, _n + 1)
    } else {
      separateRect(_x, _y, _w, _h - h, _depth - 1, _n + 2)
    }
  }
}