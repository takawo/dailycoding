// reference : 斎藤 saito@takoyaki_karepa's awesome sketch
// https://www.openprocessing.org/sketch/854863
let graphics;
let offset;
let pallete = ["#36B1BF", "#4AD9D9", "#FFCB05", "#E9FFDF", "#F23C50"];
let patternGraphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  offset = width / 8;
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);

  patternGraphics = createGraphics(width / 2, height);
  patternGraphics.colorMode(HSB, 360, 100, 100, 100);
  patternGraphics.angleMode(DEGREES);

  graphics.stroke(0, 0, 30, 10);
  for (let i = 0; i < width * height * 2 / 100; i++) {
    graphics.strokeWeight(random(5));
    graphics.point(random(width), random(height));
  }


  for (let i = 0; i < width * height * .3 / 100; i++) {
    graphics.stroke(0, 0, 100, random(2));
    graphics.strokeWeight(5);
    let x = random(width);
    let y = random(-height, height * 2);
    graphics.line(x, y, x, y + random(75, 150));
  }

}

function draw() {
  blendMode(BLEND);
  background(0, 0, 10);
	blendMode(ADD);

  patternGraphics.clear();
  patternGraphics.noStroke();
  patternGraphics.drawingContext.shadowColor = color(0, 0, 30);
  patternGraphics.drawingContext.shadowBlur = 20;


  randomSeed(0);
  recursiveRect(offset, offset, (width - offset * 2) / 2, height - offset * 2, 4, patternGraphics);
  image(patternGraphics, 0, 0);
  push();
  translate(width, 0);
  scale(-1, 1);
  image(patternGraphics, 0, 0);
  pop();

  blendMode(ADD);
  image(graphics, 0, 0);
  // noLoop();
}

function recursiveRect(_x, _y, _w, _h, _depth, _g) {
  let rotate_num = int(sqrt(random()) * 4);
  _g.push();
  _g.translate(_x + _w / 2, _y + _h / 2);
  let w, h;
  if (rotate_num % 2 == 1) {
    w = _h;
    h = _w;
  } else {
    w = _w;
    h = _h;
  }
  _g.rotate(rotate_num * 90);
  let n = noise(_x / 300, _y / 300, frameCount / 50)
  let ww = w * n;
  let c1 = random(pallete);
  let c2 = random(pallete);
  while (c1 == c2) {
    c2 = random(pallete);
  }

  _g.fill(c1);
  _g.rect(-w / 2, -h / 2, ww, h);
  _g.fill(c2);
  _g.rect(-w / 2 + ww, -h / 2, w - ww, h);

  if (_depth > 0 && (w / 2 > 5 && h > 5)) {
    recursiveRect(-w / 2, -h / 2, ww, h, _depth - 1, _g);
    recursiveRect(-w / 2 + ww, -h / 2, w - ww, h, _depth - 1, _g);
    // recursiveRect(-w / 2, -h / 2, w / 2, h, _depth - 1);
    // recursiveRect(0, -h / 2, w / 2, h, _depth - 1);
  }
  _g.pop();
}