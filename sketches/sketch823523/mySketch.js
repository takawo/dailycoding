let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.stroke(255, 15 / 100 * 255);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    graphics.point(random(width),
      random(height));
  }


}

function draw() {
  background(20);
  let ww = sqrt(sq(width) + sq(height));

  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360 / 8);
  separateGrid(-ww / 2, -ww / 2, ww);
  pop();
  image(graphics, 0, 0);
  frameRate(1);
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 3));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 4) {
        separateGrid(i, j, w);
      } else {
        //rect(i,j,w,w);
        drawCircularArc(i + w / 2, j + w / 2, w * 0.85);
      }
    }
  }
}


function drawCircularArc(x, y, rMax) {
  let rStep = rMax / int(random(4, 10));

  push();
  translate(x, y);
  for (let r = rMax; r > 0; r -= rStep) {
    let startAngle = random(360);
    let angleSep = 4 //int(random(3, 10));
    let endAngle = (startAngle + (int(random(angleSep - 1)) * (360 / angleSep))) % 360;
    if (startAngle > endAngle) {
      let temp = startAngle;
      startAngle = endAngle;
      endAngle = temp;
    }
    if (startAngle == endAngle) {
      endAngle += 360;
    }
    rotate(int(random(8)) * 360 / 8);
    stroke(0, 0, 15);
    strokeWeight(rMax / 50);
    noFill();
    arc(0, 0, r + 2, r + 2, startAngle, endAngle, PIE);
    for (let angle = startAngle; angle < endAngle; angle += .5) {
      stroke(angle % 360, map(sin(angle * 3), -1, 1, 0, 80), 100);
      strokeWeight(rMax / 100);
      line(0, 0, cos(angle) * r / 2, sin(angle) * r / 2);
    }
  }
  pop();

}