let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);
  texture.stroke(0, 0, 0, 5);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    texture.strokeWeight(random(3));
    texture.point(random(width), random(height));
  }
}

function draw() {
  background(0, 0, 90);
  push();
  translate(width / 2, height / 2);
  let sep = 3;
  let angleOffset = 30;
  let d = width / 2;
  for (let i = 0; i < sep; i++) {
    let startAngle = i * 360 / sep;
    let endAngle = (i + 1) * 360 / sep - angleOffset;
    // arc(0, 0, d, d, startAngle, endAngle);
    noFill();
    stroke(0, 0, 0);
    strokeWeight(d / 15);
    beginShape();
    for (let angle = startAngle; angle < endAngle; angle++) {
      let r = d / 2 * map(sin(angle * sep * 2), -1, 1, 0.8, 1.2);
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      vertex(x, y);
    }
    endShape();
    let rr = d / 2 * map(sin(endAngle * sep * 2), -1, 1, 0.8, 1.2);
    let cx = cos(endAngle) * rr;
    let cy = sin(endAngle) * rr;
    let pr = d / 2 * map(sin((endAngle - 1) * sep * 2), -1, 1, 0.8, 1.2);
    let px = cos(endAngle - 1) * pr;
    let py = sin(endAngle - 1) * pr;
    let pAngle = atan2(cy - py, cx - px);
    fill(0, 0, 0);
    arc(cx, cy, d / 5, d / 5, pAngle + 45, pAngle + 315, PIE);

    let ex = cx + cos(pAngle - 90) * d / 20;
    let ey = cy + sin(pAngle - 90) * d / 20;
    noStroke();

    fill(0, 0, 100);
    circle(ex, ey, d / 15);
    fill(0, 0, 0);
    circle(ex, ey, d / 30);
  }
  pop();
  image(texture, 0, 0);
}