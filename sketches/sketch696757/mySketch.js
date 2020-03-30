function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  smooth();
}

function draw() {
  background(220);
  let x = width / 2;
  let y = height / 2;
  const r = 300;

  drawSeparatedCircle(x, y, r);
  noLoop();
}

function drawSeparatedCircle(_x, _y, _r) {
  stroke(0, 0, 0);
  noFill();
  let _rAngle = random(360);
  let _n = random(5, 20);
  push();
  translate(_x, _y);
  drawSeparatedCircleHalf(_rAngle, _r, _n, "bottom");
  drawSeparatedCircleHalf(_rAngle,_r,_n, "top");
  pop();
}

function drawSeparatedCircleHalf(_rAngle, _r, _n, _str) {
  let step;
  let prevAngle = atan2(0, -_r);
  for (let x = -_r; x < _r; x += step) {
    step = int(random(1, 3)) * _r / 10 * 2;
    let nextX = x + step;
    beginShape();
    for (let x0 = x; x0 < nextX; x0 += .01) {
      let angle = x0 + _rAngle;
      let y0 = sin(angle) * _r / _n;
      let d = dist(x0, y0, 0, 0);
      let altAngle = atan2(y0, x0);
      if (d > _r) {
        let altX = cos(altAngle) * _r;
        let altY = sin(altAngle) * _r;
      } else {
        vertex(x0, y0);
      }
    }
    endShape();
    let nextY = sqrt(sq(_r) - sq(nextX));
    if (isNaN(nextY)) {
      nextY = 0;
    }
    let currentAngle;
    if (_str == "bottom") {
      currentAngle = atan2(nextY, nextX);
      for (let angle = currentAngle; angle < prevAngle; angle += .1) {
        let x = cos(angle) * _r;
        let y = sin(angle) * _r;
        vertex(x, y);
      }
      endShape(CLOSE);
    }else{
    if (_str == "top") {
      currentAngle = 360 + atan2(-nextY, nextX);
      for (let angle = currentAngle; angle > prevAngle; angle -= .1) {
        let x = cos(angle) * _r;
        let y = sin(angle) * _r;
        vertex(x, y);
      }
      endShape(CLOSE);
    }
    
    }
    prevAngle = currentAngle;
  }


}