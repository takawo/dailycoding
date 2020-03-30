let pallete = ["#F4D8B8", "#040404", "#0077A7", "#E8371C", "#3C4D4E"];
let bg;
let prevC = -1;
let alphabetStr = "abcdefghijklmnopqrtsuvwxyz";
let font;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let alphabets;
let movers;
let graphics;

function preload() {
  font = loadFont("Lato-BlackItalic.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  init();
}

function init() {
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  movers = [];
  alphabets = [];
  cells = int(random(3, 8));
  cols = cells;
  rows = cells;

  offset = width / 10;
  margin = offset / 5;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (width - offset * 2 - margin * (cols - 1)) / cols;

  let bgNum = int(random(pallete.length));
  let bg = pallete[bgNum];
  pallete.splice(bgNum, 1);

  background(bg);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      let cx = x + cellW / 2;
      let cy = y + cellH / 2;
      let strNum = int(random(alphabetStr.length));
      let str = alphabetStr.substr(strNum, 1);

      let bounds = font.textBounds(str, 0, 0, cellW);

      let points = font.textToPoints(str, cx - bounds.w / 2, cy + bounds.h / 3, cellW, {
        sampleFactor: map(cells, 3, 8, 2, 0.3),
        simplifyThreshold: 0
      });

      let nx = random(25, 50);
      let ny = random(25, 50);
      let c = prevC;
      while (prevC == c) {
        c = random(pallete);
      }
      prevC = c;
      for (let p of points) {
        movers.push(new Mover(p.x, p.y, nx, ny, c));
      }
    }
  }
  image(graphics, 0, 0);
}

function draw() {
  for (let m of movers) {
    m.update();
    m.display();
  }
  if (frameCount > 500) {
    noLoop();
  }
}

class Mover {
  constructor(_x, _y, _nx = 50, _ny = 50, _color) {
    this.pos = createVector(_x, _y);
    let nx = 1 / _nx;
    let ny = 1 / _ny;
    let nz = 1 / 50;
    this.color = _color;
    this.noiseScale = createVector(nx, ny);
    this.life = 300;
    this.lifeRatio = this.life / 500;
  }
  update() {
    let n = noise(this.pos.x * this.noiseScale.x,
      this.pos.y * this.noiseScale.y);
    let angle = map(n, 0, 1, -180, 180);
    angle = (angle + frameCount / 10) % 360;
    let vel = createVector(cos(angle), sin(angle));
    this.pos.add(vel);
    this.life -= this.lifeRatio;
  }
  display() {
    stroke(this.color + hex(this.life / 2, 2));
    point(this.pos.x, this.pos.y);
  }
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 8);
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