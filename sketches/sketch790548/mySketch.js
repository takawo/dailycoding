let ratio = 0.66;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let depthMax = 6;
let bg;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(ADD);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 10);
  bg.noStroke();
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let radius = sqrt(sq(width / 2) + sq(height / 2));
    let angle = random(360);
    let r = 1 - (random(random(random(1))));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    bg.ellipse(x, y, w, h);
  }
}

function draw() {
  background(20);
  cells = int(random(1, 6));
  int(random(3, 10));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 5;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellH + margin);
      let cx = x + cellW / 2;
      let cy = y + cellH / 2;
      push();
      translate(cx, cy);
      let l = cellW / 4;
      let depth = int(random(3, 6));
      tree(depth, l);
      pop();
    }
  }
  image(bg, 0, 0);

  noLoop();
}

function keyPressed(){
	clear();
	redraw();
}

function tree(depth, l) {
  let len = 125;
  if (depth > 0) {
    let n = int(random(3, 10));
    for (let angle = 0; angle < 360; angle += 360 / n) {
      push();
      rotate(angle);
      stroke(0, 0, 80, 100);
      noFill();
      let sw = map(l, 0, len, 0, depthMax);
      strokeWeight(sw);
      if (random(100) > 50) {
        bezier(0, 0, l / 2, l / 2, l / 2, -l / 2, l, 0);
      } else {
        bezier(0, 0, l / 2, -l / 2, l / 2, l / 2, l, 0);
      }
      translate(l, 0);
      rotate(random(360));
      tree(depth - 1, l * random(0.2, 0.7));
      pop();
    }
  }
}