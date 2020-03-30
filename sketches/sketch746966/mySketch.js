// the way of masking p5.graphics this code is very helpful for me. Thanks mikima!
// https://editor.p5js.org/mikima/sketches/SkEXyPvpf

let pallete = ["#C29EA2", "#E8956A", "#D75036", "#A5716F", "#9F738B", "#5E3C47", "#0A050A"];
let bg;

let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let graphics;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  let bgNum = int(random(pallete.length));
  bg = pallete[bgNum];
  pallete.splice(bgNum, 1);
  background(bg);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  cells = int(random(2, 8));
  rows = cells;
  cols = cells;

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
      push();
      translate(x+cellW/2, y+cellH/2);
      rotate(random(360));
      drawShapesInCircle(0, 0, int(cellW * 0.9), int(random(5, 12)), pallete);
      pop();
    }
  }
  pop()
  image(graphics, 0, 0);
}

function drawShapesInCircle(_cx, _cy, _d, _num, colors) {
  let g = createGraphics(_d, _d);
  g.angleMode(DEGREES);
  let gg = createGraphics(_d, _d);
  gg.push();
  gg.translate(gg.width / 2, gg.height / 2);
  gg.beginShape();
  let angleNum = int(random(3, 8));
  for (let angle = 0; angle < 360; angle += 360 / angleNum) {
    gg.vertex(cos(angle) * _d / 2, sin(angle) * _d / 2);
  }
  gg.endShape(CLOSE);
  gg.pop();

  g.push();
  g.translate(g.width / 2, g.height / 2);
  //g.rotate(45+int(random(4)) * 360 / 4);
  let prevC = -1;
  for (let i = 0; i < _num; i++) {
    let y = map(i, 0, _num - 1, -_d, _d);
    let amp = random() * cells / _num;
    let freq = int(random(1, 6)) / 1.5;
    let c = prevC;
    while (c == prevC) {
      c = random(colors);
    }
    prevC = c;
    g.fill(c);
    g.noStroke();
    g.beginShape();
    for (let x = -_d; x < _d; x += 1) {
      g.vertex(x, y + sin((y + x) * freq) * _d / 4 * amp);
    }
    g.vertex(_d / 2, _d / 2);
    g.vertex(-_d / 2, _d / 2);
    g.endShape(CLOSE);
  }
  g.pop();

  let maskedImage = pgMask(g, gg);
  imageMode(CENTER);
  image(maskedImage, 0, 0);
}

function pgMask(_content, _mask) {
  var img = createImage(int(_mask.width), int(_mask.height));
  img.copy(_mask, 0, 0, int(_mask.width), int(_mask.height), 0, 0, int(_mask.width), int(_mask.height));
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i + 1] = 0;
    img.pixels[i + 2] = 0;
    img.pixels[i + 3] = v;
  }
  img.updatePixels();
  var contentImg = createImage(_content.width, _content.height);
  contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
  contentImg.mask(img)
  return contentImg;
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 6);
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