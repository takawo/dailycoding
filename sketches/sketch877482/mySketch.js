let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  
    texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);
  texture.stroke(0, 0, 0, 3);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    texture.strokeWeight(random(2));
    texture.point(random(width), random(height));
  }
}

function draw() {
  background(0, 0, 95);
  let offset = width / 10;
  for (let y = -offset*2; y <= height+offset*2; y += offset) {
    drawLineRoundedRect(-offset, y, width + offset, y+offset*2, offset);
  }
  image(texture,0,0);
}

function drawLineRoundedRect(x1, y1, x2, y2, dMax) {
  let d = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  drawingContext.shadowColor = color(0, 0, 0, 10);
  drawingContext.shadowOffsetY = dMax/8;
  drawingContext.shadowOffsetY = dMax/8;
  drawingContext.shadowBlur = dMax / 8;
  translate(x1, y1);
  rotate(angle);
  // line(0, 0, d, 0);
  let x = 0;
  let xStep;
  stroke(0, 0, 100);
  fill(random(30, 50), random(10,50), 100);
  beginShape();
  vertex(0, 0);
  while (x < d) {
    xStep = random(d / 8, d / 4);
    let r = xStep / 4;
    if (xStep + x > d) xStep = d - x;
    vertex(x, -dMax + dMax / 2);
    for (let a = 180; a < 270; a++) {
      let xn = x + r / 2 + cos(a) * r / 2;
      let yn = -dMax / 2 + sin(a) * r / 2;
      vertex(xn, yn);
    }
    vertex(x + xStep / 2 - r / 2, -dMax / 2 - r / 2);
    for (let a = 270; a < 360; a++) {
      let xn = x + xStep / 2 - r / 2 + cos(a) * r / 2;
      let yn = -dMax / 2 + sin(a) * r / 2;
      vertex(xn, yn);
    }


    vertex(x + xStep / 2, 0);
    vertex(x + xStep, 0);
    x += xStep;

  }
  vertex(d, 0);
  endShape();
  pop();
  noLoop();
}