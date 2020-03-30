const min_margin = 0.4;
const offset = 40;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);

  let w = width - offset * 2;
  let h = height - offset * 2;
  push();
  translate(width / 2, height / 2);
  let points = [];
  points.push(createVector(-w / 2, -h / 2));
  points.push(createVector(w / 2, -h / 2));
  points.push(createVector(w / 2, h / 2));
  points.push(createVector(-w / 2, h / 2));
  drawSeparatedRect(points,4);
  pop();
  noLoop();
}


function drawSeparatedRect(_points, _depth) {
  if (_depth < 0) {
    return;
  }
  let n = int(random(_points.length / 2));
  let m = int(n + _points.length / 2);
  let n_f = random(min_margin, 1 - min_margin);
  let m_f = random(min_margin, 1 - min_margin);
  let n_next = (n + 1) % _points.length;
  let m_next = (m + 1) % _points.length;
  let p3 = p5.Vector.lerp(_points[n], _points[n_next], n_f);
  let p4 = p5.Vector.lerp(_points[m], _points[m_next], m_f);
  stroke(220);
  strokeWeight(7);
  strokeJoin(ROUND);
  //fill(0,0,100);
  quad(p3.x, p3.y, p4.x, p4.y, _points[m_next].x, _points[m_next].y, _points[n].x, _points[n].y);
  quad(p4.x, p4.y, p3.x, p3.y, _points[n_next].x, _points[n_next].y, _points[m].x, _points[m].y);

  let pointsA = [p3, p4, _points[m_next], _points[n]];
  drawSeparatedRect(pointsA, _depth - 1);
  let pointsB = [p4, p3, _points[n_next], _points[m]];
  drawSeparatedRect(pointsB, _depth - 1);
}