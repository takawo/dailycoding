let colors = ["#ED6A5A", "#F4F1BB", "#9BC1BC", "#5CA4A9", "#E6EBE0"];
let movers = [];
let ns = 100;
let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let offset = width / 10;
  drawingContext.shadowBlur = 20;
  separateGrid(offset, offset, width - offset * 2);
  texture = createGraphics(width, height);
  texture.stroke(0, 3);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    texture.strokeWeight(random(3));
    texture.point(random(width),
      random(height));
  }
}

function draw() {
  clear();
	blendMode(BLEND);
	background(0,0,95);
  blendMode(BURN);
  for (let m of movers) {
    m.update();
    m.display();
  }
  if (frameCount % 80 == 0) {
    background(0, 0, 90);
    movers = [];
    let offset = width / 10;
    separateGrid(offset, offset, width - offset * 2);
  }
  image(texture, 0, 0);
}



function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      let n = noise(i / ns, j / ns, frameCount / ns);
      if (n > 0.5 && w > width / 4) {
        separateGrid(i, j, w);
      } else {
        let c = random(colors);
        let m = new Mover(i + w / 2, j + w / 2, w, w, 0, c);
        movers.push(m);
        // rect(i, j, w, w);
      }
    }
  }
}

class Mover {
  constructor(x, y, w, h, angle, c) {
    this.pos = new Rect(x, y, w, h, angle);
    this.init(x, y, w, h, angle);
    this.c = c;
  }
  init(x, y, w, h, angle) {
    let theta = int(random(8)) * 360 / 8;
    let len = random(width / 8, width / 20);
    let tx = x + cos(theta) * len;
    let ty = y + sin(theta) * len;
    let tw = random(w * 0.5, w * 1.5);
    let th = random(h * 0.5, h * 1.5);
    let tangle = angle + int(random(2)) * 360 / 8 * (random(100) > 50 ? -1 : 1);
    this.target = new Rect(tx, ty, tw, th, tangle);
    this.speed = new Rect(0, 0, 0, 0, 0);
    this.springRatio = 0.25;
  }
  update() {
    this.speed.x = lerp(this.speed.x, (this.target.x - this.pos.x) * this.springRatio, this.springRatio / 2);
    this.speed.y = lerp(this.speed.y, (this.target.y - this.pos.y) * this.springRatio, this.springRatio / 2);
    this.speed.w = lerp(this.speed.w, (this.target.w - this.pos.w) * this.springRatio, this.springRatio / 2);
    this.speed.h = lerp(this.speed.h, (this.target.h - this.pos.h) * this.springRatio, this.springRatio / 2);
    this.speed.angle = lerp(this.speed.angle, (this.target.angle - this.pos.angle) * this.springRatio, this.springRatio / 2);
    this.pos.add(this.speed);

    let distance = dist(this.target.x, this.target.y, this.pos.x, this.pos.y);
    if (distance < 0.01) {
      this.init(this.target.x, this.target.y, this.target.w, this.target.h, this.target.angle);
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.pos.angle);
    // noStroke();
    // drawingContext.shadowColor = color(0, 0, 100, 10);
    // drawingContext.shadowBlur = 10;
    fill(this.c);
    // stroke(0, 0, 0, 20);
    noStroke();
    rectMode(CENTER);
    drawingContext.shadowColor = this.c;
    rect(0, 0, this.pos.w, this.pos.h, 3);
    pop();
  }
}

class Rect {
  constructor(x, y, w, h, angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }
  add(rect) {
    this.x += rect.x;
    this.y += rect.y;
    this.w += rect.w;
    this.h += rect.h;
    this.angle += rect.angle;
  }
}