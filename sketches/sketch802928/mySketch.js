let movers = [];
let num = 15;
let maxNum = 100;
let bg;
let img;

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  blendMode(ADD);
  
  angleMode(DEGREES);
  
  for (let i = 0; i < num; i++) {
    let angleA = 360 / num * i;
    let angleB = 360 / num * i - 180;
    let m = new Mover(0, 0, 0, angleA, angleB);
    movers.push(m);
  }

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 15);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let radius = sqrt(sq(width / 2) + sq(height / 2));
    let angle = random(360);
    let r = 1 - (random(random(random(1))));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }
  img = createImage(width, height);
  img.copy(bg, 0, 0, bg.width, bg.height, 0, 0, bg.width, bg.height);  
}

function draw() {
  orbitControl();
  background(0, 0, 20);
  push();
  // rotateX(frameCount * 0.1);
  // rotateY(frameCount * 0.2);
  // rotateZ(frameCount * 0.3);
  let n = 0;
  let removes = [];
  for (let m of movers) {
    if (m.isDead()) {
      removes.push(n);
    }
    m.update();
    m.draw();
    n++;
  }
  if (movers.length < maxNum) {
    let angleA = random(360);
    let angleB = random(-180, 180);
    let m = new Mover(0, 0, 0, angleA, angleB);
    movers.push(m);
  }
  for (let j = removes.length - 1; j > 0; j--) {
    movers.splice(removes[j], 1);
  }
  pop();
  push();
  translate(0, 0, -100);
  texture(img);
  noStroke();
  let w = sqrt(sq(width)+sq(height));
  plane(width * sqrt(2));
  pop();
}


class Mover {
  constructor(x, y, z, angleA = 0, angleB = 0) {
    this.pos = createVector(x, y, z);
    this.angleA = angleA != null ? angleA : 0;
    this.angleB = angleB != null ? angleB : 0;
    this.r = random(1, 5);
    this.trail = [];
    this.trailMaxLength = random(30, 60);
    this.noiseScale = random(100, 200);
    this.life = random(50, 200);
  }
  isDead() {
    return this.life < 0;
  }
  update() {
    let nA = noise(this.pos.x / this.noiseScale,
      frameCount / this.noiseScale
    );
    let nB = noise(this.pos.y / this.noiseScale,
      frameCount / this.noiseScale
    );
    nA = map(nA, 0, 1, -3, 3);
    this.angleA += nA;
    nB = map(nB, 0, 1, -3, 3);
    this.angleB += nB;
    let vel = createVector(this.r * cos(this.angleA) * cos(this.angleB),
      this.r * sin(this.angleA) * cos(this.angleB),
      this.r * sin(this.angleB));
    this.pos.add(vel);
    this.trail.push(createVector(this.pos.x, this.pos.y, this.pos.z));
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

  }
  draw() {
    noFill();
    stroke(0, 0, 95);
    beginShape();
    for (let p of this.trail) {
      vertex(p.x, p.y, p.z);
    }
    endShape();
    fill(0, 0, 95);
    noStroke();
    let d = pow(map(this.trail.length, 1, this.trailMaxLength, 0, 1), 3) * 3;
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(d);
    pop();
    push();
    translate(this.trail[0].x, this.trail[0].y, this.trail[0].z);
    sphere(d);
    pop();
  }
}