let blobs = [];
let w;
let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  w = sqrt(width * width + height * height);

  let offset = width / 10;
  separateGrid(-offset, -offset, w + offset * 2, 10);
  background(0, 0, 100);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);
	texture.stroke(0,0,0,30);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let r = (1 - random(random())) * sqrt(width * width + height * height) / 2;
    let angle = random(360);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    texture.point(x, y);
  }
}

function draw() {
  // blendMode(BLEND);
	randomSeed(100);
  background(0, 0, 90);
	image(texture,0,0);
  // blendMode(BURN);
  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360/8);
  translate(-w / 2, -w / 2);
  for (let b of blobs) {
    b.update();
    b.draw();
  }
  pop();
	noLoop();
}

function separateGrid(x, y, d, minW) {
  let sepNum = int(random(1, 4));
  let _w = d / sepNum;
  for (let i = x; i < x + d - 1; i += _w) {
    for (let j = y; j < y + d - 1; j += _w) {
      if (random(100) < 90 && _w > minW) {
        separateGrid(i, j, _w, minW);
      } else {
        let b = new Blob(i + _w / 2, j + _w / 2, _w * 1.3);
        blobs.push(b);
      }
    }
  }
}

class Blob {
  constructor(x, y, d) {
    this.pos = createVector(x, y);
    let sep = int(random(3, 10));
    this.angleStep = 360 / sep;
    this.d = d / 2;
    this.freq = random(5)
      * (random(100) > 50 ? -1 : 1);
    this.t = 0;
    this.tStep = random(random(random())) * 1 / 10;
  }
  update() {
    this.t += this.tStep;
  }
  draw() {
    noStroke();
  drawingContext.shadowColor = color(0, 0,10);
  drawingContext.shadowBlur = this.d/2;
    fill(0, 0, 10);
    beginShape();
    for (let angle = 0; angle <= 360 + 2 * this.angleStep; angle += this.angleStep) {
      let r1, r2;
      r1 = map(cos(angle), -1, 1, 0, 2);
      r2 = map(sin(angle), -1, 1, 0, 2);
      let r = this.d * noise(this.freq * r1, this.freq * r2, this.t);
      let x = this.pos.x + r * cos(angle);
      let y = this.pos.y + r * sin(angle);
      curveVertex(x, y);
    }
    endShape();
  }
}