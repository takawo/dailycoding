const num = 4;
const r = 400;
let allPoints = [];

function setup() {
  createCanvas(800, 800);
	colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
	//blendMode(ADD);
  noLoop();
}

function draw() {
  background(0,0,0);
  push();
  translate(width / 2, height / 2);
  translate(0, r / 5);
  rotate(30);
  let points = [];
  for (let angle = 0; angle < 360; angle += 360 / num) {
    let x = cos(angle) * r;
    let y = sin(angle) * r;
    points.push(createVector(x, y));
    allPoints.push(createVector(x, y));
  }
  drawRecursiveTriangle(points, 3);

  let tempArr = [];
  for (let p of allPoints) {
    for (let q of allPoints) {
      if (p.equals(q) != true) {
        let d = p5.Vector.dist(p, q);
        if (d > r / 2) {
          let s = p5.Vector.lerp(p, q, 1 / 2);
          tempArr.push(s);
        }
      }
    }
  }
  for (let p of tempArr) {
    allPoints.push(p);
  }

  for (let p of allPoints) {
    for (let q of allPoints) {
      if (p.equals(q) != true) {
        let d = p5.Vector.dist(p, q);
        let angle = atan2(p.y-q.y,p.x,-q.x);
        //print(angle);
        if (d < r  && angle%45 < 0.1) {
          stroke(0,0,100,5);
          line(p.x, p.y, q.x, q.y);
        }
      }
    }
  }

  pop();
}

function drawRecursiveTriangle(_arr, _n) {
  if (_n < 0) {
    return;
  }
  for (let p of _arr) {
    //ellipse(p.x, p.y, 10);
  }

  let middle = [];
  for (let i = 0; i < _arr.length; i++) {
    let current = i;
    let next = (i + 1) % _arr.length;
    let p1 = _arr[current];
    let p2 = _arr[next];
    middle.push(p5.Vector.lerp(p1, p2, 1 / 2));
    allPoints.push(p5.Vector.lerp(p1, p2, 1 / 2));
  }
  drawRecursiveTriangle(middle, _n - 1);
}