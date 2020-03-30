let brushes = [];
let images = [];
let cellMax = 5;
let cells = Math.floor(Math.random() * Math.floor(cellMax - 1)) + 2;
let cols = cells;
let rows = cells;
let offset, margin;
let cellW, cellH;

function preload() {
  let num = sq(cells);
  for (let i = 0; i < num; i++) {
    images[i] = loadImage("https://picsum.photos/id/" + i + "/10/10/");
  }
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 10);

  offset = width / 10;
  margin = offset / int(random(2, 4));
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;
  let i = 0;
  for (img of images) {
    let x = map(i % cols, 0, cols - 1, offset, width - offset - cellW);
    let y = map(int(i / rows), 0, rows - 1, offset, height - offset - cellH);
    // rect(x,y,cellW,cellH);
    imageMode(CENTER);
    brushes.push(new Brush(x, y, cellW, cellH, img));
    i++;
  }
}

function draw() {
  background(0, 0, 10, .1);
  let arr = [];
  let i = 0;
  for (let brush of brushes) {
    brush.display();
    if (brush.isDead()) {
      arr.push(i);
    }
    i++;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    brushes.splice(i, 1); 
  }
}

class Brush {
  constructor(_x, _y, _w, _h, _img) {
    this.x = _x;
    this.y = _y;
    this.MaxW = _w;
    this.MaxH = _h;
    this.img = _img;
    this.img.resize(_w, _h);

    this.angle = random(360);
    this.xRatio = random(-5, 5) / 2.5;
    this.yRatio = random(-5, 5) / 2.5;
    this.cx;
    this.cy;
    this.w, this.h;
    this.count = 0;
    this.countMax = random(3, 10) * 10;
  }
  display() {
    push();
    imageMode(CENTER);
    translate(this.x + this.MaxW / 2, this.y + this.MaxH / 2);
    rotate(frameCount * 1 / this.xRatio / 3);
    this.cx = cos(this.angle + frameCount * this.xRatio) * this.MaxW / 2;
    this.cy = sin(this.angle + frameCount * this.yRatio) * this.MaxH / 2;
    this.w = sin(this.cx + frameCount / 10) * this.MaxW / 5;
    this.h = this.w;
    image(this.img, this.cx, this.cy, this.w, this.h);
    pop();
  }
  isDead() {
    if (abs(this.w) < 1) {
      this.count++;
    }
    return this.count > this.countMax;
  }
}