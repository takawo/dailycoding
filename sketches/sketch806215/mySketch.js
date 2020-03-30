let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#FDFDFD", "#02020C"];
let graphics;
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(50000, graphics, color(0, 0, 100, 10));
}

function draw() {
  init();
}


function init() {
  let p = pallete.concat();
  let bgNum = int(random(p.length));
  let bg = p[bgNum];
  p.splice(bgNum, 1);
  background(bg);

  randomSeed(frameCount / 100);

  cells = int(random(4, 12));
  cols = cells;
  rows = cells;

  offset = width / 5;
  margin = offset / 5;

  let w = sqrt(sq(width) + sq(height));
  cellW = (w + offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w + offset * 2 - margin * (rows - 1)) / rows;

  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360 / 8);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = -w / 2 - offset + i * (cellW + margin);
      let y = -w / 2 - offset + j * (cellH + margin);
      rectMode(CENTER);
      let angle = int(random(4)) * 360 / 4;
      let sep = int(random(1, cells)) * 4;
      staircaseRect(x + cellW / 2, y + cellH / 2, cellW, cellH, p.concat(), angle, sep);
      staircaseRect(x + cellW / 2, y + cellH / 2, cellW, cellH, p.concat(), angle + 180, sep);
    }
  }
  pop();
  image(graphics, 0, 0);
}

function staircaseRect(_cx, _cy, _w, _h, _p, a, sep) {
  push();
  translate(_cx, _cy);
  rotate(a);
  let w = _w / sep;
  let m = int(random(2));
  let prevC = -1;
  let ns = 200;
  let j = 0;
  for (let i = 0; i < sep; i++) {
    let n = noise(_cx / ns, _cy / ns, (frameCount + (i + j) * 10) / ns) * 2;
    let h = min(_h * ((i + 1) / sep) * n, _h);
    let x = w * i - _w / 2 + w / 2;
    let y = -h / 2 + _h / 2;
    let c = random(_p);
    while (prevC == c) {
      c = random(_p);
    }
    rectMode(CENTER);
    noStroke();
    if (i % 2 == 0) {
      j++;
      fill(c);
      rect(x, y, w, h);
    }

    prevC = c;
  }
  pop();
}

function drawNoiseBackground(_n, _graphics, _c) {
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(_c);
    _graphics.ellipse(x, y, w, h);
  }
}