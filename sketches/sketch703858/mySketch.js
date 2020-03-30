function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 90);

  let cx = width / 2;
  let cy = height / 2;

  let r = width / 2 * 0.85;
  let offset = r / 40;
  push();
  translate(cx, cy);
  rotate(45);
  let num = int(random(5, 10));
  let w = (r * 2) / num;
  let m = w / 2;
  w = (w * num - m * (num - 1)) / num;

  for (let x = -r; x <= r; x += w + m) {
    let y = sqrt(sq(r) - sq(x));

    fill(0, 0, 20);
    beginShape();
    vertex(x, 0);
    vertex(x, y);
    let angle = atan2(y, x);
    let x2 = x;
    let y2 = y;
    let distance = dist(x, 0, x2, 0);
    while (distance < w - .1) {
      angle -= 1;
      x2 = cos(angle) * r;
      y2 = sin(angle) * r;
      vertex(x2, y2);
      distance = dist(x, 0, x2, 0);
    }
    let x3 = x2;
    let y3 = -y2;
    let x4 = x3;
    let y4 = y3;
    vertex(x3, y3);
    let distance2 = dist(x, 0, x3, 0);
    let angle2 = atan2(y3, x3);
    while (distance2 > .1) {
      angle2 -= 1;
      x4 = cos(angle2) * r;
      y4 = sin(angle2) * r;
      vertex(x4, y4);
      distance2 = dist(x, 0, x4, 0);
    }

    endShape(CLOSE);
  }
  pop();
  noLoop();
}