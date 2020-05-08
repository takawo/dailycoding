let ns = 80;
let ww;
let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  texture = createGraphics(width, height);
  texture.stroke(255, 10 / 100 * 255);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    texture.strokeWeight(random(3));
    texture.point(random(width),
      random(height));
  }
}

function draw() {
  background(0, 0, 20);
  for (let i = 0; i < 10; i++) {
    let rw = map(i, 0, 10, width / 3.5, width / 20);
    let rh = map(i, 0, 10, height / 3.5, height / 20);
    let n = 10 - i;
    drawEllipses(width / 2, height / 2, rw, rh, n, 10);
    drawEllipses(0, 0, rw, rh, n, 10);
    drawEllipses(width, 0, rw, rh, n, 10);
    drawEllipses(0, height, rw, rh, n, 10);
    drawEllipses(width, height, rw, rh, n, 10);
  }
  image(texture, 0, 0);
  noLoop();
}

function drawEllipses(x, y, w, h, n, nMax) {
  push();
  translate(x, y);
  noStroke();
  ellipse(0, 0, w * 2, h * 2);
  // stroke(0,0,0,n/nMax*100);
  drawingContext.shadowColor = color(0, 0, 0, 10);
  drawingContext.shadowBlur = 30;
  rotate(360 / nMax * n);
  for (let angle = 0; angle < 360; angle += 1) {
    let x = cos(angle) * w;
    let y = sin(angle) * h;
    //ellipse(x,y,10,10);
    push();
    translate(x, y);
    rotate(-angle);
    let r = sin(angle * nMax) * sin(angle * nMax) * w / 3;
    ellipse(-r / 2, 0, r, r);
    pop();
  }
  pop();
}