let bg;
let pallete = ["#B82726", "#C2BC3A", "#444949", "#A1ABAD", "#F20407", "#E8E8E8","#061916","#005432"];
let min_margin;
let sw;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  //blendMode(ADD);
  background(0, 0, 10);
  min_margin = random(1 / 5 - 1 / 8, 1 / 2 - 1 / 10);

  strokeCap(SQUARE);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  let percent = 15 / 100;
  for (let i = 0; i < width * height * percent; i++) {
    bg.stroke(0, 0, 100, 10);
    bg.point(random(bg.width), random(bg.height));
  }
  let w = sqrt(sq(width) + sq(height));
  push();
  translate(width / 2, height / 2);
  rotate(int(random(4)) * 360 / 4 + 45);
  separateGrid(-w / 2, -w / 2, w);
  pop();
  image(bg, 0, 0);
}


function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        // drawArcLines(i, j, w);
        let points = [];
        let offset = w/20;
        let ww = w - offset;
        points.push(createVector(i+offset, j+offset));
        points.push(createVector(i+ww, j+offset));
        points.push(createVector(i+ww, j+ww));
        points.push(createVector(i+offset, j +ww));
        //drawRectShadow(-w / 2, -h / 2, w, h);
        drawSeparatedRect(points, int(random(1, 4)));
      }
    }
  }
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
  stroke(0, 0, 100);
  let sw = map(p5.Vector.dist(p3,p4),0,width,.1,25);
  strokeWeight(sw);
  //strokeJoin(ROUND);
  //fill(0,0,100);
  fill(pallete[int(abs(p4.x + p4.y) * 333) % pallete.length]);
  quad(p3.x, p3.y, p4.x, p4.y, _points[m_next].x, _points[m_next].y, _points[n].x, _points[n].y);
  fill(pallete[int(abs(p3.x + p3.y) * 3) % pallete.length]);
  quad(p4.x, p4.y, p3.x, p3.y, _points[n_next].x, _points[n_next].y, _points[m].x, _points[m].y);

  let pointsA = [p3, p4, _points[m_next], _points[n]];
  drawSeparatedRect(pointsA, _depth - 1);
  let pointsB = [p4, p3, _points[n_next], _points[m]];
  drawSeparatedRect(pointsB, _depth - 1);
}