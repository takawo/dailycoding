let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let graphics;
let pallete = ["#C9442B", "#857F52", "#164F5C", "#FA140B", "#58A395", "#BFDCD3", "#030C5E", "#99C8B3"];
let bg;
let prevC = -1;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  strokeCap(SQUARE);
  init();
}

function init() {
  cells = int(random(2, 5));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 5;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;
  let bgN = int(random(pallete.length));
  bg = pallete[bgN];
  pallete.splice(bgN, 1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
}

function draw() {
  background(bg);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      let rMax = cellW / 2 * 0.85;
      let sep = int(random(5, 10));
      drawConcentricVertexes(x + cellW / 2, y + cellH / 2, rMax, sep, pallete.concat());
    }
  }
  image(graphics, 0, 0);
  noLoop();
}

function drawConcentricVertexes(cx, cy, rMax, sep, colors) {
  push();
  translate(cx, cy);
  let i = 0;
  let rStep = int(random(0, 5));
  for (let r = rMax; r > 0; r -= rMax / sep) {
    let n = map(noise(cx / 80, cy / 100, r / 200), 0, 1, 1, 8)
    push();
    rotate(i * rStep);
    let angle = 0;
    while (angle < 360) {
      let angleStep = n * 360 / 8 / 2;

      if (angle + angleStep > 360) {
        angleStep = 360 - angle;
      }
      let fc = prevC;
      if (fc == prevC) {
        fc = random(colors);
      }
      prevC = fc;
      fill(fc);
      noStroke();
      beginShape();
      vertex(0, 0);
      vertex(cos(angle) * r, sin(angle) * r);
      vertex(cos(angle + angleStep) * r, sin(angle + angleStep) * r);
      endShape(CLOSE);
      angle += angleStep;
    }
    pop();
    i++;
  }
  pop();
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 10);
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