function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  background(40);

  let cells = int(random(5, 10));
  let cols = cells;
  let rows = cells;
  let offset = width / 10;
  let margin = 0;//offset / 5;

  let cellW = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellW + margin);
      let dMax = cellW;
      let scaleFactor = dMax / (int(random(5,18))*5);
      drawFibonacciArc(x, y, dMax, 0, 90,scaleFactor);
    }
  }


}

function drawFibonacciArc(ox, oy, rMax, angleMin, angleMax,scaleFactor) {
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
  while (dist(x, y, 0, 0) < rMax-scaleFactor/2) {
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