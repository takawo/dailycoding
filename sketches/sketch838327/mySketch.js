let pallete = ["#EBE9E3", "#C9C3B5", "#040919", "#B3311F", "#F39E26", "#263E39", "#26AFBE"];
let w;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 20);
  w = sqrt(width * width + height * height);
}

function draw() {
  randomSeed(frameCount / 200);
  push();
  translate(width/2,height/2);
  rotate(45);
  translate(-w/2,-w/2);
  separateGrid(0, 0, w);
  pop();
  if (frameCount % 200 == 0) {
    background(0, 0, 20);
  }
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        drawFancyShape(i + w / 2, j + w / 2, w);
      }
    }
  }
}

function drawFancyShape(x, y, w) {
  push();
  translate(x, y);
  rotate(random(360));
  let points = [];
  let num = 8;
  let angleStep = 360 / num;
  let rMax = w * 0.65 * (200 - frameCount % 200) / 200;
  let cNum1 = int(x + y * width) % pallete.length;
  let cNum2 = cNum1;
  while (cNum1 == cNum2) {
    cNum2 = int(random(pallete.length));
  }
  colorMode(RGB);
  let c = lerpColor(color(pallete[cNum1]), color(pallete[cNum2]), (frameCount % 200) / 200);
  fill(c);
  noStroke();
  beginShape();
  let i = 0;
  for (let angle = 0; angle < 360; angle += angleStep) {
    let r = noise((x + y * width) / 400, angle / 300, frameCount / 150) * rMax;
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