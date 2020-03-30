let url = "https://coolors.co/app/ef476f-ffd166-06d6a0-118ab2-073b4c";
let pallete;
let graphics;
let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let prevC = -1;
let blurLayer;
let graphicsLayer;
let textureLayer;
let blurAmount;

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
  background(bc)

  textureLayer = createGraphics(width, height);
  textureLayer.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(50000, textureLayer);

  graphicsLayer = createGraphics(width, height);
  graphicsLayer.colorMode(HSB, 360, 100, 100, 100);
  graphicsLayer.angleMode(DEGREES);

  cells = int(random(2, 15));
  cols = cells;
  rows = cells;
  
  blurAmount = 120 / cells;
  
  w = sqrt(sq(width) + sq(height));
  h = w;

  offset = 0;
  margin = w / 100;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

  graphicsLayer.push();
  graphicsLayer.translate(width / 2, height / 2);
  graphicsLayer.rotate(45);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
      let c = getRandomColor(pallete);
      drawRandomShape(x, y, cellW, cellH, c, graphicsLayer);
    }
  }

  blurLayer = createGraphics(width, height);
  blurLayer.copy(graphicsLayer,
    0, 0, graphicsLayer.width, graphicsLayer.height,
    0, 0, graphicsLayer.width, graphicsLayer.height);
}

function draw() {
  blendMode(BLEND);
  blurLayer.filter(BLUR, blurAmount);
  image(blurLayer,0, 0);
  blendMode(ADD);
  image(graphicsLayer, 0, 0);
  image(textureLayer, 0, 0);
  noLoop();
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
  let c = color(0, 0, 100, 8);
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

function drawRandomShape(_x, _y, _w, _h, _c, _graphics) {
  let shapeNum = 6;
  let n = int(random(shapeNum));
  switch (n) {
    case 0:
      drawArcInRect(_x, _y, _w, _h, _c, _graphics);
      break;
    case 1:
      drawHarfArcInRect(_x, _y, _w, _h, _c, _graphics);
      break;
    case 2:

      drawTriangleInRect(_x, _y, _w, _h, _c, _graphics);
      break;
    case 3:
      drawRect(_x, _y, _w, _h, _c, _graphics);
      break;
    case 4:
      drawEllipse(_x, _y, _w, _h, _c, _graphics);
      break;
    case 5:
      drawOpenArc(_x, _y, _w, _h, _c, _graphics);
      break;
  }
}



function drawEllipse(_x, _y, _w, _h, _c, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.fill(_c);
  _graphics.noStroke();
  _graphics.ellipse(0, 0, _w, _h);
  _graphics.pop();
}


function drawOpenArc(_x, _y, _w, _h, _c, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.rotate(-45 + int(random(4)) * 90);
  _graphics.fill(_c);
  _graphics.noStroke();
  _graphics.arc(0, 0, _w, _h, 0, 270, PIE);
  _graphics.pop();
}

function drawRect(_x, _y, _w, _h, _c, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.rotate(int(random(4)) * 90);
  _graphics.fill(_c);
  _graphics.noStroke();
  _graphics.rect(-_w / 2, -_h / 2, _w / 2, _h);
  _graphics.pop();
}

function drawHarfArcInRect(_x, _y, _w, _h, _c, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.rotate(int(random(4)) * 90);
  _graphics.fill(_c);
  _graphics.noStroke();
  _graphics.arc(-_w / 2, 0, _w, _h, -90, 90, PIE);
  _graphics.pop();
}

function drawArcInRect(_x, _y, _w, _h, _c, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.rotate(int(random(4)) * 90);
  _graphics.fill(_c);
  _graphics.noStroke();
  _graphics.arc(-_w / 2, -_h / 2, _w * 2, _h * 2, 0, 90, PIE);
  _graphics.pop();
}

function drawTriangleInRect(_x, _y, _w, _h, _c, _graphics) {
  _graphics.push();
  _graphics.translate(_x + _w / 2, _y + _h / 2);
  _graphics.rotate(int(random(4)) * 90);
  _graphics.fill(_c);
  _graphics.noStroke();
  _graphics.push();
  _graphics.translate(-_w / 2, 0);
  _graphics.triangle(0, -_h / 2, 0, _h / 2, _w / 2, 0);
  _graphics.pop();
  _graphics.pop();
}