//inspired by @414c45's  awesome artwork.
//https://twitter.com/414c45/status/1115548244359176192

let offset = 40;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  let p1 = createVector(offset, offset);
  let p2 = createVector(width - offset, height - offset);
  drawLineWithCircle(p1,p2);

  let p3 = createVector(width - offset, offset);
  let p4 = createVector(offset, height - offset);
  drawLineWithCircle(p3,p4);

  noLoop();
}

function drawLineWithCircle(p1,p2){
  let angle = atan2(p2.y - p1.y, p2.x - p1.x);
  let distance = p5.Vector.dist(p1, p2);
  push();
  translate(p1.x, p1.y);
  push();
  rotate(angle);
  for (let n = 0; n < distance; n+=20) {
    let x0 = n;
    let y0 = 0;
    let d = constrain(int(sqrt(random(random())) * 10) * 7,0,offset*2);
    let x = x0 + cos(90) * d / 2;
    let y = y0 + sin(90) * d / 2;
    ellipse(x, y, d);
  }
  pop();
  push();
  rotate(angle);
  for (let n = 0; n < distance; n+=20) {
    let x0 = n;
    let y0 = 0;
    let d = constrain(int(sqrt(random(random())) * 10) * 7,0,offset*2);
    let x = x0 - cos(90) * d / 2;
    let y = y0 - sin(90) * d / 2;
    ellipse(x, y, d);
  }
  pop();

  pop();

}