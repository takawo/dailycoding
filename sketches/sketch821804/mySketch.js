let w;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  w = sqrt(sq(width) + sq(height));
}

function draw() {
  background(20);

  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360 / 8);
  separateGrid(-w / 2, -w / 2, w);
  pop();
  //image(graphics, 0, 0);
  frameRate(1);
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        if (random(100) > 50) {
          let scaleFactor = w / (int(random(5, 18)) * 5);
          drawFibonacciArc(i,j,w, 0, 90, scaleFactor);
        } else {
          separateRect(i,j,w,w);
        }
      }
    }
  }
}

function drawFibonacciArc(ox, oy, rMax, angleMin, angleMax, scaleFactor) {
  push();
  translate(ox + rMax / 2, oy + rMax / 2);
  rotate(int(random(4)) * 360 / 4);
  translate(-rMax / 2, -rMax / 2);
  noStroke();
  arc(0, 0, rMax * 2, rMax * 2, 0, 90);
  let i = 0;
  let phi = (sqrt(5) + 1) / 2;
  let x = 0;
  let y = 0;
  while (dist(x, y, 0, 0) < rMax - scaleFactor / 2) {
    let angle = i * 360 / phi;
    let r = sqrt(i) * scaleFactor;
    x = cos(angle) * r;
    y = sin(angle) * r;
    strokeWeight(scaleFactor);
    stroke(0, 0, 20);
    let angle2 = atan2(y, x);
    if (angle2 > 0 && angle2 < 90) {
      point(x, y);
    }
    i++;
  }
  pop();
}

function separateRect(_x, _y, w, h) {
  push();
  translate(_x + w / 2, _y + h / 2);
  rotate(int(random(4)) * 360 / 4);
  let y = -h / 2;
  while (y < h / 2) {
    let yStep = h / int(random(1, 25));
    let hStep = yStep * int(random(1, 4));
    if (y + hStep > h / 2) {
      hStep = h / 2 - y;
    }
    let x = -w / 2;
    while (x < w / 2) {
      let xStep = w / int(random(1, 25));
      let wStep = xStep * int(random(1, 4));
      if (x + wStep > w / 2) {
        wStep = w / 2 - x;
      }
      strokeWeight(0.1);
      fill(int(random(5)) * 255 / 5);
      rect(x, y, wStep, hStep);
      x += wStep;
    }
    y += hStep;
  }
  pop();
}