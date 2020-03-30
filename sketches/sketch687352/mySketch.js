let pallete = ["#104E5A", "#040B11", "#D51515", "#E57910", "#AA3512","#A6B9BA"];

let sep = 4;
const cols = sep;
const rows = sep;
const offset = 40;
let margin = offset / 2;
let text_size = 7;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(SCREEN);

  noLoop();
}

function draw() {
  background(0, 0, 0,75);

  drawBackgroundNoise(30000);

  let w = (width - offset * 2 - margin * (cols - 1)) / cols;
  let h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {

      let x = map(i, 0, cols, offset + margin / 2, width - offset - margin / 2);
      let y = map(j, 0, rows, offset + margin / 2, height - offset - margin / 2);

      let n = int(random(cols * 0.5, cols * 3));
      let cell = createCells(n);

      drawCell(cell, x, y, w, h, color(0, 0, 100), 0);
    }
  }
	//saveCanvas("output.png");
}

function drawCell(_cell, _x, _y, _w, _h, _color, _angle) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
	let r = int(random(4));
  let rotate_num =  r* 90;
	if(r %2 == 1){
		let _temp = _w;
		_w = _h;
		_h = _temp;
	}
  rotate(rotate_num);
  for (let j = 0; j < _cell.length; j++) {
    for (let i = 0; i < _cell[j].length; i++) {

      let x = i * _w / _cell[j].length - _w / 2;
      let y = j * _h / _cell.length - _h / 2;
      if (_cell[j][i] == -1) {
        let cellSize = int(random(1, (_cell.length - i) / 1.5));
        let cellSq = cellSize * cellSize;
        let cellCount = 0;
        while (abs(cellCount) < cellSq) {
          let isBound = false;
          cellCount = 0;
          for (let m = j; m < j + cellSize; m++) {
            for (let l = i; l < i + cellSize; l++) {
              if (l > _cell[j].length - 1 || m > _cell.length - 1) {
                isBound = true;
              } else if (_cell[m][l] != -1) {
                isBound = true;
              }
              cellCount += _cell[j][i];
            }
          }
          if (isBound) {
            cellSize -= 1;
            cellSize = max(cellSize, 1);
            cellSq = cellSize * cellSize;
            break;
          }
          if (cellSq == abs(cellCount)) {
            let n = int(random(pallete.length));
            let m = int(random(pallete.length));
            while (n == m) {
              m = int(random(pallete.length));

            }
            fill(pallete[n]);
            rect(x, y, cellSize * _w / _cell.length, cellSize * _h / _cell.length);
            drawArcInRect(x, y, cellSize * _w / _cell.length, cellSize * _h / _cell.length, cellSize, n);
            for (let m = j; m < j + cellSize; m++) {
              for (let l = i; l < i + cellSize; l++) {
                _cell[m][l] = cellSize;
              }
            }
          } else {
            cellSize -= 1;
            cellSq = cellSize * cellSize;
          }
        }
      } else {

      }
      if (_cell[j][i] == -1) {
        _cell[j][i] = 1;
        let n = int(random(pallete.length));
        let m = int(random(pallete.length));
        while (n == m) {
          m = int(random(pallete.length));

        }
        fill(pallete[n]);
        rect(x, y, 1 * _w / _cell.length, 1 * _h / _cell.length);
        drawArcInRect(x, y, 1 * _w / _cell.length, 1 * _h / _cell.length, int(random(1, 3)), n);
        fill(0, 0, 0);
      }
    }
  }
  pop();
}

function drawArcInRect(_x, _y, _w, _h, _div, _cn) {
  let n = int(random(0, 4));
  let cn = _cn;
  let cm = cn;
  while (cm == cn) {
    cm = int(random(pallete.length));
  }
  for (let i = _div; i > 0; i--) {
    fill(pallete[cm]);
    let w = map(i, 0, _div, 0, _w);
    let h = map(i, 0, _div, 0, _h);
    switch (n) {
      case 0:
        arc(_x, _y, w * 2, h * 2, n * 90, (n + 1) * 90, PIE);
        break;
      case 1:
        arc(_x + _w, _y, w * 2, h * 2, n * 90, (n + 1) * 90, PIE);
        break;
      case 2:
        arc(_x + _w, _y + _h, w * 2, h * 2, n * 90, (n + 1) * 90, PIE);
        break;
      case 3:
        arc(_x, _y + _h, w * 2, h * 2, n * 90, (n + 1) * 90, PIE);
        break;
    }
    cn = cm;
    while (cm == cn) {
      cm = int(random(pallete.length));
    }
  }
}

function createCells(_n) {
  let _arr = [];
  for (let j = 0; j < _n; j++) {
    _arr[j] = [];
    for (let i = 0; i < _n; i++) {
      _arr[j][i] = -1;
    }
  }
  return _arr;
}

function drawBackgroundNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 3);
    let h = random(1, 3);
    noStroke();
    fill(0, 0, 50, 15);
    ellipse(x, y, w, h);
  }
}

function drawNoise(_x, _y, _w,_h,_n,_c) {
  push();
  translate(_x, _y);
  for (let i = 0; i < _n; i++) {
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