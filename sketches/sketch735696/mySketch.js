let img;
let graphics;

function preload() {
  img = loadImage("https://loremflickr.com/800/800");
}


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  let x = width / 2;
  let y = height / 2;
  let r = width * 2.5 / 2 / 3;

  drawDonut(graphics, x, y, r);
  img.mask(graphics);
}

function draw() {
  background(150, 90, 30);
  image(img, 0, 0);
}

function drawDonut(_graphics, _x, _y, _r) {
  _graphics.push();
  _graphics.translate(_x, _y);
  _graphics.beginShape();
  for (let angle = 0; angle < 360; angle += 360 / 3) {
    let x = cos(angle) * _r;
    let y = sin(angle) * _r;
    _graphics.vertex(x, y);
  }

  _graphics.beginContour();
  for (let angle = 360; angle > 0; angle -= 360 / 3) {
    let x = cos(angle) * _r * 1 / 3;
    let y = sin(angle) * _r * 1 / 3;
    _graphics.vertex(x, y);
  }
  _graphics.endContour();
  _graphics.endShape();
  _graphics.pop();
}