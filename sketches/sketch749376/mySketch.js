let points;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete = ["#DAD7D4", "#C8C3BC", "#9F8D7A", "#0D1B1F", "#C1655C", "#C8B397", "#44A3B3"];
let bg;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  init();
}

function init() {
  points = [];
  cells = int(random(3, 8));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 5;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (cols - 1)) / cols;
  let n = 0;
  let bgNum = int(random(pallete.length));
  bg = pallete[bgNum];
  pallete.splice(bgNum,1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);  
  
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let leftTopX = offset + i * (margin + cellW);
      let leftTopY = offset + j * (margin + cellH);
      let grid = int(random(3, 6));
      for (let k = 0; k < grid * 3; k++) {
        let x = leftTopX + int(random(grid)) / grid * cellW;
        let y = leftTopY + int(random(grid)) / grid * cellH;
        points.push(new Point(n, x, y, pallete, grid));
        n++;
      }
    }
  }
}

function draw() {
  background(bg);
  for (let q of points) {
    for (let p of points) {
      let d = p5.Vector.dist(p.pos, q.pos);
      if (!p.equals(q) && d <= (cellW / p.grid * sqrt(2)) && d > 1) {
        let c1 = color(p.color);
        let c2 = color(q.color);
        colorMode(RGB);
        let c = lerpColor(c1, c2, .5);
        stroke(c);
        strokeWeight(2);
        line(p.pos.x, p.pos.y, q.pos.x, q.pos.y);
        colorMode(HSB,360,100,100,100);
      }
    }
  }
  for (let p of points) {
    p.display();
  }
  image(graphics, 0, 0);
}

class Point {
  constructor(id, x, y, pallete, grid) {
    this.id = id;
    this.pos = createVector(x, y);
    this.pallete = pallete.concat();
    this.color = random(pallete);
    this.grid = grid;
    this.isSquare = random() < 0.5;
  }
  equals(p) {
    return p.id == this.id;
  }
  update() {

  }
  display() {
    rectMode(CENTER);
    fill(this.color);
    noStroke();
    if (this.isSquare) {
      square(this.pos.x, this.pos.y, 5 * (9 - this.grid) / 3);
    } else {
      circle(this.pos.x, this.pos.y, 5 * (9 - this.grid) / 3);
    }
  }
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
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