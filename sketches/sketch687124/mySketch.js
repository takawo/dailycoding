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

  noLoop();
  //randomSeed(130);
  textSize(text_size);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0, 0, 80);


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
}

function drawCell(_cell, _x, _y, _w, _h, _color, _angle) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  let rotate_num = int(random(4)) * 90;
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
            fill(0, 0, 100);
            rect(x, y, cellSize * _w / _cell.length, cellSize * _h / _cell.length);
            drawArcInRect(x, y, cellSize * _w / _cell.length, cellSize * _h / _cell.length, cellSize);
            for (let m = j; m < j + cellSize; m++) {
              for (let l = i; l < i + cellSize; l++) {
                _cell[m][l] = cellSize;
              }
            }
          } else {
            cellSize -= 1;
            cellSq = cellSize * cellSize;
          }
          // fill(0, 0, 0);
          // push();
          // translate(x + _w / _cell.length / 2, y + _h / _cell.length / 2);
          // rotate(-rotate_num);
          // text(cellSize, 0, 0);
          // pop();
        }
      } else {
        // fill(0, 0, 0);
        // push();
        // translate(x + _w / _cell.length / 2, y + _h / _cell.length / 2);
        // rotate(-rotate_num);
        // text(_cell[j][i], 0, 0);
        // pop();

      }
      if (_cell[j][i] == -1) {
        _cell[j][i] = 1;
        fill(0, 0, 100);
        rect(x, y, 1 * _w / _cell.length, 1 * _h / _cell.length);
        drawArcInRect(x, y, 1 * _w / _cell.length, 1 * _h / _cell.length,1);
        fill(0, 0, 0);
        // push();
        // translate(x + _w / _cell.length / 2, y + _h / _cell.length / 2);
        // rotate(-rotate_num);
        //text(_cell[j][i], 0, 0);
        // pop();
      }
    }
  }
  pop();
}

function drawArcInRect(_x, _y, _w, _h, _div) {
  let n = int(random(0, 4));
  for (let i = _div; i > 0; i--) {
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