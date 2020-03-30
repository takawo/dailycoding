const rows = 5;
const cols = 5;
const offset = 40;
const margin = offset / 2;
let s = 4;

let r;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  background(0,0,10);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {

      let w = (width - offset * 2 - margin * (cols - 1)) / cols;
      let h = (height - offset * 2 - margin * (rows - 1)) / rows;
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      drawLinesInShape(x, y, w, h, j* cols + i);
    }

  }
}

function drawLinesInShape(_x, _y, _w, _h, _count) {
  let points = [];
  let num = 3;
  let r = _w / 2 * 1.52;
  push();
  translate(_x + _w / 2, _y + _h / 2);
  if (_count % 2 == 0) {
    translate(0, r * 1 / s);
    rotate(30);
  } else {
    translate(0, -r * 1 / s);
    rotate(180 + 30);
  }
  for (let i = 0; i < num; i++) {
    let angle = i * 360 / num;
    let x1 = cos(angle) * r;
    let y1 = sin(angle) * r;
    let p1 = createVector(x1, y1);
    let sep_points = int(random(10, 30))*int(random(3,8));
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
  let step_points = int(random(2, 5)) + random(1, 10) / 10;
  for (let c = 0; c < points.length; c++) {
    let m = int(c + points.length / step_points) % points.length;
    let p1 = points[c];
    let p2 = points[m];
    stroke(0,0,100,10);
    line(p1.x, p1.y, p2.x, p2.y);
  }


  pop();
}