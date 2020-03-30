let rotate_num;
let m;
let offset, margin;
let w;
let movers = [];
let cells;
let textureGraphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(ADD);
  cells = int(random(5, 8));

  offset = width / 10;
  margin = offset / 5;
  w = (width + offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -offset + i * (w + margin) + w / 2;
      let y = -offset + j * (w + margin) + w / 2;
      let m = new Mover(createVector(x, y), random(360), w);
      movers.push(m);
    }
  }

  textureGraphics = createGraphics(width, height);
  textureGraphics.colorMode(HSB, 360, 100, 100, 100);
  textureGraphics.noStroke();
  textureGraphics.fill(0, 0, 100, 1);

  for (let i = 0; i < textureGraphics.width * textureGraphics.height * 5 / 100; i++) {
    textureGraphics.ellipse(
      random(textureGraphics.width),
      random(textureGraphics.height),
      random(3),
      random(3)
    );
  }


  background(0, 0, 10);
}

function draw() {
  blendMode(BLEND);
  background(0, 0, 10, 5);
  blendMode(ADD);
  for (let m of movers) {
    m.update();
    m.display();
  }

  image(textureGraphics, 0, 0);
  //noLoop();
}

class Mover {
  constructor(center, angle, r) {
    this.pos = center;
    this.origin_angle = int(random(4)) * 360 / 4;
    this.minAngle = 0;
    this.maxAngle = 90;
    this.angle = angle;
    this.r = r;
    this.speed = 1.5;
    //int(random(1, 10)) / 3;
    this.sep = int(random(3, 5)) * 3;
    this.freq = 5;
  }
  update() {

  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.origin_angle);
    translate(-this.r / 2, -this.r / 2);
    ellipse(0, 0, this.r / 25);
    for (let r = this.r; r > 0; r -= this.r / this.sep) {
      let angle = constrain(sin((this.angle + r * 5) / this.freq + frameCount * this.speed) * 45 + 45, 0, 90)
      let pAngle = constrain(sin((this.angle + r * 5 - (this.r / this.sep) * 5) / this.freq + frameCount * this.speed) * 45 + 45, 0, 90)
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      let x2 = cos(pAngle) * (r - this.r / this.sep);
      let y2 = sin(pAngle) * (r - this.r / this.sep);
      x2 = constrain(x2, 0, this.r);
      y2 = constrain(y2, 0, this.r);
      stroke(0, 0, 100);
      noFill();
      line(x, y, x2, y2);
      noStroke();
      fill(0, 0, 100);
      if (r == this.r) {
        ellipse(x, y, this.r / 25);
      } else {
        ellipse(x, y, this.r / 50);
      }
    }
    pop();
  }

}