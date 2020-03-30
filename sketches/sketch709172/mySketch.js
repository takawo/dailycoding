let url = "https://coolors.co/app/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d";
let pallete;
let graphics;
let prevC = -1;

let layers = [];
let layerNum = 5;

let cells, cols, rows;
let margin, offset;
let cellW, cellH;
let waves = [];

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

  cells = int(random(5, 15));
  cols = cells;
  rows = cells;
  cellMax = cells / 5;
  cellMin = cellMax / 2;
  w = sqrt(sq(width) + sq(height));
  h = w;


  for (let i = 0; i < layerNum; i++) {
    let graphicsLayer = createGraphics(w, h);
    graphicsLayer.colorMode(HSB, 360, 100, 100, 100);
    graphicsLayer.angleMode(DEGREES);
    layers.push(graphicsLayer);
  }

  offset = 0;
  margin = w / 50;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, w - offset - cellW);
      let y = map(j, 0, rows - 1, offset, h - offset - cellH);
      for (let i = 0; i < layerNum; i++) {
        layers[i].noStroke();
        layers[i].fill(getRandomColor(pallete));
        drawRandomShapes(x, y, cellW, cellH, layers[i]);
      }
    }
  }
  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 90);


  for (let layer of layers) {
    let blurLayer = createGraphics(layer.width, layer.height);
    blurLayer.copy(layer,
      0, 0, layer.width, layer.height,
      0, 0, layer.width, layer.height);
    blurLayer.filter(BLUR, 10);

    push();
    translate(-w / 2, -h / 2);
    image(blurLayer, 0, 0);
    pop();


    push();
    translate(-w / 2, -h / 2);
    image(layer, 0, 0);
    pop();
  }

  pop();
  imageMode(CORNER);
  image(graphics, 0, 0);
  noLoop();
}

function drawRandomShapes(_x, _y, _w, _h, _graphics) {
  let shapeNum = 3;
  let n = int(random(shapeNum));
  switch (n) {
    case 0:
      drawArc(_x, _y, _w, _h, _graphics);
      break;
    case 1:
      drawRect(_x, _y, _w, _h, _graphics);
      break;
    case 2:
      drawTriangle(_x, _y, _w, _h, _graphics);
      break;
  }
}

function drawArc(_x, _y, _w, _h, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.push();
  _graphics.rotate(int(random(4)) * 90);
  _graphics.arc(-_w / 2, -_h / 2, _w, _h, 0, 90, PIE);
  _graphics.pop();
  _graphics.pop();
}

function drawRect(_x, _y, _w, _h, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.push();
  _graphics.rotate(int(random(4)) * 90);
  switch (int(random(4))) {
    case 0:
      _graphics.rect(-_w / 2, -_h / 2, _w / 2, _h / 2);
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
  }
  _graphics.pop();
  _graphics.pop();
}

function drawTriangle(_x, _y, _w, _h, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.push();
  _graphics.rotate(int(random(4)) * 90);
  switch (int(random(4))) {
    case 0:
      _graphics.triangle(-_w / 2, -_h / 2, 0, -_h / 2, -_w / 2, 0);
      break;
    case 1:
      _graphics.triangle(-_w / 2, -_h / 2, _w / 2, -_h / 2, 0, 0);
      break;
    case 2:
      _graphics.triangle(-_w / 2, -_h / 2, _w / 2, -_h / 2, -_w / 2, _h / 2);
      break;
    case 3:
      _graphics.triangle(-_w / 2, 0, 0, 0, 0, -_h / 2);
      break;
  }
  _graphics.pop();
  _graphics.pop();
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

function createStep(min, max) {
  return random(min, max) * random(min, max) + 1;
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