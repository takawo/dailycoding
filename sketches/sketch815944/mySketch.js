let movers;
let mover;
let cells;
let cols;
let rows;
const offset = 80;
const margin = offset;
let w, h;
let hue_num;
let rotateAngle = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  smooth();

  init();
}

function init() {
  movers = [];

  rotateAngle = int(random(8)) * 360 / 8;
  hue_num = int(random(12)) * 360 / 12;

  push();
  translate(width / 2, height / 2);
  let w = sqrt(sq(width) + sq(height));
  separateGrid(-w / 2, -w / 2, w);
  pop();
  blendMode(BLEND);
  background(hue_num, 90, 15);
  drawNoise(55000);
}


function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        let m = new Mover(i+w/10, j+w/10, w*8/10, w*8/10);
        movers.push(m);
      }
    }
  }
}



function draw() {
  //blendMode(BLEND);
  //background(300, 90, 15);
  blendMode(ADD);
  push();
  translate(width / 2, height / 2);
  rotate(rotateAngle);
  for (let m of movers) {
    for (let i = 0; i < 10; i++) {
      let n = m.update(frameCount + i);
      m.drawBound();
      m.display(n);
      m.checkBound();
      m.drawBound();
    }
  }
  pop();

  if (frameCount % 333 == 0) {
    init();
  }

}

function mousePressed() {
  saveCanvas("output" + "_" + frameCount + ".png");
}

function drawNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    noStroke();
    fill(0, 0, 100, random(5));
    ellipse(x, y, w, h);
  }
}

class Mover {
  constructor(_x, _y, _w, _h) {
    this.bound = new Bound(_x, _y, _w, _h);
    this.pos = createVector(_x + _w / 2, _y + _h / 2);
    this.prev_pos = this.pos.copy();
    this.vel = createVector();
    this.noiseScale = random(200, 400);
    this.angle = random(360);
    this.isDraw = random(100) < 50;
    this.isFirst = random(100) < 50;
  }
  update(_num) {
    let n = noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale, frameCount / this.noiseScale);
    this.angle += map(n, 0, 1, -1.5, 1.5);
    let mag = noise(frameCount / 100) * 3 / 10 / 2 * 5;
    this.vel = createVector(cos(this.angle) * mag, sin(this.angle) * mag);
    this.prev_pos = this.pos.copy();
    this.pos.add(this.vel);
    return n;
  }
  display(_n) {
    if (this.isFirst || this.isDraw) {
      fill(0, 0, 100);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.bound.w / 8);
      this.isFirst = false;
      this.isDraw = false;
    }
    stroke(0, 0, 100, 50);
    strokeWeight(1);
    noFill();
    line(this.pos.x, this.pos.y, this.prev_pos.x, this.prev_pos.y);
  }

  drawBound() {
    // fill(0, 0, 0, 5);
    // stroke(0, 0, 0);
    // noFill();
    // rect(this.bound.x, this.bound.y, this.bound.w, this.bound.h);
  }
  checkBound() {
    let x = constrain(this.pos.x, this.bound.x, this.bound.x + this.bound.w);
    let y = constrain(this.pos.y, this.bound.y, this.bound.y + this.bound.h);
    let halfX = this.bound.x + this.bound.w / 2;
    let halfY = this.bound.x + this.bound.w / 2;
    if ((this.pos.x != x && this.pos.y != y) || (int(x) == int(halfX) && this.pos.y != y) || (int(y) == int(halfY) && this.pos.x != x)) {
      this.isDraw = true;
    }
    this.pos.x = x;
    this.pos.y = y;
  }

}

class Bound {
  constructor(_x, _y, _w, _h) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
  }
}