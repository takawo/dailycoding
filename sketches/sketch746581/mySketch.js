let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete = ["#FEFEFE", "#0C041E", "#C21215", "#E65D08", "#AFADB9", "#4F2B3F", "#E99416", "#586DC0"];
let bg;
let graphics;
let rectangles = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(10000, graphics);

  cells = int(random(2, 8));
  cols = cells;
  rows = cells;
  offset = width / 20;
  margin = offset / 20;

  let w = sqrt(sq(width / 2) + sq(height / 2));
  cellW = (w * 2 - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w * 2 - offset * 2 - margin * (rows - 1)) / rows;

  let bgNum = int(random(pallete.length));
  bg = pallete[bgNum];
  background(bg + "66");
  pallete.splice(bgNum, 1);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -w - offset + cellW / 2, w + offset - cellW / 2);
      let y = map(j, 0, rows - 1, -w - offset + cellW / 2, w + offset - cellW / 2);
      let n = int(random(2, pallete.length));
      let p = pallete.concat();
      let cNum = int(random(pallete.length));
      let c = p[cNum];
      p.splice(cNum, 1);
      rectangles.push(new WavesRect(x, y, cellW, cellH, c, n, p))
    }
  }
}

function draw() {
  background(bg);
  push();
  translate(width / 2, height / 2);
  rotate(45);
  rectMode(CENTER);
  for (let r of rectangles) {
    r.update();
    r.display();
  }
  pop();
  image(graphics, 0, 0);
}


class WavesRect {
  constructor(_x, _y, _w, _h, _c, _n, _p) {
    this.center = createVector(_x, _y);
    this.w = _w;
    this.h = _h;
    this.bg = _c;
    this.num = _n;
    this.pallete = _p;
    for (let i = this.pallete.length - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = this.pallete[i];
      this.pallete[i] = this.pallete[r];
      this.pallete[r] = tmp;
    }
    this.amp = [];
    this.freq = [];
    this.dir = [];
    for (let i = 0; i < this.num; i++) {
      this.amp[i] = random(this.h / this.num / 4, this.h / this.num);
      this.freq[i] = random(0.1, 3);
      this.dir[i] = random() > 0.5 ? -1:1;
    }
    this.rotateNum = int(random(4));
  }
  update() {
  }
  display() {
    fill(this.bg);
    noStroke();
    rect(this.center.x, this.center.y, this.w, this.h);
    push();
    translate(this.center.x, this.center.y);
    rotate(this.rotateNum * 360 / 4);
    let offsetH = this.h / 10;
    for (let i = 0; i < this.num; i++) {
      let y0 = map(i, 0, this.num - 1, -this.h / 2 - offsetH, this.h / 2 + offsetH);
      noStroke();
      fill(this.pallete[i]);
      beginShape();
      for (let x = -this.w / 2; x <= this.w / 2; x += 1) {
        let y = constrain(y0 + sin(x * this.freq[i] + frameCount * (this.freq[i]+this.amp[i]/20) * this.dir[i]) * this.amp[i] * cos(frameCount/this.amp[i]), -this.h / 2, this.h / 2);
        vertex(x, y);
      }
      vertex(this.w / 2, this.h / 2);
      vertex(-this.w / 2, this.h / 2);
      endShape(CLOSE);
    }
    pop();
  }
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 20);
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