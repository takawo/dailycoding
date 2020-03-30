let movers = [];
let w;
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  blendMode(ADD);
  angleMode(DEGREES);
  w = sqrt(sq(width) + sq(height));
  push();
  translate(width / 2, height / 2);
  separateGrid(-w / 2, -w / 2, w);
  pop();

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    if (random(100) > 50) {
      bg.fill(0, 0, 0, 5);

    } else {
      bg.fill(0, 0, 100, 5);

    }
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }

}

function draw() {
  blendMode(BLEND);
  background(0, 0, 20);
  blendMode(ADD);
  push();
  translate(width / 2, height / 2);
  rotate(45);
  for (let m of movers) {
    m.update();
    m.draw();
  }
  pop();
  image(bg, 0, 0);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        let n = w / 100;
        for (let k = 0; k < n; k++) {
          let m = new Mover(i, j, w, w, random(360));
          movers.push(m);
        }
      }
    }
  }
}

class Mover {
  constructor(x, y, w, h, angle = 0) {
    this.bound = new Bound(x, y, w, h);
    this.pos = createVector(x + random(w), y + random(h));
    this.angleA = angle != null ? angle : 0;
    this.r = random(1, 5);
    this.trail = [];
    this.trailMaxLength = random(30, 60);
    this.noiseScale = random(400, 400);
    this.life = random(50, 200);
  }
  isDead() {
    return this.life < 0;
  }
  update() {
    let n = noise(this.pos.x / this.noiseScale,
      this.pos.y / this.noiseScale,
      // frameCount / this.noiseScale
    );
    n = map(n, 0, 1, -5, 5);
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
      this.pos = createVector(this.bound.x + random(this.bound.w), this.bound.y + random(this.bound.h));
      this.trail = [];
      this.trail.push(createVector(this.pos.x, this.pos.y));
      this.trailMaxLength = random(30, 60);
      this.life = random(50, 200);

    }

  }
  draw() {
    stroke(0, 0, 95, 2);
    noFill();
    rect(this.bound.x, this.bound.y, this.bound.w, this.bound.h);
    noFill();
    stroke(0, 0, 55);
    beginShape();
    for (let p of this.trail) {
      vertex(p.x, p.y);
    }
    endShape();
    fill(0, 0, 95);
    noStroke();
    let d = pow(map(this.trail.length, 1, this.trailMaxLength, 0, 1), 3) * 5;
    ellipse(this.pos.x, this.pos.y, d, d);
    ellipse(this.trail[0].x, this.trail[0].y, d, d);
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