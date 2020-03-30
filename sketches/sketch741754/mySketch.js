let pallete = ["#3322C8", "#FC1818", "#709DD9", "#EA700A", "#F89F25","#230C57","#8E87A2"];

let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  init();
}

function init() {
  cells = int(random(2, 8));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 4;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  
  let n = int(random(pallete.length));
  background(pallete[n]);
  noStroke();
  pallete.splice(n,1);
}

function draw() {
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      drawPolygons(x + cellW / 2, y + cellH / 2, cellW / 4, pallete);
    }
  }
  noLoop();
  image(graphics,0,0);
}

function drawPolygons(cx, cy, rMax = width / 20, pal) {
  let col = pal.concat();
  push();
  translate(cx, cy);
  rotate(random(360));
  let points = [];
  beginShape();
  let r = random(rMax / 4, rMax / 2);
  let n = int(random(col.length));
  fill(col[n]);
  noStroke();
  col.splice(n,1);
  for (let angle = 0; angle < 360; angle += 360 / 4) {
    let a = angle + random(-90, 90) / 4;
    let x = cos(a) * r;
    let y = sin(a) * r;
    //ellipse(x, y, 5, 5);
    vertex(x, y);
    points.push(createVector(x, y));
  }
  endShape(CLOSE);

  let lastPoints = [];
  let endPoint = createVector();
  for (let i = 0; i < 4; i++) {
  let m = int(random(col.length));
  fill(col[m]);
  noStroke();
  col.splice(m,1);
    beginShape();
    let p1 = points[i];
    let a1 = atan2(p1.y, p1.x);
    vertex(p1.x, p1.y);
    let p4 = points[(i + 1) % points.length];
    let a4 = atan2(p4.y, p4.x);
    vertex(p4.x, p4.y);

    let a3 = a4; + random(-90, 90) / 4;
    let r3 = random(rMax, rMax * 2);
    let x3 = cos(a3) * r3;
    let y3 = sin(a3) * r3;
    if (i == points.length - 1) {
      vertex(endPoint.x, endPoint.y);
    } else {
      vertex(x3, y3);
    }
    let a2 = a1;
    let r2 = random(rMax, rMax * 2);
    let x2 = cos(a2) * r2;
    let y2 = sin(a2) * r2;
    if (lastPoints.length == 0) {
      vertex(x2, y2);
      lastPoints.push(createVector(x3, y3));
      endPoint = createVector(x2, y2);
    } else {
      vertex(lastPoints[lastPoints.length - 1].x, lastPoints[lastPoints.length - 1].y);
      lastPoints.push(createVector(x3, y3));
    }
    endShape(CLOSE);
  }
  pop();
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}