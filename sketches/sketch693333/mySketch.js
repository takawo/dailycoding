let movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(ADD);
  let y = height / 2;
  for (let x = 0; x < width; x += .3) {
    movers.push(new Mover(x, y + sin(x * .15) * 150));
  }
  background(0, 0, 10);
}

function draw() {
  for (let m of movers) {
    m.display();
    m.update();
  }
}

function mouseDragged() {
  movers.push(new Mover(mouseX, mouseY));
}

class Mover {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.prev_pos = this.pos.copy();
    this.noiseScale = 300; //random(150,300);
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
    this.life -= 0.0001;
    this.life = constrain(this.life, 0, 3);
  }
  display() {
    fill(0, 0, 0, 50);
    noStroke();
    if (random(100) > 50) {
      stroke(0, 0, 100, 5);
      strokeWeight(this.life / 4);
      line(this.pos.x, this.pos.y, this.prev_pos.x, this.prev_pos.y);
    }
  }

}