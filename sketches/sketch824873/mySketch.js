let movers = [];
let maxMoverNum = 100;
let rotation;
let tf;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(ADD);
  background(0, 0, 20);
  graphics = createGraphics(width,height);
  graphics.stroke(255,1);
  for(let i = 0; i < width * height * 10/100; i++){
    graphics.point(random(width),random(height));
  }
  
  tf = new Transformer();
  rotations = round(random(3, 3))

  for (var i = 0; i < maxMoverNum/3; i++) {
    movers[i] = new Mover();
  }
}

function draw() {
  blendMode(BLEND);
  background(0, 0, 0, 1);
  image(graphics,0,0);
  blendMode(ADD);

  tf.push();
  tf.translate(width / 2, height / 2);

  for (let m of movers) {
    m.update();
    m.display();
  }
  tf.pop();
  if (random(100) < 10 && movers.length < maxMoverNum) {
    movers.push(new Mover());
  }
}

class Mover {
  constructor() {
    this.color = color(random(360), 80, 100);
    this.seed = random(99999);
    this.pos = p5.Vector.random2D().mult(random() * width /2*0.8);
    this.dir = random(360);
    this.scale = random(0.01, 0.1)*10;
    this.rate = random(0.01, 0.1);
    this.ns = int(random(100, 800)) / 50;
    this.branch_rate = random(0.001, 0.01);
  }
  update() {
    this.size = noise(frameCount / 500, this.seed) * width /200;
    var h = hue(this.color);
    this.color = color((h + 1) % 360, 80, 50 + sin(this.seed + frameCount/10) * 50,50);
    this.dir = map(noise(this.pos.x / this.ns, this.pos.y / this.ns, this.seed / this.ns), 0, 1, -360, 360);

    this.pos.x += cos(this.dir) * this.size * 0.25;
    this.pos.y += sin(this.dir) * this.size * 0.25;

    //var col = get(int(this.pos.x), int(this.pos.y));
    this.display();
    if (random(100) < 1) {
      this.remove();
    }

    if (p5.Vector.dist(createVector(this.pos.x, this.pos.y), createVector(0, 0)) > width * 0.4) this.remove();

    if (random() < this.branch_rate) this.new();
  }
  remove() {
    var index = movers.indexOf(this);
    if (index > -1) {
      movers.splice(index, 1);
    }
  }
  display() {
    noStroke();
    fill(this.color);
    for (var i = 0; i < rotations; i++) {
      rotate(360 / rotations);
      circle(this.pos.x, this.pos.y, this.size*this.scale);
      circle(-this.pos.x, this.pos.y, this.size*this.scale);
    }
  }
  new() {
    if (movers.length < maxMoverNum) {
      let mover = new Mover();
      mover.pos = this.pos.copy();
      mover.color = this.color;
      movers.push(mover);
    }
  }
}