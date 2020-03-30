// color pallete is referred to @haiji505 's Daily Pattern #021
// https://dribbble.com/shots/6155438-Daily-Pattern-021

let pallete = ["#E9E5DB", "#562E11", "#C5A9A0", "#B31704", "#69523D", "#C08C73"];

const cols = 3;
const rows = cols;
const offset = 40;
const margin = 25;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background("#E9E5DB");
  drawBackgroundNoise();
  let w = (width - offset * 2 - margin * (cols-1)) / cols;
  let h = (height - offset * 2 - margin * (rows-1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * w + margin * i;
      let y = offset + j * h + margin * j;
      drawPattern(x, y, w, h);
      drawNoise(x, y, w, h);
    }
  }
	//saveCanvas("output.png");
}

function drawPattern(_x, _y, _w, _h) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(int(random(4)) * 90);
  let x = -_w / 2;
  let y = -_h / 2;
  let xStep = _w / int(random(2, 10));
  let yStep = _h / int(random(2, 10));
  let pn = -1;

  if (x + xStep > _w / 2) {
    xStep = _w / 2 - x;
  }
  if (y + yStep > _h / 2) {
    yStep = _h / 2 - y;
  }

  while (y < _h / 2) {
    while (x < _w / 2) {
      let n = int(random(pallete.length));
      while (pn == n) {
        n = int(random(pallete.length));
      }
      fill(pallete[n]);
      stroke("#090504");
      strokeWeight(2);
      rect(x, y, xStep, yStep);
      pn = n;
      x += xStep;
      xStep = _w / int(random(2, 10))
      if (x + xStep > _w / 2) {
        xStep = _w / 2 - x;
      }
    }
    y += yStep;
    yStep = _h / int(random(2, 10));
    if (y + yStep > _h / 2) {
      yStep = _h / 2 - y;
    }
    x = -_w / 2;
  }
  pop();
}

function drawBackgroundNoise() {
  for (let i = 0; i < 25000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 3);
    let h = random(1, 3);
    noStroke();
    fill(0, 0, 50, 15);
    ellipse(x, y, w, h);
  }
}


function drawNoise(_x, _y, _w,_h) {
  push();
  translate(_x, _y);
  for (let i = 0; i < 2500; i++) {
    let x = random(0, _w);
    let y = random(0, _h);
    let w = random(1, 3);
    let h = random(1, 3);
    noStroke();
    fill(0, 0, 100, 5);
    ellipse(x, y, w, h);
  }
  pop();
}