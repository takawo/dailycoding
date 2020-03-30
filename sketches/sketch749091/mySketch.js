// noprotect
let imgs = [];
let imgNum = 15;
const w = 800;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let graphics;
let rMax;

function preload() {
  cells = int(random(4, 10));
  cols = cells;
  rows = cells;
  offset = w / 10;
  margin = offset / 5;

  let rMax = sqrt(sq(w / 2) + sq(w / 2));

  cellW = (w * 2 + offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w * 2 + offset * 2 - margin * (rows - 1)) / rows;
  rMax = int((cellW / sqrt(3) * 0.8) * 2);

  for (let i = 0; i < imgNum; i++) {
    imgs.push(loadImage("https://loremflickr.com/" + rMax + "/" + rMax + "?random=" + int(random(10000))));
  }
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 20);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);


  angleMode(DEGREES);
  strokeJoin(ROUND);
  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 360 / 4);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -w - offset, w + offset - cellW);
      let y = map(j, 0, rows - 1, -w - offset, w + offset - cellW);
      let arr = [];
      push();
      translate(x, y);
      recursiveTrianglesWithImages(arr, 0, int(random(2, 4)), rMax);
      pop();
    }
  }
  pop();
  image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}


function recursiveTrianglesWithImages(arr, depth, max, rMax = width / 2) {
  if (depth > max) {
    return;
  }
  if (depth == 0) {
    let r = rMax;
    let startAngle = int(random(12)) * 360 / 12;
    let g1 = createGraphics(rMax * 2, rMax * 2);
    g1.fill(255);
    g1.beginShape();
    for (let angle = startAngle; angle < 360 + startAngle; angle += 360 / 3) {
      let x = width / 2 + cos(angle) * r;
      let y = height / 2 + sin(angle) * r;
      arr.push(createVector(x, y));
      g1.vertex(x, y);
    }
    g1.endShape(CLOSE);

    let i1 = random(imgs).get();
    i1.mask(g1);
    imageMode(CENTER);
    image(i1, 0, 0);
  }

  let target = int(random(arr.length));
  let next = (target + 1) % arr.length;
  let current = p5.Vector.lerp(arr[target], arr[next], 0.5);

  let g2 = createGraphics(rMax * 2, rMax * 2);
  g2.triangle(arr[target].x, arr[target].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  let i2 = random(imgs).get();
  i2.mask(g2);
  image(i2, 0, 0);
  recursiveTrianglesWithImages([arr[target], arr[(next + 1) % arr.length], current], depth + 1, max);

  let g3 = createGraphics(rMax * 2, rMax * 2);
  g3.triangle(arr[next].x, arr[next].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  let i3 = random(imgs).get();
  i3.mask(g3);
  image(i3, 0, 0);
  recursiveTrianglesWithImages([arr[next], arr[(next + 1) % arr.length], current], depth + 1, max);
}