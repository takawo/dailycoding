// noprotect
let s = 1;
let pallete = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];
let graphics;
let prevC = -1;
let ratio = 1;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 20);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  s = int(random(3, 10)) * 15;
  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360 / 8);
  let count = 0;
  for (let i = -width / 2; i < width / 2; i += s) {
    for (let j = -height / 2; j < height / 2; j += s) {
      let p1 = createVector(0 - j + 2 * i, 0 + sqrt(3) * j);
      let p2 = createVector(s - j + 2 * i, s * sqrt(3) + sqrt(3) * j);
      let p3 = createVector(-s - j + 2 * i, s * sqrt(3) + sqrt(3) * j);
      let points = [p1, p2, p3];
      let center = getCircumcenter(points);
      let r = 1 * center.r;
      push();
      translate(center.x, center.y);
      rotate(30);
      let rMax = r * ratio;
      let a = random(pallete) + "20";
      let colors = [];
      drawTriangleWithLines(0, 0, center.r);
      pop();
    }
  }
  count++;
  for (let m = -width / 2; m < width / 2; m += s) {
    for (let n = -height / 2; n < height / 2; n += s) {
      let p4 = createVector(0 - m + 2 * n, 0 + sqrt(3) * m);
      let p5 = createVector(2 * s - m + 2 * n, 0 + sqrt(3) * m);
      let p6 = createVector(s - m + 2 * n, s * sqrt(3) + sqrt(3) * m);
      let points = [p4, p5, p6];
      let center = getCircumcenter(points);
      let r = 1 * center.r;
      push();
      translate(center.x, center.y);
      rotate(30 + 180);
      let rMax = r * ratio;
      let b = random(pallete) + "20";
      drawTriangleWithLines(0, 0, center.r);
      pop();
    }
  }
  pop();
  image(graphics, 0, 0);
  noLoop();
}

function drawTriangleWithLines(_x, _y, _w) {
  push();
  translate(_x, _y);
  let step = int(random(5,10));
  for (let i = 0; i < step; i++) {
    colors = pallete.concat();
    let r = map(i, 0, step, _w, _w / 2 * 1/step);
    let points = [];
    for (let angle = 0; angle < 360; angle += 360 / 3) {
      let colorNum = int(random(colors.length));
      let color = colors[colorNum];
      colors.splice(colorNum, 1);
      let p = new Point(cos(angle) * r, sin(angle) * r, color);
      p.display();
      points.push(p);
    }
    for (let i = 0; i < points.length; i++) {
      let current = points[i];
      let next = points[(i + 1) % points.length];
      Point.drawLine(current, next);
    }
  }
  pop();
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

class Point {
  constructor(x, y, c) {
    this.pos = createVector(x, y);
    this.color = color(c);
    this.size = 2;
  }
  display() {
    fill(this.color);
    noStroke();
    circle(this.pos.x, this.pos.y, 2);
  }
  static drawLine(p1, p2) {
    let step = 1 / 100;
    for (let i = 0; i < 1 - step; i += step) {
      let mp1 = p5.Vector.lerp(p1.pos, p2.pos, i);
      let mp2 = p5.Vector.lerp(p1.pos, p2.pos, i + step);
      colorMode(RGB);
      let mc = lerpColor(p1.color, p2.color, i);
      colorMode(HSB, 360, 100, 100, 100);
      stroke(mc);
      strokeWeight(p1.size);
      line(mp1.x, mp1.y, mp2.x, mp2.y);
    }
  }
}