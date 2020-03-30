const min_margin = 0.2;
const offset = 40;
const margin = 0;
let cells = 5;
const cols = cells;
const rows = cells;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  let w = (width - offset * 2 - margin * (cols - 1)) / cols;
  let h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w) + w / 2;
      let y = map(j, 0, rows - 1, offset, width - offset - h) + h / 2;
      push();
      translate(x, y);
      rotate(int(random(4)) * 90);
      let points = [];
      points.push(createVector(-w / 2, -h / 2));
      points.push(createVector(w / 2, -h / 2));
      points.push(createVector(w / 2, h / 2));
      points.push(createVector(-w / 2, h / 2));
      drawSeparatedRect(points, 3);
      pop();
    }
  }
  noLoop();

}


function drawSeparatedRect(_points, _depth) {

  if (_depth < 0) {
    return;
  }
  let n = _depth % _points.length;
  let m = int(n + _points.length / 2) % _points.length;
  let n_f = random(min_margin, 1 - min_margin);
  let m_f = random(min_margin, 1 - min_margin);
  let n_next = (n + 1) % _points.length;
  let m_next = (m + 1) % _points.length;
  let p3 = p5.Vector.lerp(_points[n], _points[n_next], n_f);
  let p4 = p5.Vector.lerp(_points[m], _points[m_next], m_f);
  stroke(220);
  strokeWeight(3);
  strokeJoin(ROUND);
  //fill(0,0,100);
  quad(p3.x, p3.y, p4.x, p4.y, _points[m_next].x, _points[m_next].y, _points[n].x, _points[n].y);
  quad(p4.x, p4.y, p3.x, p3.y, _points[n_next].x, _points[n_next].y, _points[m].x, _points[m].y);

  let pointsA = [p3, p4, _points[m_next], _points[n]];
  drawSeparatedRect(pointsA, _depth - 1);
  let pointsB = [p4, p3, _points[n_next], _points[m]];
  drawSeparatedRect(pointsB, _depth - 1);
}