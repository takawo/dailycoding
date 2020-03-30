let bg;
let pallete = ["#2A7135", "#A38046", "#EEEEEE", "#F4B600", "#DD2720"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.stroke(0, 0, 10, 10);
  for (let i = 0; i < bg.width * bg.height * 10 / 100; i++) {
    bg.point(random(bg.width),
      random(bg.height));
  }
}

function draw() {
  let colors = pallete.concat();
  let bgNum = int(random(colors.length));
  background(colors[bgNum]);
  colors.splice(bgNum, 1);

  let ww = sqrt(sq(width) + sq(height));
  randomSeed(0);
  push();
  translate(width / 2, height / 2);
  rotate(int(random(4)) * 360 / 4 + 45);
  separateGrid(-ww / 2, -ww / 2, ww, colors);
  pop();

  image(bg, 0, 0);
  noLoop();
}


function separateGrid(x, y, d, colors) {
  let sepNum = int(random(1, 3));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 95 && d > width / 10) {
        separateGrid(i, j, w, colors);
      } else {
        //rect(i, j, w, w);
        let shapeNum = int(random(2));
        let direction = random(100) > 50 ? -1 : 1;
        let cx = i + w / 2;
        let cy = j + w / 2;
        drawBezierShape(cx, cy, w / 2, colors);
      }
    }
  }
}


function drawBezierShape(x, y, rr, colors) {
  push();
  translate(x, y);
  let g = createGraphics(rr * 2, rr * 2);

  g.colorMode(HSB, 360, 100, 100, 100);
  g.angleMode(DEGREES);

  g.fill(0, 0, 80);
  //g.noStroke();
  //g.rect(0, 0, rr*2, rr*2);
  g.push();
  g.translate(rr, rr);
  g.rotate(45 + int(random(4)) * 360 / 4);
  g.translate(-rr, 0);

  //g.rotate(random(360));
  let angleStep = 360 / int(random(5, 8));
  let noiseScale = int(random(1, 8)) * 50;
  let sep = random(4, 18);

  for (let r = rr * 3; r > 0; r -= rr * 3 / sep) {
    let c = colors[int(random(colors.length))];
    g.fill(c);
    g.noStroke();
    g.beginShape();
    for (let angle = 0; angle < 360; angle += angleStep) {
      let r1 = map(noise(angle / noiseScale), 0, 1, r / 2, r);
      let x1 = cos(angle) * r1;
      let y1 = sin(angle) * r1;
      vertex(x1, y1);
      let pRatio = random(2, 4);
      let px1 = x1 + cos(angle + 90) * r1 / pRatio;
      let py1 = y1 + sin(angle + 90) * r1 / pRatio;
      let angle2 = angle + angleStep;
      let r2 = map(noise(angle2 % 360 / noiseScale), 0, 1, r / 2, r);
      let x2 = cos(angle2) * r2;
      let y2 = sin(angle2) * r2;
      pRatio = random(2, 4);
      let px2 = x2 + cos(angle2 - 90) * r2 / pRatio;
      let py2 = y2 + sin(angle2 - 90) * r2 / pRatio;
      g.bezierVertex(px1, py1, px2, py2, x2, y2);
    }
    g.endShape();
  }
  imageMode(CENTER);
  image(g, 0, 0, g.width * 0.9, g.height * 0.9);

  pop();

}