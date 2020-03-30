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
  background(0, 0, 10, 10);
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
    this.minAngle = -180;
    this.maxAngle = 180;
    this.angle = angle;
    this.r = r;
    this.speed = 1.5;
    //int(random(1, 10)) / 3;
    this.sep = 40;int(random(3, 5)) * 100;
    this.freq = .02;random(1,2);
  }
  update() {

  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.origin_angle);
    translate(-this.r / 2, -this.r / 2);
    //ellipse(0, 0, this.r / 25);
      stroke(0, 0, 100);
      strokeCap(ROUND);
      strokeWeight(this.r/100);
    let i = 0;
    for (let r = this.r*1.5; r > 0; r -= this.r / this.sep) {
      let angle = constrain(sin((this.angle + i * 5) / this.freq + frameCount * this.speed) * 45 + 45, 0, 90)
      let pAngle = constrain(sin((this.angle + i * 5 - (this.r / this.sep) * 5) / this.freq + frameCount * this.speed) * 45 + 45, 0, 90)
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      let x2 = cos(pAngle) * (r - this.r / this.sep);
      let y2 = sin(pAngle) * (r - this.r / this.sep);
      x = constrain(x, 0, this.r);
      y = constrain(y, 0, this.r);
      x2 = constrain(x2, 0, this.r);
      y2 = constrain(y2, 0, this.r);
      // if(x !=0 && x!== this.r  && y !=0 && y != this.r){
      line(x, y, x2, y2);
      // }
      // noStroke();
      // fill(0, 0, 100);
      // if (r == this.r*1.5) {
      //   //ellipse(x, y, this.r / 25);
      // } else {
      //   //ellipse(x, y, this.r / 50);
      // }
      i+=0.01;
    }
    pop();
  }

}