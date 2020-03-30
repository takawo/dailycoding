let cells;
let cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let images = [];

function preload() {
  cells = int(random(5,10));
  for (let i = 0; i < cells * cells; i++) {
    let randomNum = int(random(1000));
    images[i] = loadImage("https://loremflickr.com/200/200?random=" + randomNum);
  }
}


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  init();
  noLoop();
}

function init() {
	background(0,0,20);

  cols = cells;
  rows = cells;

  offset = -width / 10;
  margin = offset * -1;

  w = sqrt(sq(width) + sq(height));
  h = w;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

  push();
  translate(width / 2, height / 2);
  rotate(15 * int(random(-3,3)));

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let num = i + j * cols;
      let x1 = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y1 = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
      images[num].resize(cellW, cellH);
      image(images[num], x1, y1);

      if (i < cols - 1) {
        let nextNum = i + j * cols + 1;
        images[nextNum].resize(cellW, cellH);
        let x2 = x1 + cellW;
        let x3 = x2 + margin;
        for (let y = 0; y < cellH; y += 1) {
          let c1 = color(images[num].get(cellW-1, y));
          let c2 = color(images[nextNum].get(1, y));
          let p1 = createVector(x2, y1 + y);
          let p2 = createVector(x3, y1 + y);
          colorMode(RGB);
          let distance = dist(x2, y1 + y, x3, y1 + y);
          for (let nx = 0; nx <= distance; nx += 1) {
            let ratio = nx / distance;
            let p = p5.Vector.lerp(p1, p2, ratio);
            let c = lerpColor(c1, c2, ratio);
            stroke(c);
            point(p.x, p.y);
          }
        }
      }

      if (j < rows - 1) {
        let nextNum = i + (j + 1) * rows;
        images[nextNum].resize(cellW, cellH);
        let y2 = y1 + cellH;
        let y3 = y2 + margin;
        for (let x = 0; x < cellW; x += 1) {
          let c1 = color(images[num].get(x, cellH-1));
          let c2 = color(images[nextNum].get(x, 1));
          let p1 = createVector(x1 + x, y2);
          let p2 = createVector(x1 + x, y3);
          colorMode(RGB);
          let distance = dist(x1 + x, y2, x1 + x, y3);
          for (let ny = 0; ny <= distance; ny += 1) {
            let ratio = ny / distance;
            let p = p5.Vector.lerp(p1, p2, ratio);
            let c = lerpColor(c1, c2, ratio);
            stroke(c);
            point(p.x, p.y);
          }
        }
      }
    }
  }
  pop();
}