let pallete = ["#C6C09F", "#050A08", "#02335E", "#D11306", "#E14A05", "#A9260B", "#718180", "#544035"];
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let prevC;
let bg;
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
  //pallete = createPallete(url);
  bgN = int(random(pallete.length));
  bg = pallete[bgN];
  pallete.splice(bgN, 1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
}


function draw() {
  background(bg);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cx = map(i, 0, cols - 1, offset, width - offset - cellW);
      let cy = map(j, 0, rows - 1, offset, height - offset - cellH);
      //rect(cx, cy, cellW, cellH);
      somethingLikeRectangle(cx + cellW / 2, cy + cellH / 2, cellW / sqrt(2), cellH / sqrt(2));
    }
  }
  image(graphics, 0, 0);
  noLoop();
}

function somethingLikeRectangle(cx, cy, w, h) {
  let points = [];
  let colors = pallete.concat();
  for (var i = colors.length - 1; i > 0; i--) {
    var t = Math.floor(Math.random() * (i + 1));
    var tmp = colors[i];
    colors[i] = colors[t];
    colors[t] = tmp;
  }
  push();
  translate(cx, cy);
  scale(random() > 0.5 ? -1 : 1, random() > 0.5 ? -1 : 1);
  fill(colors[0]);
  colors.splice(0, 1);
  noStroke();
  beginShape();
  let r = sqrt(sq(w / 2) + sq(h / 2));
  for (let angle = 0; angle < 360; angle += 360 / 4) {
    let x = cos(45 + angle) * r;
    let y = sin(45 + angle) * r;
    points.push(createVector(x, y));
    //vertex(x, y);
  }
  endShape(CLOSE);
  for (let i = 0; i < points.length; i++) {
    let p1 = points[i];
    let p2 = points[(i + 1) % points.length];
    let c1 = colors[i];
    let c2 = colors[(i + 1) % colors.length];
    let angle2 = atan2(p2.y - p1.y, p2.x - p1.x);
    let distance = p5.Vector.dist(p1, p2);

    push();
    translate(p1.x, p1.y);
    rotate(angle2);
    let z = int(random(1, 4))/2;
    for (let n = 0; n < distance; n += 1) {
      let angle3 = map(n, 0, distance, 0, 360 * z);
      colorMode(RGB);
      let c = lerpColor(color(c1), color(c2), map(n, 0, distance, 0, 1));
      colorMode(HSB);
      let m = sin(angle3) * w / 8;
      push();
      translate(n, m);
      fill(c);
      noStroke();
      ellipse(0, 0, m * 2, m * 2);
      pop();
    }
    pop();
  }
  pop();

}

function getRandomColor(_pallete) {
  let _c = prevC;
  while (_c == prevC) {
    _c = pallete[int(random(pallete.length))];
  }
  prevC = _c;
  return _c;
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
  let c = color(0, 0, 100, 7);
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