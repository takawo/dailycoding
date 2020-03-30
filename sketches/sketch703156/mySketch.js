function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  let ratio = 0.95;
  let cx = width / 2;
  let cy = height / 2;

  let rMax = width / 2 * ratio;
  let angle = 0;
  let sep = int(random(1, 4)) * int(random(3, 5));
  let angleStep;
  push();
  translate(cx, cy);
  // ellipse(0, 0, rMax, rMax);
  while (angle < 360) {
    let r = rMax / int(random(1, 3));
    let angleStep = 360 * int(random(1, sep/3)) / sep;
    if (angleStep + angle > 360) {
      angleStep = 360 - angle;
    }
    arc(0, 0, r, r, angle, angle + angleStep, PIE);
    angle += angleStep;
  }
  pop();
  noLoop();
}