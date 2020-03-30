let pallete = ["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D"];
let isShadow = false;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 25 / 100; i++) {
    let r = (1 - random(random(random()))) * sqrt(sq(width) + sq(height)) / 2;
    let angle = random(360);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    let w = random(3);
    let h = random(3);
    random(100) > 50 ? graphics.fill(0, 0, 100, 5) : graphics.fill(0, 0, 0, 5);
    graphics.ellipse(x, y, w, h);
  }  
  
  mousePressed();
}

function draw() {
  randomSeed(0);
  background(0,0,95);
  image(graphics,0,0);
  noStroke();
  let offset = width / 10;
  recursiveRect(offset, offset, width-offset*2, height-offset*2, 5);
  // noLoop();
}

function mousePressed() {
  isShadow = !isShadow;
  if (isShadow) {
    drawingContext.save();
    drawingContext.shadowColor = color(0, 0, 0, 20);
    drawingContext.shadowBlur = width / 40;
  } else {
    drawingContext.restore();
  }
}


function recursiveRect(_x, _y, _w, _h, _depth) {
  let rotate_num = int(sqrt(random()) * 4);
  push();
  translate(_x + _w / 2, _y + _h / 2);
  let w, h;
  if (rotate_num % 2 == 1) {
    w = _h;
    h = _w;
  } else {
    w = _w;
    h = _h;
  }
  rotate(rotate_num * 90);
  let n = noise(_x / 300, _y / 300, frameCount / 50)
  let ww = w * n;
  let c1 = random(pallete);
  let c2 = random(pallete);
  while (c1 == c2) {
    c2 = random(pallete);
  }

  fill(c1);
  rect(-w / 2, -h / 2, ww, h);
  fill(c2);
  rect(-w / 2 + ww, -h / 2, w - ww, h);

  if (_depth > 0 && (w / 2 > 5 && h > 5)) {
    recursiveRect(-w / 2, -h / 2, ww, h, _depth - 1);
    recursiveRect(-w / 2 + ww, -h / 2, w - ww, h, _depth - 1);
    // recursiveRect(-w / 2, -h / 2, w / 2, h, _depth - 1);
    // recursiveRect(0, -h / 2, w / 2, h, _depth - 1);
  }
  pop();
}