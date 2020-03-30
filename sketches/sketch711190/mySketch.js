let bg, graphics;
let rs;
let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let prevC = -1;
let currentC = prevC;
let c1, c2;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}


function init() {
  background(0, 0, 80);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);

  drawNoiseBackground(100000, graphics, 100);
  drawNoiseBackground(50000, bg, 0);

  image(bg, 0, 0);

  let stepNum = int(random(3,20));
  let hue1 = int(random(stepNum)) * 360 / stepNum;
  let hue2 = (hue1 + 180) % 360;

  c1 = color(220, 100, 100);
  c2 = color(0, 100, 100);

  cells = int(random(5, 10));
  cols = cells;
  rows = cells;
  cellMax = min(ceil(cells / 3), int(cells / 3));
  cellMin = 1;
  w = sqrt(sq(width) + sq(height));
  h = w;

  offset = 0;
  margin = w / 100;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

  randomSeed(rs);
  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 90);

  let jStep = 1;
  for (let j = 0; j < rows; j += jStep) {
    let iStep = 1;
    jStep = int(random(cellMin, cellMax + 1));
    if (j + jStep > rows) {
      jStep = rows - j;
    }
    let ch = cellH * jStep + margin * (jStep - 1);
    for (let i = 0; i < cols; i += iStep) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
      iStep = int(random(max(jStep - 1, 1), jStep + 1));
      if (i + iStep > cols) {
        iStep = cols - i;
      }
      let cw = cellW * iStep + margin * (iStep - 1);
      drawWaves(x, y, cw, ch);
    }
  }
  pop();
  image(graphics, 0, 0);
}

function drawWaves(cx, cy, cellW, cellH) {
  let freqMax = int(random(3, 6));
  let freqA = random(0, freqMax) * (random(100) > 50 ? -1 : 1);
  let freqB = freqMax - freqA;
  let offsetA = random(360);
  let offsetB = offsetA - int(random(4)) * 360;
  let stepX = int(random(1, 10)) / 2;
  let f1 = frameCount * freqB / 1.5;
  let f2 = frameCount * freqA / 1.5;
  let prevDistance = -1;
  let stepY = int(random(5, 10)) * 10;

  let rotateNum = int(random(4));
  push();
  translate(cx + cellW / 2, cy + cellH / 2);
  if (rotateNum % 2 == 1) {
    let temp = cellW;
    cellW = cellH;
    cellH = temp;
  }
  rotate(rotateNum * 90);
  rectMode(CENTER);
  noFill();
  strokeWeight(width / 200);
  stroke(random(100) < 50 ? c1 : c2);
  rect(0, 0, cellW, cellH);
  noFill();
  for (let x = -cellW / 2 + stepX / 2; x < cellW / 2 - stepX / 2; x += stepX) {
    let y1 = sin(offsetA + (x + f1) * freqA) * cellH / 2 / 2;
    let y2 = sin(offsetA + (x + f2) * freqB) * cellH / 2 / 2;

    let yMin = min(y1, y2);
    let yMax = max(y1, y2);

    let distance = int(dist(x, y1, x, y2));
    if (distance == 0 && prevDistance != 0) {
      swapColor();
      stepY = int(random(5, 10)) * 10;

    }
    prevDistance = distance;
    for (let y = yMin; y < yMax; y += stepY) {
      let ratio = (y - yMin) / (yMax - yMin);
      colorMode(RGB);
      stroke(lerpColor(c1, c2, ratio));
      strokeWeight(stepX);
      line(x, y, x, min(y + stepY, yMax));
    }
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

function drawNoiseBackground(_n, _graphics, _brightness) {
  let c = color(0, 0, _brightness, 7);
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


function swapColor() {
  let _temp = c1;
  c1 = c2;
  c2 = _temp;
}