

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 95);
  push();
  translate(width/2,height/2);
  let w = sqrt(sq(width) + sq(height));
  rotate(int(random(4)) * 360/4+45);
  separateGrid(-w/2, -w/2, w);
  pop();
  frameRate(1);
  //noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
        let n = int(random(1,29));
        drawPattern(i,j,w,w,n);
      }
    }
  }
}

function drawPattern(_x, _y, _w, _h, _n) {
  for (let j = _x; j <= _x + _h; j++) {
    for (let i = _y; i <= _y + _w; i++) {
      let m = int(j * _w + i);
      if (m % _n == 0) {
        point(i, j);
      }
    }
  }
}