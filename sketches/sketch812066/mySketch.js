let movers = [];
let pallete = ["#1132B2", "#0E1057", "#BAE7F1", "#24AFC2", "#F13736", "#4A3749", "#BC8968", "#050110"];
let cells, offset, margin, cellW;
let bg;
let bgColor;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(ADD);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
      bg.fill(0, 0, 100, 5);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }
  let bgNum = int(random(pallete.length));
  bgColor = pallete[bgNum];
  pallete.splice(bgNum,1);

  cells = int(random(3, 6));
  offset = width / 10;
  margin = offset / 5;
  cellW = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      for (let k = 0; k < 3; k++) {
        let x = offset + i * (cellW + margin);
        let y = offset + j * (cellW + margin);
        let col = random(pallete);
        let m = new Mover(x, y, cellW, cellW,col);
        movers.push(m);
      }

    }
  }
}

function draw() {
  blendMode(BLEND);
  background(bgColor);
  image(bg,0,0);
  //blendMode(ADD);
  for (let m of movers) {
    m.update();
    m.display();
  }
}

class Mover {
  constructor(x, y, w, h, col) {
    this.col = col;
    this.bound = new Bound(x, y, w, h);
    this.pos = createVector(x + random(w), y + random(h));
    this.angleA =random(360);
    this.r = random(1, 5);
    this.trail = [];
    this.trailMaxLength = random(30, 60);
    this.noiseScale = random(50, 200);
    this.life = random(50, 200);
  }
  isDead() {
    return this.life < 0;
  }
  update() {
    let n = noise(this.pos.x / this.noiseScale,
      this.pos.y / this.noiseScale,
      frameCount / this.noiseScale
    );
    n = map(n, 0, 1, -15, 15);
    this.angleA += n;
    let vel = createVector(this.r * cos(this.angleA),
      this.r * sin(this.angleA));
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, this.bound.x, this.bound.x + this.bound.w);
    this.pos.y = constrain(this.pos.y, this.bound.y, this.bound.y + this.bound.h);
    this.trail.push(createVector(this.pos.x, this.pos.y));
    if (this.trail.length > this.trailMaxLength) {
      this.trail.shift();
    }
    this.life--;
    if (this.life < this.trailMaxLength) {
      this.trailMaxLength -= 1;
      if (this.trail.length > this.trailMaxLength && this.trail.length > 1) {
        this.trail.shift();
      }
    }
    if (this.isDead()) {
      // this.pos = createVector(this.bound.x + random(this.bound.w), this.bound.y + random(this.bound.h));
      this.trail = [];
      this.trail.push(createVector(this.pos.x, this.pos.y));
      this.trailMaxLength = random(30, 60);
      this.life = random(50, 200);

    }

  }
  display() {

    for (let i = 0; i < 10 / 3; i++) {
      let t = map(i, 0, 10 / 3, 1, 15);
      let s = map(i, 0, 10 / 3, 15, 1);
      noFill();
      let c = this.col + hex(t,2);
      stroke(c);
      strokeWeight(s);
      beginShape();
      for (let p of this.trail) {
        vertex(p.x, p.y);
      }
      endShape();
      fill(c);
      //noStroke();
      let d = pow(map(this.trail.length, 1, this.trailMaxLength, 0, 1), 3) * 8;
      ellipse(this.pos.x, this.pos.y, d, d);
      ellipse(this.trail[0].x, this.trail[0].y, d, d);
    }
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