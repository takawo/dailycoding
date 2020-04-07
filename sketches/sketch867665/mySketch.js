// reference: https://www.youtube.com/watch?v=UcdigVaIYAk
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_078_Simple_Particle_System/P5

let particles = [];
let g;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  g = createGraphics(32, 32);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.noStroke();
  g.drawingContext.shadowColor = color(0, 0, 100);
  g.drawingContext.shadowBlur = g.width / 1.7;
  g.ellipse(g.width / 2, g.height / 2, g.width / 2.5);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 10 / 100; i++) {
    let d = random(5);
    let x = random(-d, width + d);
    let y = random(-d, height + d);
    graphics.fill(random(180,280),100,100,10);
    graphics.ellipse(x,y,d,d);
  }
}

function draw() {
  blendMode(BLEND);
  background(230, 100, 20);
  blendMode(ADD);

  for (let i = 0; i < 5; i++) {
    let x = width / 2;
    let y = height * 11 / 10;
    let p = new Particle(x, y);
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
  image(graphics,0,0);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(360);
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = random(100);
    this.d = random(32, 128);
  }

  finished() {
    return this.d < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.d -= 0.25;
  }

  show() {
    push();
    translate(this.x, this.y);
    image(g, 0, 0, this.d, this.d);
    pop();
  }
}