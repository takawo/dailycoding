let img;
let baseEyeAngle;

function preload() {
  img = loadImage("eyes.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  baseEyeAngle = int(random(4)) * 360 / 4 + 45;
}

function draw() {
  background(0, 0, 10);
  let r = width / 2 * 0.65;
  drawBezierShape(width / 2, height / 2, width, this);
  //noLoop();
}

function drawObakeShape(x, y, r) {
  push();
  translate(width / 2, height / 2);
  rotate(-90);
  for (let angle = 0; angle < 360; angle++) {
  }
  pop();
}

function drawBezierShape(x, y, rr, g) {
  randomSeed(0);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.angleMode(DEGREES);
  g.push();
  g.translate(x, y);
  g.rotate(-90);
  g.noFill(0, 0, 0);
  g.stroke(0, 0, 100);
  g.strokeWeight(1.2);

  let angleStep = 360 / int(random(8, 12));
  let noiseScale = int(random(4, 8)) * 50;
  let sep = 1;
  random(4, 18);

  let r1Sum = 0;
  let r2Sum = 0;
  let i = 0;
  for (let r = rr / 2; r > 0; r -= rr / 2 / sep) {
    g.beginShape();
    //g.rotate(random(360));
    for (let angle = 0; angle < 360; angle += angleStep) {
      let r1 = map(noise(angle / noiseScale, frameCount / noiseScale), 0, 1, r / 4, r);
      let x1 = cos(angle) * r1;
      let y1 = sin(angle) * r1;
      vertex(x1, y1);
      let pRatio = random(2, 8);
      let px1 = x1 + cos(angle + 90) * r1 / pRatio;
      let py1 = y1 + sin(angle + 90) * r1 / pRatio;
      let angle2 = angle + angleStep;
      let r2 = map(noise(angle2 % 360 / noiseScale, frameCount / noiseScale), 0, 1, r / 4, r);
      let x2 = cos(angle2) * r2;
      let y2 = sin(angle2) * r2;
      pRatio = random(2, 4);
      let px2 = x2 + cos(angle2 - 90) * r2 / pRatio;
      let py2 = y2 + sin(angle2 - 90) * r2 / pRatio;
      g.bezierVertex(px1, py1, px2, py2, x2, y2);
      r1Sum += r1;
      r2Sum += r2;
      i++;
    }
    g.endShape();
  }
  g.rotate(90);
  drawEyes(0, 0, lerp(r1Sum / i * 3, r2Sum / i * 3, 0.5), g);
  g.pop();
}

function drawEyes(x, y, rr, g) {
  g.imageMode(CENTER);
  g.push();
  g.translate(x, y);
  let nAngle = map(noise(x / 800, y / 800, frameCount / 800), 0, 1, -90, 90);
  g.translate(cos(baseEyeAngle + nAngle) * rr / 5, sin(baseEyeAngle + nAngle) * rr / 5);
  g.scale(-1, 1);
  g.image(img, 0, 0,img.width/3,img.height/3);
  g.pop();
}