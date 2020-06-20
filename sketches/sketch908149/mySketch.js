//https://coolors.co/3a3042-db9d47-ff784f-ffe19c-edffd9

let pallete = ["#3a3042","#db9d47","#ff784f","#ffe19c","#edffd9"];

let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 5);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }
}

function draw() {
  background(0, 0, 0);

  let offset = width / 5;
  for (let i = 0; i < 100; i++) {

    let x1 = random(-offset, width + offset);
    let y1 = random(-offset, height + offset);
    let x2 = x1;
    let y2 = random(-offset, height + offset);

    drawRectLines(x1, y1, x2, y2);

  }

  image(bg, 0, 0);
  noLoop();
}

function drawRectLines(x1, y1, x2, y2) {
  // line(x1, y1, x2, y2);
  let distance = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(x1, y1);
  rotate(angle);
  let n = 0;
  let nStep;
  let m = 0;
  while (n < distance) {
    nStep = random(distance / 20, distance / 2);
    if (n + nStep > distance) {
      nStep = distance - n;
    }
    noStroke();
    let vectors;
    if (m % 2 == 0) {
      vectors = setVectors(n, 0, nStep, nStep);

      rectMode(CENTER);
      rect(n + nStep / 2, nStep / 2, nStep, nStep);
    } else {
      vectors = setVectors(n, 0, nStep, -nStep);
      rectMode(CENTER);
      rect(n + nStep / 2, -nStep / 2, nStep, -nStep);
    }
    let sep = int(random(5,10));
    let gGap = 1 / sep;
    let prev_col = -1;
    let col = prev_col;
    for (let k = 0; k < sep; k++) {
      let dir = random(100) > 50 ? -1 : 1;
      while (prev_col == col) {
        col = random(pallete);
      }
      prev_col = col;
      drawingContext.shadowBlur = nStep / 5;
      drawingContext.shadowColor = color(0,0,0,50);
      vectors = getShiftedVectorArray(vectors, gGap, dir);
      drawSquare(vectors, col);
    }
    n += nStep;
    m++;
  }
  pop();
}

function setVectors(x, y, w, h) {
  let vectors = [];
  vectors.push(createVector(x, y));
  vectors.push(createVector(x + w, y));
  vectors.push(createVector(x + w, y + h));
  vectors.push(createVector(x, y + h));
  return vectors;
}

function getShiftedVectorArray(vectors, gap, dir) {

  let nextVectorArray = [];

  for (let i = 0; i < vectors.length; i++) {
    let directionVector = p5.Vector.sub(vectors[(i + 1) % 4], vectors[i]);
    directionVector.mult(gap);
    nextVectorArray.push(p5.Vector.add(vectors[i], directionVector));
  }

  return nextVectorArray;
}

function drawSquare(vectors, col) {
  noStroke();
  fill(col);
  beginShape();
  for (let i = 0; i < vectors.length; i++) {
    vertex(vectors[i].x,
      vectors[i].y);
  }
  endShape(CLOSE);
}