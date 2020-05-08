let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);
  texture.stroke(0, 0, 0, 5);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    texture.strokeWeight(random(2));
    texture.point(random(width), random(height));
  }
}

function draw() {
  blendMode(BLEND);
  background(0, 0, 90);
  image(texture,0,0);
  
	
  let cells = int(random(2,10));
  let offset = width / 10;
  let margin = offset / 15;
  let d = (width - offset * 2 - margin * (cells - 1)) / cells;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let cx = offset + i * (d + margin) + d / 2;
      let cy = offset + j * (d + margin) + d / 2;
      let c1 = color(0, 0, 100, 40);
      let c2 = color(30, 80, 100,50);
  blendMode(LIGHTEST);
      drawingContext.shadowColor = color(0, 0, 100);
      drawingContext.shadowBlur = d / 4;
      drawFancyShape(cx, cy, d, c1);
      let angle = random(360);
      let x = cx + cos(angle) * d / 4;
      let y = cy + sin(angle) * d / 4;
      blendMode(BLEND);
      drawingContext.shadowColor = color(0, 0, 0,10);
      drawingContext.shadowBlur = d / 4;
      drawFancyShape(x, y, d / 2.5, c2);
    }
  }
  // noLoop();
	frameRate(0.5);
}

function drawFancyShape(x, y, w, c) {
  push();
  translate(x, y);
  rotate(random(360));
  let points = [];
  let num = 8;
  let angleStep = 360 / num;
  let rMax = w * 0.65 * (200 - frameCount % 200) / 200;
  fill(c);
  noStroke();
  beginShape();
  let i = 0;
  for (let angle = 0; angle < 360; angle += angleStep) {
    let r = map(noise((x + y * width) / 400, angle / 400, frameCount / 150), 0, 1, 0.5, 1) * rMax;
    let xx = cos(angle) * r;
    let yy = sin(angle) * r;
    if (i < 3) {
      points.push(createVector(xx, yy));
    }
    curveVertex(xx, yy);
    i++;
  }
  for (let p of points) {
    curveVertex(p.x, p.y);
  }
  endShape();
  pop();
}