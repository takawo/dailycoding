let point, target;
let angle, tangle;
let offset;
let spdx, spdy, spdangle, spdw, spdh;
let springRatio = 0.25;
let w, h, tw, th;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  offset = width / 10;
  let x = width/2;
  let y = height/2;
  point = createVector(x, y);
  let dAngle = random(8) * 360 / 8;
  let x2 = point.x + cos(dAngle) * width / 8;
  let y2 = point.y + sin(dAngle) * height / 8;
  target = createVector(x2, y2);
  angle = int(random(8)) * 360 / 8;
  tangle = angle + int(random(-2, 2)) * 45;
  spdx = 0;
  spdy = 0;
  spdangle = 0;
  spdw = 0;
  spdh = 0;
  w = int(random(1, 4)) * 25;
  h = int(random(1, 4)) * 25;
  tw = int(random(1, 4)) * 25;
  th = int(random(1, 4)) * 25;
  background(0, 0, 80);
}

function draw() {
  //background(0, 0, 80, 30);
  rectMode(CENTER);

  push();
  translate(point.x, point.y);
  rotate(angle);
  rect(0, 0, w, h);
  pop();

  spdw = lerp(spdw, (tw - w) * springRatio, springRatio / 2);
  w += spdw;
  spdh = lerp(spdh, (th - h) * springRatio, springRatio / 2);
  h += spdh;

  spdangle = lerp(spdangle, (tangle - angle) * springRatio, springRatio / 2);
  angle += spdangle;

  spdx = lerp(spdx, (target.x - point.x) * springRatio, springRatio / 2);
  point.x += spdx;
  spdy = lerp(spdy, (target.y - point.y) * springRatio, springRatio / 2);
  point.y += spdy;
  let distance = p5.Vector.dist(point, target);

  if (distance < 0.01) {
    let dAngle = random(8) * 360 / 8;
    let x2 = point.x + cos(dAngle) * width / 8;
    let y2 = point.y + sin(dAngle) * height / 8;
    target = createVector(x2, y2);
    tangle = angle + int(random(-2, 2)) * 45;
    tw = int(random(1, 4)) * 25;
    th = int(random(1, 4)) * 25;
  }
}