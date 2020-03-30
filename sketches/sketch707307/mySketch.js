let url = "https://coolors.co/app/ef476f-ffd166-06d6a0-118ab2-073b4c";
let pallete;
let graphics;
let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let prevC = -1;

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

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);


  cells = int(random(2,15));
  cols = cells;
  rows = cells;

  w = sqrt(sq(width) + sq(height));
  h = w;

  offset = 0;
  margin = w / 100;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

  push();
  translate(width / 2, height / 2);
  rotate(45);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
      let c = getRandomColor(pallete);
      drawRandomShape(x, y, cellW, cellH, c);
    }
  }
  pop()
  image(graphics, 0, 0);
}

function drawRandomShape(_x, _y, _w, _h, _c) {
  let shapeNum = 6;
  let n = int(random(shapeNum));
  switch (n) {
    case 0:
      drawArcInRect(_x, _y, _w, _h, _c);
      break;
    case 1:
      drawHarfArcInRect(_x, _y, _w, _h, _c);
      break;
    case 2:

      drawTriangleInRect(_x, _y, _w, _h, _c);
      break;
    case 3:
      drawRect(_x, _y, _w, _h, _c);
      break;
    case 4:
      drawEllipse(_x, _y, _w, _h, _c);
      break;
    case 5:
      drawOpenArc(_x, _y, _w, _h, _c);
      break;
  }
}



function drawEllipse(_x, _y, _w, _h, _c) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  fill(_c);
  noStroke();
  ellipse(0, 0, _w, _h);
  pop();
}


function drawOpenArc(_x, _y, _w, _h, _c) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  //rotate(-45);
  fill(_c);
  noStroke();
  arc(0, 0, _w, _h, 0, 270, PIE);
  pop();

}

function drawRect(_x, _y, _w, _h, _c) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(int(random(4)) * 90);
  fill(_c);
  noStroke();
  rect(-_w / 2, -_h / 2, _w / 2, _h);
  pop();
}

function drawHarfArcInRect(_x, _y, _w, _h, _c) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(int(random(4)) * 90);
  fill(_c);
  noStroke();
  arc(-_w / 2, 0, _w, _h, -90, 90, PIE);
  pop();
}

function drawArcInRect(_x, _y, _w, _h, _c) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(int(random(4)) * 90);
  fill(_c);
  noStroke();
  arc(-_w / 2, -_h / 2, _w * 2, _h * 2, 0, 90, PIE);
  pop();
}

function drawTriangleInRect(_x, _y, _w, _h, _c) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(int(random(4)) * 90);
  fill(_c);
  noStroke();
  push();
  translate(-_w / 2, 0);
  triangle(0, -_h / 2, 0, _h / 2, _w / 2, 0);
  pop();
  pop();
}

function draw() {
  //background(220);
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