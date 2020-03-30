let s;
let pallete = ["#EB2FEA", "#EB2FEA", "#2D473F", "#FBB205", "#193CE6", "#15121C", "#E2E2E6", "#B2B1B8"];
let graphics;
let prevC = -1;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  s = int(random(3, 10)) * 30;

  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360/8);
  for (let i = -width / 2; i < width / 2; i += s) {
    for (let j = -height / 2; j < height / 2; j += s) {
      let p1 = createVector(0 - j + 2 * i, 0 + sqrt(3) * j);
      let p2 = createVector(s - j + 2 * i, s * sqrt(3) + sqrt(3) * j);
      let p3 = createVector(-s - j + 2 * i, s * sqrt(3) + sqrt(3) * j);
      let points = [p1, p2, p3];
      drawConcentricTriangle(points);
    }
  }
  for (let m = -width / 2; m < width / 2; m += s) {
    for (let n = -height / 2; n < height / 2; n += s) {
      let p4 = createVector(0 - m + 2 * n, 0 + sqrt(3) * m);
      let p5 = createVector(2 * s - m + 2 * n, 0 + sqrt(3) * m);
      let p6 = createVector(s - m + 2 * n, s * sqrt(3) + sqrt(3) * m);
      let points = [p4, p5, p6];
      drawConcentricTriangle(points);
    }
  }
  pop();
  image(graphics, 0, 0);
  noLoop();
}

function drawConcentricTriangle(points) {
  let center = getCircumcenter(points);
  let cp = createVector(center.x, center.y);
  let step = int(random(2, 10));
  for (let a = 1; a >= 0; a -= 1 / step) {
    let c = prevC;
    while (c == prevC) {
      c = random(pallete);
    }
    prevC = c;
    noStroke();
    fill(c);
    beginShape();
    for (let p of points) {
      let x = lerp(cp.x, p.x, a);
      let y = lerp(cp.y, p.y, a);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

}


function getCircumcenter(points) {
  let a = points[0].x;
  let b = points[0].y;
  let c = points[1].x;
  let d = points[1].y;
  let e = points[2].x;
  let f = points[2].y;

  let aa = a * a;
  let bb = b * b;
  let cc = c * c;
  let dd = d * d;
  let ee = e * e;
  let ff = f * f;

  let py = ((e - a) * (aa + bb - cc - dd) - (c - a) * (aa + bb - ee - ff)) / (2 * (e - a) * (b - d) - 2 * (c - a) * (b - f))

  let px = ((c - a) == 0) ? (2 * (b - d) * py - aa - bb + cc + dd) / (2 * (c - a)) : (2 * (b - f) * py - aa - bb + ee + ff) / (2 * (e - a));

  pr = sqrt(sq(px - a) + sq(py - b));
  return {
    x: int(px),
    y: int(py),
    r: int(pr)
  };
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}