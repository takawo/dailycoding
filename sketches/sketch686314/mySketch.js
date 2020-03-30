let pallete = ["#7228FF", "#9D25E8", "#E51CFF", "#E825B0", "#FF2857"];
const cols = 3 ;
const rows = 3;
const offset = 40;
const margin = offset / 1;
const sw = 0.5;
let rs;
let separateCount = 10;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rs = random(10000);
}

function draw() {
  background(200, 50, 10);
  drawBackgroundNoise();
  //blendMode(DIFFERENCE);
  randomSeed(rs);
  let w = (width - offset * 2 - margin * (cols - 1)) / cols;
  let h = (height - offset * 2 - margin * (rows - 1)) / rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);
      let r = w;
      drawCircularArcs(x, y, r);
    }
  }

  //noLoop();
}

function drawCircularArcs(_x, _y, _r) {
  push();
  translate(_x + _r / 2, _y + _r / 2);
  rotate(random(360));
  let angle = 0;
  while (angle < 360) {
    let n = int(random(separateCount / 4, separateCount / 2));
    let addAngle = n * 360 / separateCount;
    // if (angle > 360 && angle + addAngle > 360) {
    //   addAngle = 360 - angle;
    // }
    let r = _r;
    let i = 1;
    let cn = 0;
    while (r > 0) {
      let m = int(random(separateCount / 2));
      let subR = m * _r / separateCount;
      if (r > 0 && r - subR < 0) {
        subR = r;
      }
      let x = cos(angle) * r * 1 / 2 / 2;
      let y = sin(angle) * r * 1 / 2 / 2;
      push();
      translate(x, y);
      rotate(180);
      fill(pallete[cn % pallete.length]);
      stroke(300,100,100);
			strokeWeight(sw);
      arc(0, 0, r * 1 / 2, r * 1 / 2, i + angle, i + angle + addAngle, PIE);
      drawDust(r * 1 / 2, i + angle, i + angle + addAngle, cn);
      pop();
      r -= subR;
      i += 15 * int(random(1, 4));
      cn += int(random(1, pallete.length - 1));
    }
    angle += addAngle;
  }
  pop();
}

function drawDust(_r, _angleA, _angleB, _cn) {
  let rangeAngle = 25;
  let rangeR = 20;
  for (let i = 0; i < _r ; i++) {
    let angle = random(_angleA - rangeAngle, _angleB + rangeAngle);
    let r = random(_r);
    let p = createVector(cos(angle) * r / 2, sin(angle) * r / 2);
    if (angle < _angleA || angle > _angleB) {
      stroke(pallete[abs(_cn - 1) % pallete.length]);
    } else {
      stroke(pallete[abs(_cn + 1) % pallete.length]);
    }
		strokeWeight(0.5);
    point(p.x, p.y);
  }
}

function drawBackgroundNoise() {
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(1, 3);
    let h = random(1, 3);
    fill(0, 0, 50,10);
    noStroke();
    ellipse(x, y, w, h);
  }
}