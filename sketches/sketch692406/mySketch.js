let movers = [];

let cells;
let cols, rows;
let offset, margin;
let w, h;

let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  smooth();
  init();
  background(0, 0, 0);
}

function init() {
  cells = 7; //int(random(3, 10));
  cols = cells;
  rows = cells;
  offset = (width / cols) / int(random(2, 4));
  margin = offset / int(random(2, 4));
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
  for (let k = 0; k < rows; k++) {
    movers[k] = [];
    for (let j = 0; j < cols; j++) {
      let x = map(j, 0, cols - 1, offset, width - offset - w);
      let y = map(k, 0, rows - 1, offset, height - offset - h);
      movers[k][j] = [];
      for (let i = 0; i < 9; i++) {
        if (random(100) < 33) {
          movers[k][j].push(new Mover(x, y, w, h, i));
        }
      }
      while (movers[k][j].length < 3) {
        movers[k][j].push(new Mover(x, y, w, h, int(random(9))));
      }
    }
  }
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(25000, bg);
}

function draw() {
  blendMode(NORMAL);
  background(0, 0, 0, 70);
  blendMode(ADD);
  image(bg, 0, 0);

  for (let k of movers) {
    for (let l of k) {
      for (let m of l) {
        m.update();
        m.display();
      }
    }
  }
}

function mousePressed() {
  saveCanvas("output-" + cells + "_" + frameCount + ".png");
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 10);
    _graphics.ellipse(x, y, w, h);
  }
}

class Mover {
  constructor(_x, _y, _w, _h, _n) {
    this.bound = new Bound(_x, _y, _w, _h);
    this.collection = [];
    this.current = _n;
    if (this.current == 8) {
      this.pos = createVector(_x + _w / 2, _y + _h / 2);
    } else {
      let px = _x + _w / 2 + cos(_n / 8 * 360) * _w;
      let py = _y + _h / 2 + sin(_n / 8 * 360) * _h;
      px = constrain(px, _x, _x + _w);
      py = constrain(py, _y, _y + _h);
      this.pos = createVector(px, py);
    }
    this.prev_pos = this.pos.copy();
    this.changeTarget();
    this.ratio = random(1);
    this.speed = random(100) > 50 ? 1 / 300 : 1 / 150;
    this.collection.push(this.prev_pos.copy());
    this.isFill = random(100) > 50;
  }

  update() {
    this.prev_pos = this.pos.copy();
    this.pos = p5.Vector.lerp(this.pos, this.target, this.ratio);
    this.ratio += this.speed;
    let d = p5.Vector.dist(this.pos, this.target);
    if (this.ratio > 1 || d < .5) {
      if (this.collection.length > 3) {
        this.collection.shift();
      }
      this.collection.push(this.pos.copy());
      this.ratio = 0;
      this.pos = this.target.copy();
      this.prev_pos = this.pos.copy();
      this.changeTarget();
    }

    if (random(1000) < 1) {
      this.isFill = !this.isFill;
    }

  }
  changeTarget() {
    this.next = this.current;
    while (this.next == this.current) {
      this.next = int(random(9))
    }
    if (this.next == 8) {
      this.target = createVector(this.bound.x + this.bound.w / 2, this.bound.y + this.bound.h / 2);
    } else {
      let tx = this.bound.x + this.bound.w / 2 + cos(this.next / 8 * 360) * this.bound.w;
      let ty = this.bound.y + this.bound.h / 2 + sin(this.next / 8 * 360) * this.bound.h;
      tx = constrain(tx, this.bound.x, this.bound.x + this.bound.w);
      ty = constrain(ty, this.bound.y, this.bound.y + this.bound.h);
      this.target = createVector(tx, ty);
    }
  }
  display() {
    noStroke();
    stroke(0, 0, 100);
    let tc = abs(this.target.x + this.target.y) % 360;
    let pc = abs(this.prev_pos.x + this.prev_pos.y) % 360;
    let hue = lerp(pc, tc, this.ratio);
    if (this.isFill) {
      fill(hue, 80, 100, 33);
      noStroke();
    } else {
      stroke(hue, 0, 50, 66);
      strokeWeight(0.5);
      noFill();
    }
    //noFill();
    beginShape();
    for (let s of this.collection) {
      vertex(s.x, s.y);
    }
    vertex(this.pos.x, this.pos.y);
    endShape();
  }
}

class Bound {
  constructor(_x, _y, _w, _h) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
  }
  display() {
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }
}