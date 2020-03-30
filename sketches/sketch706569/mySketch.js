let url = "https://coolors.co/app/d3f1e8-0b4f78-24b1a6-ef506b-ffcc6c";
let pallete = [];

let cells, cols, rows;
let offset, margin;
let w, h;
let pfc = -1;
let ratio = 0.65;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  init();
  frameRate(1);
}

function init() {
  pallete = createPallete(url);
  let bn = int(random(pallete.length));
  bc = pallete[bn]
  pallete.splice(bn, 1);
  background(bc)

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);


  cells = int(random(2, 8));
  cols = cells;
  rows = cells;

  offset = (width / cells) / int(random(3, 5));
  margin = offset / int(random(1, 3));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  let ratio = 0.25;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cx = map(i, 0, cols - 1, offset, width - offset - w) + w / 2;
      let cy = map(j, 0, rows - 1, offset, height - offset - h) + h / 2;
      let rMax = w * 2 * ratio;
      let sepMax = int(random(3, 8));
      drawSeparatedAndLayeredCircles(cx, cy, rMax, sepMax);

    }
  }
  image(graphics, 0, 0);

}

function drawSeparatedAndLayeredCircles(cx, cy, rMax, sepMax) {
  stroke(0, 0, 100, 50);
  for (let r = rMax; r > 0; r -= rMax / 4) {
    let offset = r / 40;
    push();
    translate(cx, cy);
    let num = int(random(sepMax / 2, sepMax));
    let w = (r * 2) / num;
    let rotateAngle = 45 * int(random(8));
    rotate(rotateAngle);
    for (let x = -r; x < r; x += w) {
      push();
      let xOffset = random(r / 15, -r / 15);
      let yOffset = random(-r / 15, r / 15);

      translate(xOffset, yOffset);
      let y = sqrt(sq(r) - sq(x));

    let fc = pfc;
    while (fc == pfc) {
      fc = pallete[int(random(pallete.length))];
    }
    fill(fc);
    pfc = fc;
      beginShape();
      vertex(x, 0);
      vertex(x, y);
      let angle = atan2(y, x);
      let x2 = x;
      let y2 = y;
      let distance = dist(x, 0, x2, 0);
      while (distance < w - .1) {
        angle -= 1;
        x2 = cos(angle) * r;
        y2 = sin(angle) * r;
        vertex(x2, y2);
        distance = dist(x, 0, x2, 0);
      }
      let x3 = x2;
      let y3 = -y2;
      let x4 = x3;
      let y4 = y3;
      vertex(x3, y3);
      let distance2 = dist(x, 0, x3, 0);
      let angle2 = atan2(y3, x3);
      while (distance2 > .1) {
        angle2 -= 1;
        x4 = cos(angle2) * r;
        y4 = sin(angle2) * r;
        vertex(x4, y4);
        distance2 = dist(x, 0, x4, 0);
      }

      endShape(CLOSE);
      pop();
    }
    pop();
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