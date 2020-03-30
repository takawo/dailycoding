function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(240);
  noFill();
  lineArc(100, 100, 800 - 100, 800 - 100);
  lineArc(100, 100, 800 - 100, 800 - 100);
  noLoop();
}

function lineArc(x1, y1, x2, y2) {
  let d = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x1, y1);
  rotate(angle);
  let n = 0;
  let dd = 0;
  while (dd < d) {
    let ddPlus = d / int(random(3, 20));
    if (dd + ddPlus > d) ddPlus = d - dd;
    let ax = dd + ddPlus / 2;
    if (n % 2 == 0) {
      arc(ax, 0, ddPlus, ddPlus, 0, 180);
    } else {
      arc(ax, 0, ddPlus, ddPlus, 0 + 180, 180 + 180);
    }
    n++;
    dd += ddPlus;
  }
  pop();
}