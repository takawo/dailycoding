let movers = [];
let graphics;
let c1, c2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  clear();
  let y = height / 2;
  let freq = random(random(1));
  c1 = color(random(360), random(80), random(0, 100));
  c2 = color((hue(c1) + 180) % 360, 100 - saturation(c1), 100 - brightness(c1), 15);
  let ns = int(random(2, 18)) * 50;
  for (let x = -width / 2; x < width + width / 2; x += .2) {
    movers.push(new Mover(x, y + sin(x * freq) * 150, ns));
  }

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.background(c1);
  drawNoiseBackground(10000, graphics);

  background(c1);
  image(graphics, 0, 0);
}

function draw() {
  if (brightness(c1) < 50) {
    blendMode(ADD);
  } else {
    blendMode(MULTIPLY);
  }

  let arr = [];
  for (let i = 0; i < movers.length; i++) {
    let m = movers[i];
    m.display();
    m.update();
    if (m.life == 0) {
      arr.push(i);
    }
  }
  for (let i = arr.length - 1; i > 0; i--) {
    movers.splice(arr[i], 1);
  }
  if (movers.length < 10) {
    // saveCanvas("output.png");
    init();
  }
}

function mousePressed() {
  saveCanvas("output.png");
}


function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 5);
    _graphics.ellipse(x, y, w, h);
  }
}

class Mover {
  constructor(_x, _y, _n) {
    this.pos = createVector(_x, _y);
    this.prev_pos = this.pos.copy();
    this.noiseScale = _n;
    let n = noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale, frameCount / this.noiseScale);
    this.angle = map(n, 0, 1, -360, 360);
    this.mag = random(1, 3) / 10;
    this.vel = createVector(cos(this.angle) * this.mag, sin(this.angle) * this.mag);
    this.life = 20;
  }
  update() {
    this.prev_pos = this.pos.copy();
    let n = noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale, frameCount / this.noiseScale);
    let angle = map(n, 0, 1, -360, 360);
    let acc = createVector(cos(angle), sin(angle));
    acc.mult(0.01);
    this.vel.add(acc);
    this.pos.add(this.vel);
    this.life -= 0.01;
    this.life = constrain(this.life, 0, 3);
  }
  display() {
    fill(0, 0, 0, 50);
    noStroke();
    if (random(100) > 50) {
      stroke(c2);
      strokeWeight(this.life / 4);
      line(this.pos.x, this.pos.y, this.prev_pos.x, this.prev_pos.y);
    }
    if (random(random(random(1))) < 0.0001) {
      stroke(c2);
      strokeWeight(.25);
      let x = this.pos.x + cos(this.angle - 180) * 15;
      let y = this.pos.y + sin(this.angle - 180) * 15;
      point(x, y);
    }
  }

}