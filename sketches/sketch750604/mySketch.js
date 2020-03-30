// reference(Python) by @tatesuke: https://qiita.com/tatesuke/items/59133758ec25146766c3
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  frameRate(1.5);
}
function draw(){
  let offset = width / 10;
  background(0,0,20);
  noFill();
  let points = [];
  stroke(0, 100, 100);
  fill(0, 10, 100);
  beginShape();
  for (let i = 0; i < 3; i++) {
    let x = random(offset, width - offset);
    let y = random(offset, height - offset);
    vertex(x, y);
    points.push(createVector(x, y));
  }
  endShape(CLOSE);

  let obj = getCircumcenter(points);
  stroke(200, 100, 100);
  for (let p of points) {
    line(p.x, p.y, obj.x, obj.y);
  }
  noStroke();
  fill(0, 100, 100);
  circle(obj.x, obj.y, 10);
  noFill();
  stroke(300, 100, 100);
  circle(obj.x, obj.y, obj.r * 2);
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