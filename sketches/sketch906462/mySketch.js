//reference: okazz's awesome distortion!!
//https://www.openprocessing.org/sketch/843340

let w;
let pallete = ["#1132B2", "#0E1057", "#BAE7F1", "#24AFC2", "#F13736", "#4A3749", "#BC8968", "#050110"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  w = sqrt(sq(width) + sq(height));
}

function draw() {
  background(0, 0, 90);

  push();
  translate(width / 2, height / 2);
  rotate(45);
  translate(-w, -w);
  drawPattern(0, 0, w * 2);
  pop();
  noLoop();
}

function drawPattern(x, y, size) {
  let step = 30;
  let d = size / step;
  for (let j = 0; j < step; j++) {
    for (let i = 0; i < step; i++) {
      let x = i * d + d / 2;
      let y = j * d + d / 2;
      let num = int(random(1,5));
      for(let k = num; k > 0; k--){
        drawCircle(x, y, d * k/num);
      }
    }
  }
}

function res(x, y) {
  let p = createVector(x, y);
  let scl = 1/10000;
  let angle = noise(p.x * scl, p.y * scl) * 360 * 20;
  let len = noise(p.x * scl, p.y * scl) * width / 5;
  p.x += cos(angle) * len;
  p.y += sin(angle) * len;
  return p;
}

function drawCircle(x, y, d) {
  let r = d * 0.5;
  fill(random(pallete));
  noStroke();
  beginShape();
  for (let i = 0; i < 360; i += 1) {
    let xx = x + r * cos(i);
    let yy = y + r * sin(i);
    let p = res(xx, yy);
    curveVertex(p.x, p.y);
  }
  endShape(CLOSE);
}