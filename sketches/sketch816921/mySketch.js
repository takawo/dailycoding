let bg;
let pallete = ["#242935", "#F38591", "#FFCA60", "#E4E1E1", "#6D91CE"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.stroke(0, 0, 10, 5);
  for (let i = 0; i < bg.width * bg.height * 10 / 100; i++) {
    bg.point(random(bg.width),
      random(bg.height));
  }
}

function draw() {
  background(0, 0, 70);
  let ww = sqrt(sq(width) + sq(height));


  push();
  translate(width / 2, height / 2);
  rotate(int(random(4)) * 360 / 4 + 45);
  separateGrid(-ww / 2, -ww / 2, ww);
  pop();

  image(bg, 0, 0);
  noLoop();
}


function separateGrid(x, y, d) {
  let sepNum = int(random(1, 3));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 95 && d > width / 15) {
        separateGrid(i, j, w);
      } else {

        let c1Num = int(random(pallete.length));
        let c2Num = int(random(pallete.length));
        while (c1Num == c2Num) {
          c1Num = int(random(pallete.length));
          c2Num = int(random(pallete.length));
        }
        fill(pallete[c1Num]);
        noStroke();
        //rect(i, j, w, w);
        let shapeNum = int(random(2));
        let direction = random(100) > 50 ? -1 : 1;
        let cx = i + w / 2;
        let cy = j + w / 2;
        let c = pallete[c2Num];
        fill(c);
        drawBezierShape(cx, cy, w / 2 * 1.05);
      }
    }
  }
}


function drawBezierShape(x, y, r) {
  push();
  translate(x, y);
  rotate(random(360));
  let angleStep = 360 / int(random(5, 8));
  let noiseScale = int(random(1, 8)) * 10;

  beginShape();
  for (let angle = 0; angle < 360; angle += angleStep) {
    let r1 = map(noise(angle / noiseScale), 0, 1, r / 2, r);
    let x1 = cos(angle) * r1;
    let y1 = sin(angle) * r1;
    vertex(x1, y1);
    let pRatio = random(2,4);
    let px1 = x1 + cos(angle + 90) * r1 / pRatio;
    let py1 = y1 + sin(angle + 90) * r1 / pRatio;
    let angle2 = angle + angleStep;
    let r2 = map(noise(angle2 % 360 / noiseScale), 0, 1, r / 2, r);
    let x2 = cos(angle2) * r2;
    let y2 = sin(angle2) * r2;
    pRatio = random(2,4);
    let px2 = x2 + cos(angle2 - 90) * r2 / pRatio;
    let py2 = y2 + sin(angle2 - 90) * r2 / pRatio;
    bezierVertex(px1, py1, px2, py2, x2, y2);
    // line(px1, py1, x1, y1);
    // line(px2, py2, x2, y2);
    // ellipse(x1, y1, 10, 10);
    // ellipse(x2, y2, 10, 10);

  }
  endShape();

  pop();

}