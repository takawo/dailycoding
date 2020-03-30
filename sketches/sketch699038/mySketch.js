//inspired by @junkiyoshi's  awesome artwork.
// https://twitter.com/junkiyoshi/status/1117039263562911745

let particles = [];
let cells, cols, rows;
let offset, margin;
let w, h;
let pallete = ["#F45B69", "#EBEBEB", "#59C3C3", "#4062BB", "#52489C"];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  cells = int(random(3, 8));
  cols = cells;
  rows = cells;

  offset = (width / cols) / int(random(2, 6));
  margin = offset / int(random(3, 6));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let p = new Particles(x, y, w, h);
      particles.push(p);
    }
  }
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
}

function draw() {
  blendMode(NORMAL);
  background(0, 0, 0);
  blendMode(ADD);
  for (let p of particles) {
    p.update();
    p.display();
  }
  image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 20, 50);
    _graphics.ellipse(x, y, w, h);
  }
}

class Particles {
  constructor(_x, _y, _w, _h) {
    this.bound = new Bound(_x, _y, _w, _h);
    this.pos = createVector(_x + _w / 2, _y + _h / 2);
    this.maxNum = 35;
    this.particle = [];
  }
  update() {
    if (this.particle.length < this.maxNum) {
      let p = new Particle(this.pos.x, this.pos.y);
      this.particle.push(p);
    }
    for (let p of this.particle) {
      p.update();
      if (p.t <= 0) {
        p.pos = createVector(this.bound.x + this.bound.w / 2, this.bound.y + this.bound.h / 2);
        p.near.length = 0;
        p.isConnect = random(100) < 50;
        let n = p.n;
        while (n == p.n) {
          n = int(random(pallete.length));
        }
        p.n == n;
      }
      if (p.isConnect) {
        p.near = p.checkNear(this.particle);
      }
    }
  }
  display() {
    for (let p of this.particle) {
      p.display();
    }

  }
}

class Particle {
  constructor(_x, _y) {
    this.near = [];
    this.pos = createVector(_x, _y);
    this.pos_origin = this.pos.copy();
    this.angle = random(360);
    this.len = random(1, 3)  * (random(100) > 50 ? -1 : 1);
    this.t;
    this.n = int(random(pallete.length));
    this.isConnect = random(100) < 50;
  }
  update() {
    let vel = createVector(cos(this.angle) * this.len, sin(this.angle) * this.len);
    this.pos.add(vel);
    let d = p5.Vector.dist(this.pos, this.pos_origin);
    this.t = map(d, 0, w / 2, 100, 0);
    // this.near = this.checkNear(particles);
  }
  checkNear(_particles) {
    let min = 100;
    let arr = [];
    for (let p of _particles) {
      if (this.pos.equals(p.pos) == false) {
        let d = p5.Vector.dist(this.pos, p.pos);
        let obj = {
          particle: p,
          dist: d
        };
        arr.push(obj);
      }
    }
    arr.sort(function(a, b) {
      if (a.dist < b.dist) return -1;
      if (a.dist > b.dist) return 1;
      return 0;
    });
    arr.splice(3, arr.length - 3);
    return arr;
  }
  display() {
    if (this.isConnect) {
      strokeWeight(1.5);
    } else {
      strokeWeight(1.5 * 2);

    }

    stroke(0, 0, 100, this.t);
    point(this.pos.x, this.pos.y);

    if (this.isConnect == false) {
      return;
    }
    strokeWeight(.5);
    let tSum = 0;
    for (let obj of this.near) {
      tSum += obj.particle.t;
    }
    fill(pallete[this.n] + hex(int(this.t * 4), 2));
    beginShape();
    for (let obj of this.near) {
      vertex(obj.particle.pos.x, obj.particle.pos.y);
    }
    endShape(CLOSE);
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