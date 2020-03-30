let cells, cols, rows;
let offset, margin;
let w, h;
let bg;
let pallete = ["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function init() {
  background(0, 0, 15);
  bg = createGraphics(width, height);
    bg.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, bg);

  offset = width / 10 / int(random(1, 3));
  margin = offset / int(random(2, 5));

  cells = int(random(3, 10));
  cols = cells;
  rows = cells;

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;


  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let r = sqrt(random(1));
      let depth = map(r, 0, 1, 2, 5); //int(random(3, 15));
      let n = int(random(pallete.length));
      waveInRect(x + w / 2, y + h / 2, w, h);
    }
  }
  image(bg, 0, 0);
}

function mousePressed() {
  redraw();
}

function waveInRect(_x, _y, _w, _h) {
  push();
  translate(_x, _y);
  rotate(int(random(4)) * 90);

  fill(0, 0, 100);
  noStroke();
  rectMode(CENTER);
  rect(0, 0, _w, _h);

  let step;
  let freq = int(random(1, 15)) / 7;
  let c1, c2;
  for (let x = -_w / 2; x < _w / 2; x += step) {
    step = int(random(1, 100)) / 100 * _w;
    let nextX = constrain(x + step, -_w / 2, _w / 2);

    let c3 = int(random(pallete.length));
    let c4 = int(random(pallete.length));
    while (c1 == c3) {
      c3 = int(random(pallete.length));
    }
    while (c2 == c4 || c3 == c4) {
      c4 = int(random(pallete.length));
    }
    c1 = c3;
    c2 = c4;

    let topPos = createVector(x, -h / 2);
    let topNextPos = createVector(nextX, -h / 2);

    fill(pallete[c1]);
    beginShape();
    vertex(topPos.x, topPos.y);
    for (let currentX = x; currentX < nextX; currentX += .1) {
      let currentY = sin(currentX * freq) * _w / 4;
      vertex(currentX, currentY);
    }
    vertex(topNextPos.x, topNextPos.y);
    endShape(CLOSE);

    step = int(random(1, 10)) / 10 * _w;
    nextX = constrain(x + step, -_w / 2, _w / 2);

    let bottomPos = createVector(x, +h / 2);
    let bottomNextPos = createVector(nextX, +h / 2);

    fill(pallete[c2]);

    beginShape();
    vertex(bottomPos.x, bottomPos.y);
    for (let currentX = x; currentX < nextX; currentX += .1) {
      let currentY = sin(currentX * freq) * _w / 4;
      vertex(currentX, currentY);
    }
    vertex(bottomNextPos.x, bottomNextPos.y);
    endShape(CLOSE);
  }
  pop();
}


function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = sqrt(random(1)) * width;
    let y = sqrt(random(1)) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 5);
    _graphics.ellipse(x, y, w, h);
  }
}

function draw() {
	clear();
	init();
  noLoop();
}