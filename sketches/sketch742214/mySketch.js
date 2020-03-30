let url = "https://coolors.co/app/ffbf00-e83f6f-368f8b-ffffff-2b2d42";
let pallete;
let graphics;
let bg;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  pallete = createPallete(url);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(50000, graphics);

  let n = int(random(pallete.length));
  bg = pallete[n];
  pallete.splice(n, 1);

  cells = int(random(2, 8));
  cols = cells;
  rows = cells;

  offset = width / 10;
  margin = offset / 4;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

}

function draw() {
  background(bg);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      drawLineRounded(x+cellW/2, y+cellH/2, cellW/3);
      drawLineRounded(x+cellW/2, y+cellH/2, cellW/3);
    }
  }

  image(graphics, 0, 0);
  noLoop();
}

function drawLineRounded(cx, cy, r) {

  push();
  translate(cx, cy);
  rotate(int(random(4)) * 360/4);
  let angle = int(random(4)) * 360 / 4;
  let d = r / 2;
  let x1 = cos(angle) * r;
  let y1 = sin(angle) * r;
  let x2 = cos(angle + 180) * r;
  let y2 = sin(angle + 180) * r;
  let distance = dist(x1, y1, x2, y2);
  push();
  rotate(angle);
  rectMode(CENTER);
  let cArr = createColorArr(pallete.concat(), 2);
  recursiveRect(0, 0, distance, d, cArr[0], cArr[1]);
  //rect(0,0,distance,d);
  pop();
  cArr = createColorArr(pallete.concat(), 2);
  recursiveCircle(x1, y1, d, cArr[0], cArr[1]);
  cArr = createColorArr(pallete.concat(), 2);
  recursiveCircle(x2, y2, d, cArr[0], cArr[1]);
  pop();
}

function createColorArr(_pallete, _len) {
  let arr = [];
  for (let i = 0; i < _len; i++) {
    let m = int(random(_pallete.length));
    arr.push(_pallete[m]);
    _pallete.splice(m, 1);
  }
  return arr;
}

function recursiveRect(x, y, wMax, hMax, c1, c2) {
  let n = int(random(8, 3));
  for (let i = n; i > 0; i--) {
    let w = map(i, n, 1, wMax, wMax / n);
    //let h = map(i,n,1,hMax,0);
    let b = map(i, n, 1, 100, 0);
    let m = map(i, n, 1, 0, 1);
    let c = lerpColor(color(c1), color(c2), m);
    fill(c);
    noStroke();
    rect(x, y, w, hMax);
  }
}

function recursiveCircle(x, y, wMax, c1, c2) {
  let n = int(random(8, 3));
  for (let i = n; i > 0; i--) {
    let w = map(i, n, 1, wMax, wMax / n);
    let b = map(i, n, 1, 100, 0);
    let m = map(i, n, 1, 0, 1);
    let c = lerpColor(color(c1), color(c2), m);
    fill(c);
    noStroke();
    circle(x, y, w);
  }
}



function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
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