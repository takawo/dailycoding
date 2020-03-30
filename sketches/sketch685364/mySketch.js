let pallete = ["#A7B9FE", "#091252", "#E43227", "#092525", "#6D90CD", "#081A85", "#CEAED0", "#D4E0FF"];

let sw = 2.5;
const cols = 5;
const rows = cols;
const offset = 50;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(1);
  noLoop();
}

function draw() {
  blendMode(NORMAL);
  background(0, 0, 15);

  drawBackgroundNoise();

  let w = (width - offset * 2) / cols - offset / 4 * 2;
  let h = (height - offset * 2) / rows - offset / 4 * 2;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset) + offset / 4;
      let y = map(j, 0, cols, offset, width - offset) + offset / 4;

      blendMode(NORMAL);
      drawCells(x, y, w);
      blendMode(ADD);
      drawNoise(x, y, w);
    }
  }
	//saveCanvas("output.png");
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


function drawNoise(_x, _y, _size) {
  push();
  translate(_x, _y);
  for (let i = 0; i < 2500; i++) {
    let x = random(0, _size);
    let y = random(0, _size);
    let w = random(1, 3);
    let h = random(1, 3);
    noStroke();
    fill(0, 0, 100, 5);
    ellipse(x, y, w, h);
  }
  pop();
}

function drawCells(_x, _y, _size) {
  let step_num = 7;
  let step = _size / step_num;

  push();
  translate(_x, _y);
  let cells = [];
  for (let j = 0; j < step_num; j++) {
    cells[j] = [];
    for (let i = 0; i < step_num; i++) {
      cells[j][i] = false;
    }
  }
  for (let j = 0; j < step_num; j++) {
    for (let i = 0; i < step_num; i++) {
      let cellSizeMax = int(random(1, step_num / 2));
      for (let cellSize = cellSizeMax; cellSize > 0; cellSize--) {
        let isAlready = false;
        for (let l = j; l < j + cellSize; l++) {
          for (let k = i; k < i + cellSize; k++) {
            let l_ = constrain(l, 0, step_num - 1);
            let k_ = constrain(k, 0, step_num - 1);
            if (cells[l_][k_] == true) {
              isAlready = true;
            }
          }
        }
        if (isAlready == false) {
          let wc = step * cellSize;
          let hc = step * cellSize;
          let x = step * i;
          let y = step * j;
          if (x + wc > _size) {
            wc = _size - x;
          }
          if (y + hc > _size) {
            hc = _size - y;
          }
          let n = int(random(1000) + i + j * step_num) % pallete.length;
          fill(pallete[n]);
          stroke(0, 0, 100, 100);
          strokeWeight(sw);
          rect(x, y, wc, hc);
          for (let l = j; l < j + cellSize; l++) {
            for (let k = i; k < i + cellSize; k++) {
              let l_ = constrain(l, 0, step_num - 1);
              let k_ = constrain(k, 0, step_num - 1);
              cells[l_][k_] = true;
            }
          }
        }
      }
    }
  }
  pop();
}