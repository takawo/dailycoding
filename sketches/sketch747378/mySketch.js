let angleNum = 8;
let pallete = ["#0A1248", "#5A1A21", "#BF4D30", "#5B4956", "#CC9A67", "#A1261D", "#0F0A1A", "#0F0A1A"];
let cells, cols, rows;
let margin, offset;
let cellW, cellH;
let graphics;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let bgNum = int(random(pallete.length));
  background(pallete[bgNum]);
  pallete.splice(bgNum, 1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(2, 8));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 4;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellW);
      drawConcentricCircles(x + cellW / 2, y + cellH / 2, cellW, int(random(3, 8)));

    }
  }

  image(graphics, 0, 0);
}

function drawConcentricCircles(_cx, _cy, _r, _num) {
  let noiseScale = 15;
  for (let r = _r; r > 0; r -= _r / _num) {
    push();
    let nv = noise(_cx / noiseScale, _cy / noiseScale, r / noiseScale);
    let n = map(nv, 0, 1, -180, 180);
    let nx = cos(n) * _r / 10;
    let ny = sin(n) * _r / 10;
    translate(_cx + nx, _cy + ny);
    push();
    rotate(22.5);
    let angle = 0;
    let angleStep = int(random(random(random())) * 7 + 1) * 360 / angleNum;
    while (angle < 360) {

      fill(fc = random(pallete));
      stroke(sc = random(pallete));
      while (sc == fc) {
        stroke(sc = random(pallete));
      }
      arc(0, 0, r, r, angle, angle + angleStep, PIE);
      angleStep = int(random(random(random())) * 7 + 1) * 360 / angleNum;
      if (angle + angleStep > 360 || random() < 0.15) {
        angleStep = 360 - angle;
      }
      angle += angleStep;
    }
    pop();
    pop();
  }
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 3);
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