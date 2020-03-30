let s;
let pallete = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];
let graphics;
let prevC = -1;
let ratio = 1;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(ADD);
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
      drawLinesInShape(0, 0, center.r, center.r,a);

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
      drawLinesInShape(0, 0, center.r, center.r,b);
      pop();
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

function recursiveTriangles(arr, depth, max, rMax = width / 2) {
  noStroke();
  if (depth > max) {
    let p1 = arr[0];
    let p2 = arr[1];
    let p3 = arr[2];
    let p4 = p5.Vector.lerp(p1, p2, 0.5);
    let centroid = p5.Vector.lerp(p3, p4, 2 / 3);
    let num = int(random(2, 5)) * 10;
    let c1 = color(random(pallete));
    let c2 = c1;
    while (c1 == c2) {
      c2 = color(random(pallete));
    }
    for (let i = 1; i > 0; i -= 1 / num) {
      colorMode(RGB, 255, 255, 255, 255);
      fill(lerpColor(c1, c2, i));
      beginShape();
      for (let pp of arr) {
        let p = p5.Vector.lerp(centroid, pp, i);
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
      colorMode(HSB, 360, 100, 100, 100);
    }
    return;
  }
  if (depth == 0) {
    let r = rMax;
    let startAngle = 0; //int(random(12)) * 360/12;
    for (let angle = startAngle; angle < 360 + startAngle; angle += 360 / 3) {
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      arr.push(createVector(x, y));
    }
    noStroke();
  }
  let target = int(random(arr.length));
  let next = (target + 1) % arr.length;
  let current = p5.Vector.lerp(arr[target], arr[next], 0.5);
  triangle(arr[target].x, arr[target].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  recursiveTriangles([arr[target], arr[(next + 1) % arr.length], current], depth + 1, max);
  triangle(arr[next].x, arr[next].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  recursiveTriangles([arr[next], arr[(next + 1) % arr.length], current], depth + 1, max);
}

function drawLinesInShape(_x, _y, _w, _h, _color = color(0, 0, 100, 5)) {
  let points = [];
  let num = 3;
  let r = _w * ratio;
  push();
  for (let i = 0; i < num; i++) {
    let angle = i * 360 / num;
    let x1 = cos(angle) * r;
    let y1 = sin(angle) * r;
    let p1 = createVector(x1, y1);
    let sep_points = int(random(10, 30)) * int(random(3, 8));
    for (let j = i; j < i + 1; j += 1 / sep_points) {
      let n = int(i);
      let m = int(i + 1);
      let f = j % 1;
      let angle2 = m * 360 / num;
      let x2 = cos(angle2) * r;
      let y2 = sin(angle2) * r;
      let p2 = createVector(x2, y2);
      let p3 = p5.Vector.lerp(p1, p2, f);
      points.push(p3);
    }
  }
  let step_points = int(random(2, 5)) + random(1, 10) / 30;
  for (let c = 0; c < points.length; c++) {
    let m = int(c + points.length / step_points) % points.length;
    let p1 = points[c];
    let p2 = points[m];
    stroke(_color);
    line(p1.x, p1.y, p2.x, p2.y);
  }
  pop();
}