let canvas;
let shapes = [];
let points = [];
let shepeGraphics;
let cir;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete = ["#FEFEFE", "#FEA98E", "#472C2E", "#AE433B", "#FA604A", "#5D9990", "#CF8C78", "#B8A4A1"];
let graphics;

function setup() {
  canvas = createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(50000, graphics);

  shepeGraphics = createGraphics(width, height);
  shepeGraphics.colorMode(HSB, 360, 100, 100, 100);
  shepeGraphics.angleMode(DEGREES);

  let bgNum = int(random(pallete.length));
  let bg = pallete[bgNum];
  pallete.splice(bgNum, 1);
  background(bg);

  let cells = int(random(4, 8));
  let cols = cells;
  let rows = cells;

  let offset = width / 10;
  let margin = offset / 5;

  let cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  let cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  //background(0, 0, 90);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW) + cellW / 2;
      let y = map(j, 0, rows - 1, offset, height - offset - cellH) + cellH / 2;
      let d = ((cellW + cellH) / 2) * int(random(4, 10)) / 10;
      let c = random(pallete);
      let cc = c;
      while (cc == c) {
        cc = random(pallete);
      }
      cir = new Circle(x, y, d/2, c);
      cir.display(shepeGraphics);
      for (let angle = 0; angle < 360; angle += 2) {
        let ax = x + cos(angle) * d / 2;
        let ay = y + sin(angle) * d / 2;
        points.push(new Mover(ax, ay, cc));
      }
    }
  }
  image(graphics, 0, 0);
}

function draw() {
  for (let p of points) {
    p.update();
    p.display();
  }
  image(shepeGraphics, 0, 0);
	
	if(frameCount > 300){
		noLoop();
	}
}


class Shape {
  constructor(x, y, d, c) {
    this.center = createVector(x, y);
    this.diameter = d;
    this.color = c;
  }
  update() {}
  display() {}
}

class Circle extends Shape {
  update() {

  }
  display(g) {
    g.fill(this.color);
    g.noStroke();
    g.circle(this.center.x, this.center.y, this.diameter);
  }
}

class Mover {
  constructor(_x, _y, _c) {
    this.pos = createVector(_x, _y);
    let nx = 1 / 150;
    let ny = 1 / 200;
    let nz = 1 / 150;
    this.color = _c;
    this.noiseScale = createVector(nx, ny, nz);
    this.life = 100;
    this.lifeRatio = this.life / 150;
  }
  update() {
    let n = noise(this.pos.x * this.noiseScale.x,
      this.pos.y * this.noiseScale.y, this.frameCount * this.noiseScale.z);
    let angle = (map(n, 0, 1, -180, 180) + hue(this.color)) % 360;
    angle = (angle + frameCount / 10) % 360;
    let vel = createVector(cos(angle), sin(angle));
    this.pos.add(vel);
    this.life -= this.lifeRatio;
  }
  display() {
    stroke(this.color + hex(max(int(this.life), 0), 2));
    point(this.pos.x, this.pos.y);
  }
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 10);
    _graphics.ellipse(x, y, w, h);
  }
}