function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 95);
  separateGrid(0, 0, width);
  frameRate(1);
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
				let ww = w -5;
        let rotate_num = int(random(4)) * 360/4;
        for(let n = 0; n < 2; n++){
        let sep = int(random(5,10));
        push();
        translate(i+w/2,j+w/2);
        rotate(n * 360/2 + rotate_num);
				triangle(-ww/2,-ww/2,ww/2,ww/2,-ww/2,ww/2);
        drawTrianglePattern(-ww/2,-ww/2, ww, ww,sep);
        pop();
        }
      }
    }
  }
}

function drawTrianglePattern(_x, _y, _w, _h,sep) {
  for (let j = 0; j < _h; j++) {
    for (let i = 0; i < _w; i++) {
      if (int(_x + _y * width + j * _w + i) % sep == 0 && j > i) {
        point(_x+i, _y+j);
      }
    }
  }
}