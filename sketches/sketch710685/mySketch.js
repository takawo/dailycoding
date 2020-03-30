let url = "https://coolors.co/app/001e56-202a82-fff6d8-f4ce7a-dd4a42";
let pallete;
let graphics;
let rs;
let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let prevC = -1;
let currentC = prevC;
let cellMax, cellMin;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
	rs = random(10000);
  init();
}

function init() {
  pallete = createPallete(url);
  let bn = int(random(pallete.length));
  bc = pallete[bn]
  pallete.splice(bn, 1);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(5, 50));
  cols = cells;
  rows = cells;
  cellMax = cells / 5;
  cellMin = int(cells / 25 + 1);
  w = sqrt(sq(width) + sq(height));
  h = w;

  offset = 0;
  margin = w / 100;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;
}

function draw() {
  background(bc);
  image(graphics, 0, 0);
  randomSeed(rs);
  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 90);

  let jStep = 1;
  for (let j = 0; j < rows; j += jStep) {
    let iStep = 1;
    jStep = int(random(cellMin, cellMax));
    if (j + jStep > rows) {
      jStep = rows - j;
    }
    let ch = cellH * jStep + margin * (jStep - 1);
    for (let i = 0; i < cols; i += iStep) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
      iStep = int(random(cellMin, cellMax));
      if (i + iStep > cols) {
        iStep = cols - i;
      }
      let cw = cellW * iStep + margin * (iStep - 1);
      drawWaves(x, y, cw, ch);
    }
  }
  pop();
}

function drawWaves(cx, cy, cellW, cellH) {
  let freqMax = int(random(3, 6));
  let freqA = random(0, freqMax) * (random(100) > 50 ? -1 : 1);
  let freqB = freqMax - freqA;
  let offsetA = random(360);
  let offsetB = offsetA - int(random(4)) * 360;
  let step = int(random(1, 10)) / 2;
  let f1 = frameCount * freqB / 1.5;
  let f2 = frameCount * freqA / 1.5;

  let rotateNum = int(random(4));
  push();
  translate(cx + cellW / 2, cy + cellH / 2);
  if (rotateNum % 2 == 1) {
    let temp = cellW;
    cellW = cellH;
    cellH = temp;
  }
  rotate(rotateNum * 90);
  stroke(getRandomColor(pallete));
  strokeWeight(width / 500);
  noFill();
  rectMode(CENTER);
  rect(0, 0, cellW, cellH);
  for (let x = -cellW / 2+step/2; x < cellW / 2-step/2; x += step) {
    let y1 = sin(offsetA + (x + f1) * freqA) * cellH / 2 / 2;
    let y2 = sin(offsetA + (x + f2) * freqB) * cellH / 2 / 2;
    strokeWeight(step);
    line(x, y1, x, y2);

  }
  pop();
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

function drawNoiseBackground(_n, _graphics) {
  let c;
  if (brightness(bc) > 80) {
    c = color(0, 0, 0, 7);
  } else {
    c = color(0, 0, 100, 7);
  }
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