let pallete = ["#F3B4B7", "#FED568", "#67BAB7", "#047073", "#E3535D"];
let cells = 7;
const cols = cells;
const rows = cells;
const offset = 50;
const margin = 2;
let w, h;
let sc;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noLoop();

  sc = color(0, 0, 100, 100);
  stroke(sc);
  strokeCap(ROUND);
  strokeWeight(2);
  noFill();
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
}

function draw() {
  blendMode(ADD);
  background(0, 0, 5);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      push();
      translate(x, y);
      drawRandomShape(w, h);
      pop();
    }
  }
  drawNoise(45000);
}

function drawRandomShape(_w, _h) {
  rect(0, 0, _w, _h);
  let n = floor(random(4));
  switch (n) {
    case 0:
      drawArcQuarter(_w, _h, (_w + _h) / 2);
      break;
    case 1:
      drawArcHalf(_w, _h, (_w + _h) / 2);
      break;
    case 2:
      drawDiagonalLine(_w, _h);
      break;
    case 3:
      drawSplitLine(_w, _h);
      break;
  }
}

function drawDiagonalLine(_w, _h) {
  let m = floor(random(4));
  let n = floor(random(2));
  push();
  translate(_w / 2, _h / 2);
  //rotate(m * 90);
  let p1, p2;
  if (n == 0) {
    line(-w / 2, -h / 2, w / 2, h / 2);
    p1 = createVector(-w / 2, -h / 2);
    p2 = createVector(w / 2, h / 2);
    let o = int(random(pallete.length));
    if (random(100) < 80) {
      push();
      fill(pallete[o]);
      stroke(sc);
      triangle(p1.x, p1.y, p2.x, p2.y, w / 2, -h / 2);
      pop();
    } else {
      push();
      fill(pallete[o]);
      stroke(sc);
      triangle(p1.x, p1.y, p2.x, p2.y, -w / 2, h / 2);
      pop();
    }
  } else {
    line(w / 2, -h / 2, 0, h / 2);
    p1 = createVector(w / 2, -h / 2);
    p2 = createVector(0, h / 2);
    let o = int(random(pallete.length));
    if (random(100) < 80) {
      push();
      fill(pallete[o]);
      stroke(sc);
      triangle(p1.x, p1.y, p2.x, p2.y, w / 2, h / 2);
      pop();
    } else {
      push();
      fill(pallete[o]);
      stroke(sc);
      quad(p1.x, p1.y, p2.x, p2.y, -w / 2, h / 2, -w / 2, -h / 2);
      pop();
    }
  }
  for (let i = 0; i < 1.0; i += 1 / 10) {
    let p3 = p5.Vector.lerp(p1, p2, i);
    line(p3.x, p3.y, w / 2, p3.y);
  }

  pop();
}

function drawSplitLine(_w, _h) {
  let m = floor(random(4));
  let n = floor(random(2));
  push();
  translate(_w / 2, _h / 2);
  rotate(m * 90);
  line(-w / 2, 0, w / 2, 0);

  if (n < 0.5) {
    if (random(100) < 50) {
      for (let x = -w / 2; x < w / 2; x += w / 10) {
        line(x, 0, x, h / 2);
      }
    }
    let o = int(random(pallete.length));
    push();
    fill(pallete[o]);
    stroke(sc);
    if (random(100) < 50) {
      rect(-w / 2, -h / 2, w, h / 2);
    } else {
      rect(w / 2, h / 2, -w, -h / 2);
    }
    pop();
  } else {
    let m = int(random(1, 5));
    let mw = h * m / 20;
    if (random(100) < 50) {
      push();
      let o = int(random(pallete.length));
      fill(pallete[o]);
      rectMode(CENTER);
      rect(0, 0, w, mw * 2);
      pop();

    } else {
      push();
      let o = int(random(pallete.length));
      fill(pallete[o]);
      rectMode(CORNER);
      rect(-w / 2, -h / 2, w, (h - mw * 2) / 2);
      rect(w / 2, h / 2, -w, -(h - mw * 2) / 2);
      pop();
    }
    for (let i = 1; i < m; i++) {
      let y = map(i, 0, m - 1, 0, w * m / 20);
      line(-w / 2, y, w / 2, y);
      line(-w / 2, -y, w / 2, -y);
    }
  }
  pop();
}


