let url = "https://coolors.co/app/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d";
let pallete;
let graphics;

let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let prevC = -1;
let cellMax, cellMin;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  pallete = createPallete(url);
  let bn = int(random(pallete.length));
  bc = pallete[bn]
  pallete.splice(bn, 1);
  background(bc);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(5, 50));
  cols = cells;
  rows = cells;
  cellMax = cells / 5;
  cellMin = int(cells / 25 + 1);
  w = sqrt(sq(width) + sq(height));
  h = w;

  offset = 0;
  margin = w / 100;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 90);

  let jStep = 1;
  for (let j = 0; j < rows; j += jStep) {
    let iStep = 1;
    jStep = int(random(cellMin, cellMax));
    if (j + jStep > rows) {
      jStep = rows - j;
    }
    let ch = cellH * jStep + margin * (jStep - 1);
    for (let i = 0; i < cols; i += iStep) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
      iStep = int(random(cellMin, cellMax));
      if (i + iStep > cols) {
        iStep = cols - i;
      }
      let cw = cellW * iStep + margin * (iStep - 1);
      let c = getRandomColor(pallete);

      let ratio = int(random(2, 6));
      let cw2 = cw / ratio;
      let ch2 = ch / ratio;

      // rect(x + cw / 2, y + ch / 2, cw2, ch2);
      // line(x, y, x + cw / 2 - cw2 / 2, y + ch / 2 - ch2 / 2);
      // line(x + cw, y, x + cw / 2 + cw2 / 2, y + ch / 2 - ch2 / 2);
      // line(x + cw, y + ch, x + cw / 2 + cw2 / 2, y + ch / 2 + ch2 / 2);
      // line(x, y + ch, x + cw / 2 - cw2 / 2, y + ch / 2 + ch2 / 2);

      let p1 = createVector(x, y);
      let p2 = createVector(x + cw, y);
      let p3 = createVector(x + cw, y + ch);
      let p4 = createVector(x, y + ch);
      let p5 = createVector(x + cw / 2 - cw2 / 2, y + ch / 2 - ch2 / 2);
      let p6 = createVector(x + cw / 2 + cw2 / 2, y + ch / 2 - ch2 / 2);
      let p7 = createVector(x + cw / 2 + cw2 / 2, y + ch / 2 + ch2 / 2);
      let p8 = createVector(x + cw / 2 - cw2 / 2, y + ch / 2 + ch2 / 2);

      drawQuad(p1, p2, p6, p5, c, 50);
      drawQuad(p2, p3, p7, p6, c, 30);
      drawQuad(p3, p4, p8, p7, c, 70);
      drawQuad(p4, p1, p5, p8, c, 95);
      drawQuad(p5, p6, p7, p8, c, 100);
    }
  }
  pop();

  image(graphics, 0, 0);
}

function drawQuad(_p1, _p2, _p3, _p4, _c, _n = 100) {
  let h = hue(_c);
  let s = saturation(_c);
  let b = brightness(_c) * _n / 100;
  let c = color(h, s, b);
  fill(c);
  stroke(0, 0, 100, 25);
	strokeWeight(0.5);
  quad(
    _p1.x, _p1.y,
    _p2.x, _p2.y,
    _p3.x, _p3.y,
    _p4.x, _p4.y
  );
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

function getRandomColor(_pallete) {
  let _c = prevC;
  while (_c == prevC) {
    _c = pallete[int(random(pallete.length))];
  }
  prevC = _c;
  return _c;
}