function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 30,10);
  push();
  translate(width / 2, height / 2);

  let w = width*2;
  let h = height*2;

  let num = 20;
  for (let i = 0; i < num; i++) {
    let x = cos(frameCount * 5 + i * 10) * w / 15;
    let y = sin(frameCount * 3 + i * 10) * w / 15;
    let r = map(i, 0, num, w / 100, w);
    let c = color((frameCount*5 + i * 360 / num)%360, 80, 100);
    drawRectWithHole(x, y, w, h, r, c);
  }
  pop();
}

function drawRectWithHole(_x, _y, _w, _h, _r, _c) {
  push();
  translate(_x, _y);
  fill(_c);
  stroke(0,0,100);
  beginShape();
  vertex(-_w / 2, -_h / 2);
  vertex(_w / 2, -_h / 2);
  vertex(_w / 2, _h / 2);
  vertex(-_w / 2, _h / 2);

  beginContour();
  for (let angle = 0; angle > -360; angle -= 1) {
    let x = cos(angle) * _r / 2;
    let y = sin(angle) * _r / 2;
    vertex(x, y);
  }
  endContour();
  endShape(CLOSE);
  pop();
}