let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallete;
const sw = 0.5;
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  pallete = createPallete(url);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 5);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }

  background(0, 0, 15);
  let w = sqrt(sq(width) + sq(height));
  push();
  translate(width / 2, height / 2);
  rotate(int(random(4)) * 360 / 4 + 45);
  separateGrid(-w / 2, -w / 2, w);
  pop();
  image(bg, 0, 0);
}


function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 2) {
        separateGrid(i, j, w);
      } else {
        drawCircularArcs(i, j, w);
      }
    }
  }
}

function drawCircularArcs(_x, _y, _r) {
  let separateCount = int(random(4, 10));
  push();
  translate(_x + _r / 2, _y + _r / 2);
  _r = _r * 1.15;

  rotate(int(random(12)) * 360 / 12);
  let angle = 0;
  while (angle < 360) {
    let n = int(random(separateCount / 4, separateCount / 2));
    let addAngle = n * 360 / separateCount;
    if (angle > 360 && angle + addAngle > 360) {
      addAngle = 360 - angle;
    }
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
      strokeWeight(sw);
      stroke(0, 0, 100, 30);
      arc(0, 0, r * 1 / 2, r * 1 / 2, i + angle, i + angle + addAngle, PIE);
      drawDust(r * 1 / 2, i + angle, i + angle + addAngle, cn);
      pop();
      r -= subR;
      i += 30 * int(random(1, 4));
      cn += int(random(1, pallete.length - 1));
    }
    angle += addAngle;
  }
  pop();
}

function drawDust(_r, _angleA, _angleB, _cn) {
  let rangeAngle = 25;
  let rangeR = 20;
  for (let i = 0; i < _r; i++) {
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
    fill(0, 0, 50, 10);
    noStroke();
    ellipse(x, y, w, h);
  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}