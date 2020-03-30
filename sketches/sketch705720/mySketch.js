let cells, cols, rows;
let offset, margin;
let w, h;
let url = "https://coolors.co/2f499c-ef476f-da38c3-ffd166-06d6a0";
let pallete = [];
let graphics;

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
  cells = int(random(3, 15));
  cols = cells;
  rows = cells;

  offset = width / cells / int(random(3, 8));
  margin = offset / int(random(1, 3));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  pallete = createPallete(url);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  background(0, 0, 90);

  let jStep = 1;
  for (let j = 0; j < rows; j += jStep) {
    let iStep = 1;
    jStep = int(random(1,5));
    if (j + jStep > rows) {
      jStep = rows - j;
    }
    let ch = h * jStep + margin * (jStep - 1);
    for (let i = 0; i < cols; i += iStep) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      iStep = int(random(1, 5));
      if (i + iStep > cols) {
        iStep = cols - i;
      }
      let cw = w * iStep + margin * (iStep - 1);
      drawTriangleInRect(x, y, cw, ch);
    }
  }
  image(graphics, 0, 0);
}

function drawTriangleInRect(_x, _y, _w, _h) {
  let cx = _x + _w / 2;
  let cy = _y + _h / 2;
  let rectAndTriangleColor = getColor(pallete, 2);
  let rotate_num = int(random(4));
  let w, h;
  if (rotate_num % 2 == 0) {
    w = _w;
    h = _h;
  } else {
    w = _h;
    h = _w;
  }
  push();
  translate(cx, cy);
  rotate(rotate_num * 90);
  rectMode(CENTER);
  noStroke();
  fill(rectAndTriangleColor[0]);
  rect(0, 0, w, h);
  fill(rectAndTriangleColor[1]);
  if (w == h) {
    triangle(-w / 2, -h / 2, w / 2, -h / 2, -w / 2, h / 2);
  } else if (w > h) {
    triangle(-w / 2, h / 2, 0, -h / 2, w / 2, h / 2);
  } else if (h > w) {
    triangle(-w / 2, -h / 2, w / 2, 0, -w / 2, 0);
    triangle(-w / 2, 0, w / 2, h / 2, -w / 2, h / 2);
  }
  pop();
}

function getColor(_pallete, n) {
  let p = _pallete.concat();
  let arr = [];
  while (n > 0) {
    let m = int(random(p.length));
    arr.push(p[m]);
    p.splice(m, 1);
    n--;
  }
  return arr;
}


function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');

  for (let i = 0; i < arr.length; i++) {
    let red = unhex(arr[i].substr(0, 2));
    let green = unhex(arr[i].substr(2, 2));
    let blue = unhex(arr[i].substr(4, 2));
    colorMode(RGB, 255, 255, 255);
    let c = color(red, green, blue);
    let h = hue(c);
    let s = saturation(c);
    let b = brightness(c);
    let t = 100 * 3 / 4;
    colorMode(HSB, 360, 100, 100, 100);
    c = color(h, s, b, t);
    arr[i] = c;
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