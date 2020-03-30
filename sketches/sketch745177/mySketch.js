let ratio = 0.65;
let points = [];
let cells, cols, rows;
let offset, margin;
let w, h;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  cells = int(random(3, 9));
  cols = cells;
  rows = cells;
  offset = width / 5;
  margin = offset / 5;

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, width - offset - h);
      for (let angle = 0; angle < 360; angle += 3) {
        points.push(new Mover(x+w/2 + cos(angle) * w / 2, y+h/2 + sin(angle) * h / 2));
        
      }
    }
  }
  background(0,0,90);
}

function draw() {
  for (let p of points) {
    p.update();
    p.display();
  }
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, width - offset - h);
      fill(0,0,90);
      noStroke();
      ellipse(x+w/2,y+h/2,w,h);
    }
  }

}

class Mover {
  constructor(_x, _y, _nx = 50, _ny = 50) {
    this.pos = createVector(_x, _y);
    let nx = 1 / 150;
    let ny = 1 / 100;
    let nz = 1 / 150;
    this.noiseScale = createVector(nx, ny);
    this.life = 100;
    this.lifeRatio = this.life / 200;
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
    stroke(0, 0, 0, this.life / 2);
    point(this.pos.x, this.pos.y);
  }
}