function drawArcHalf(_w, _h, _d) {
  let m = floor(random(4));
  let sAngle = m * 90;
  let eAngle = 180;
  let x0 = _w / 2;
  let y0 = _h / 2;

  if (random(100) < 50) {
    push();
    translate(x0, y0);
    rotate(sAngle);
    let o = int(random(pallete.length));
    fill(pallete[o]);
    noStroke();
    arc(0, 0, _d, _d, 0, eAngle);
    rect(-_w / 2, 0, _w, -_h / 2);
    pop();
  } else {
    push();
    translate(x0, y0);
    rotate(sAngle);
    let o = int(random(pallete.length));
    fill(pallete[o]);
    noStroke();
    beginShape();
    for (let angle = 0; angle < eAngle; angle += 1) {
      let x = cos(angle) * _d / 2;
      let y = sin(angle) * _d / 2;
      vertex(x, y);
    }
    vertex(-_w / 2, _h / 2);
    vertex(_w / 2, _h / 2);
    endShape(CLOSE);
    pop();
  }

  push();
  translate(x0, y0);
  rotate(sAngle);
  noFill();
  arc(0, 0, _d, _d, 0, eAngle);
  pop();
}

function drawArcQuarter(_w, _h, _d) {
  let m = floor(random(4));
  let sAngle;
  let eAngle;
  let x0, x1;
  let y0, y1;
  push();
  switch (m) {
    case 0:
      sAngle = 0;
      eAngle = 90;
      x0 = 0;
      y0 = 0;
      x1 = _w;
      y1 = _h;
      break;
    case 1:
      sAngle = 90;
      eAngle = 180;
      x0 = _w;
      y0 = 0;
      x1 = 0;
      y1 = _h;
      break;
    case 2:
      sAngle = 180;
      eAngle = 270;
      x0 = _w;
      y0 = _h;
      x1 = 0;
      y1 = 0;
      break;
    case 3:
      sAngle = 270;
      eAngle = 360;
      x0 = 0;
      y0 = _h;
      x1 = _w;
      y1 = 0;
      break;
  }

  let o = int(random(pallete.length));
  if (random(100) < 50) {
    push();
    fill(pallete[o]);
    stroke(sc);
    arc(x0, y0, _d * 2, _d * 2, sAngle, eAngle);
    pop();
  } else {
    arc(x0, y0, _d * 2, _d * 2, sAngle, eAngle);
    fill(pallete[o]);
    beginShape();
    for (let angle = sAngle; angle < eAngle; angle++) {
      let x = x0 + cos(angle) * _d;
      let y = y0 + sin(angle) * _d;
      vertex(x, y);
    }
    vertex(x1, y1);
    endShape();
  }
  let isHorizontal = random(100) < 50 ? true : false;
  for (let angle = sAngle; angle < eAngle; angle += 5) {
    let x1 = x0 + cos(angle) * _d;
    let y1 = y0 + sin(angle) * _d;
    let x2;
    let y2;
    switch (m) {
      case 0:
        if (isHorizontal) {
          x2 = _d;
          y2 = y1;
        } else {
          x2 = x1;
          y2 = _d;
        }
        break;
      case 1:
        if (isHorizontal) {
          x2 = 0;
          y2 = y1;
        } else {
          x2 = x1;
          y2 = _d;
        }
        break;
      case 2:
        if (isHorizontal) {
          x2 = 0;
          y2 = y1;
        } else {
          x2 = x1;
          y2 = 0;
        }
        break;
      case 3:
        if (isHorizontal) {
          x2 = _d;
          y2 = y1;
        } else {
          x2 = x1;
          y2 = 0;
        }
        break;
    }
    line(x1, y1, x2, y2);
  }
  pop();
}

function drawNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    noStroke();
    fill(0, 0, 100, random(10));
    ellipse(x, y, w, h);
  }
}