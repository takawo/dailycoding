let graphics;
let img;
let texture;
let rs;
function preload() {
  img = loadImage("https://loremflickr.com/800/800/");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  graphics = createGraphics(width, height);
  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(10, texture);
  angleMode(DEGREES);
  background(0, 0, 15);
  image(texture, 0, 0);
	rs = random(10000);
}

function draw() {
  randomSeed(rs);
  graphics.clear();
  graphics.push();
  graphics.translate(width / 2, height / 2);
  let startAngle = random(360);
  graphics.rotate(-90);
  graphics.noFill();
  graphics.beginShape();
  for (let angle = 0; angle < 360; angle += .1) {
    let r = (1 - sq(noise(sin(tan(frameCount / 50) + angle / 2) * 3, cos(-frameCount / 10 + angle / 2) * 2, frameCount / 190))) * 200;
    graphics.vertex(cos(angle) * r, sin(angle) * r);
  }
  graphics.endShape(CLOSE);
  graphics.pop();
  imageMode(CENTER);
  let img2 = crop(img, 100, 100, width - 100, height - 100);
  img2.mask(graphics);
  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 10);
  image(img2, 0, 0, frameCount * 3, frameCount * 3);
  pop();
  if (frameCount > width / 2) {
    noLoop();
  }
}

function crop(image, x, y, w, h) {
  var cropped = createImage(w, h);
  cropped.copy(image, x, y, x + w, y + h, 0, 0, x + w, y + h)
  return cropped;
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 7);
  for (let i = 0; i < width * height * constrain(_n / 100, 0, 1); i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}