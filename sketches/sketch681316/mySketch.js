//　fork from https://www.openprocessing.org/sketch/494102
// port　to ES6 

let particles = [];
let pallete = ["#F8B195", "#C06C84", "#355C7D", "#6C5B7B", "#F67280"];
const nums = 1500;
const noiseScale = 400;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(210, 100, 30);
  for (let i = 0; i < nums; i++) {
    particles[i] = new Particle(
      random(0, width),
      random(0, height)
    );
  }
}

function draw() {
  for (let i = 0; i < nums; i++) {
    let radius = map(i, 0, nums, 0.1, 1);
    let alpha = map(i, 0, nums, 0, 100);
    let h = hue(pallete[i % pallete.length]);
    let s = saturation(pallete[i % pallete.length]);
    let b = brightness(pallete[i % pallete.length]);
    let col = color(h, s, b, alpha);
    fill(col);
    noStroke();
    particles[i].move();
    particles[i].display(radius);
    particles[i].checkEdges();
  }
}

class Particle {
  constructor(_x, _y) {
    this.dir = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.pos = createVector(_x, _y);
    this.speed = 0.4;
    this.offset = 50;
  }
  move() {
    let angle = noise(
      this.pos.x / noiseScale,
      this.pos.y / noiseScale
    ) * 360 * noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  }
  checkEdges() {
    if (this.pos.x > width || this.pos.y < 0 || this.pos.y > height || this.pos.y < 0) {
      this.pos.x = random(this.offset, width - this.offset);
      this.pos.x = random(this.offset, width - this.offset);
    }
  }
  display(_r) {
    circle(this.pos.x, this.pos.y, _r);
  }
}