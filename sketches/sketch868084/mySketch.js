let letterSystems = [];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  let r = width / 2 * 0.65;
  let angleStep = 360 / 10;
  for (let angle = 0; angle < 360; angle += angleStep) {
    let letterSystem = new LetterSystem(angle, angleStep, r);
    letterSystems.push(letterSystem);
  }

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 10 / 100; i++) {
    let d = random(5);
    let x = random(-d, width + d);
    let y = random(-d, height + d);
    graphics.fill(random(180,280),100,10,10);
    graphics.ellipse(x,y,d,d);
  }  
  
  background(0, 0, 15);
  image(graphics,0,0);

}

function draw() {
  push();
  translate(width / 2, height / 2);
  // drawingContext.shadowColor = color(0, 0, 100);
  // drawingContext.shadowBlur = 15;
  for (let letterSystem of letterSystems) {
    letterSystem.update();
    letterSystem.display();
  }
  pop();
  if(frameCount > 300){
    noLoop();
  }
}

class LetterSystem {
  constructor(angle, angleStep, r) {
    this.angle = angle;
    this.angleStep = angleStep;
    this.r = r;
    this.letters = [];
    for (let a = angle; a < angle + angleStep; a += 1) {
      let n = noise(sin(a) * 1);
      n = n * n * 100;
      if(n >5){
      for (let r = this.r - n / 4; r < this.r + n / 4; r += 1) {
        this.letters.push(new Letter(a, r));
      }
      }
    }
  }
  update() {
    for (let letter of this.letters) {
      letter.update();
    }
  }
  display() {
    for (let letter of this.letters) {
      letter.display();
    }
  }
}

class Letter {
  constructor(angle, r) {
    this.angle = angle;
    this.r = r;
    this.ns = map(noise(sin(this.angle), this.r / 100), 0, 1, 100, 300);
    this.life = map(noise(this.angle / this.ns), 0, 1, 0, 100);
    this.lifeStep = .05;
    this.px = cos(this.angle) * this.r;
    this.py = sin(this.angle) * this.r;
  }
  update() {
    let x = cos(this.angle) * this.r;
    let y = sin(this.angle) * this.r;
    let n = map(noise(x / this.ns, y / this.ns), 0, 1, -1, 1);
    let m = map(noise(x / this.ns, y / this.ns, this.r / this.ns * 10), 0, 1, -1, 1);
    this.life -= this.lifeStep;
    this.angle += n;
    this.r += m;
  }
  display() {
    let x = cos(this.angle) * this.r;
    let y = sin(this.angle) * this.r;
    let p = createVector(x, y);
    stroke(0, 0, 100, this.life);
    point(p.x, p.y);
  }
}