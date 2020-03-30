// inspired from https://twitter.com/cocopon/status/1101132375721799680

const cols = 8;
const rows = 8;
const offset = 50;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 90);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);
      let d = (width - offset * 2) / cols;
      //let n = floor(random(5));
      let m = map(sin(frameCount / 3 + x + y * width), -1, 1, 500, 1000);
      let n = floor(noise(x / 5, y / 3, frameCount / m) * 5);
      n = (n + i + j * cols)%5;
      noStroke();
      fill(0,0,20);
      drawArc(n, x, y, d);
    }
  }
  //noLoop();
}

function drawArc(_n, _x, _y, _d) {
  switch (_n) {
    case 0:
      arc(_x, _y, _d * 2, _d * 2, 0, 90);
      break;
    case 1:
      arc(_x + _d, _y, _d * 2, _d * 2, 90, 180);
      break;
    case 2:
      arc(_x, _y + _d, _d * 2, _d * 2, 270, 360);
      break;
    case 3:
      break;
    case 4:
      arc(_x + _d, _y + _d, _d * 2, _d * 2, 180, 270);
      break;
  }
}