let pallete = ["#A5D1D9", "#EB6896", "#836890", "#46698D", "#0F6A8B"];
let colorArr = [];
let num = pallete.length;

let cellArr = [];

const cell_num = 8;
const cols = cell_num;
const rows = cell_num;
const offset = 40;
let sw;
let margin;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 10);
  blendMode(LIGHTEST);

  sw = constrain(abs(10 - cell_num), 3, 10);
  margin = sw;


  let w = (width - offset * 2 - margin * (cols - 1)) / cols;
  let h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let i = 0; i < num; i++) {
    colorArr.push(i);
  }
  for (let j = 0; j < rows; j++) {
    cellArr[j] = [];
    for (let i = 0; i < cols; i++) {
      cellArr[j][i] = -1;
    }
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let collection = [];

      for (let i = 0; i < num; i++) {
        collection.push(i);
      }

      let neighbors = [];
      let leftCol = constrain(i - 1, 0, cols - 1);
      let rightCol = constrain(i + 1, 0, cols - 1);
      let topRow = constrain(j - 1, 0, rows - 1);
      let bottomRow = constrain(j + 1, 0, rows - 1);

      if (leftCol != i) {
        let left = cellArr[j][leftCol];
        if (left != -1) {
          neighbors.push(left);
        }
      }
      if (rightCol != i) {
        let right = cellArr[j][rightCol];
        if (right != -1) {
          neighbors.push(right);
        }
      }
      if (topRow != j) {
        let top = cellArr[topRow][i];
        if (top != -1) {
          neighbors.push(top);
        }
      }
      if (bottomRow != j) {
        let bottom = cellArr[bottomRow][i];
        if (bottom != -1) {
          neighbors.push(bottom);
        }
      }

      for (let n of neighbors) {
        for (let c = collection.length - 1; c >= 0; c--) {
          if (n == collection[c]) {
            collection.splice(c, 1);
          }
        }
      }
      let m = int(random(collection.length));
      cellArr[j][i] = collection[m];
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);

      push();
      drawRandomShape(x, y, w, h, cellArr[j][i]);
      noStroke();
      //rect(0, 0, w, h,w/20);
      pop();
    }
  }
  drawNoise(15000);  
}

function drawRandomShape(_x, _y, _w, _h, _n) {
  push();
  translate(_x + _w / 2, _y + _h / 2);
  setStrokeAndFill(_n);
  let count = int(random(1, 6));
  switch (_n) {
    case 0:
      rectMode(CENTER);
      for (let i = 0; i < count; i++) {
        let d = map(i, 0, count, _w, _w * 1 / 4);
        rect(0, 0, d, d);
      }
      break;
    case 1:
      for (let i = 0; i < count; i++) {
        let d = map(i, 0, count, _w, _w * 1 / 4);
        circle(0, 0, d / 2);
      }
      break;
    case 2:
      rotate(int(random(4)) * 90);
      for (let i = 0; i < count; i++) {
        let d = map(i, 0, count, _w, _w * 1 / 4);
        arc(-_w / 2, 0, d, d, -90, 90);
      }
      break;
    case 3:
      rotate(int(random(4)) * 90);
      for (let i = 0; i < count; i++) {
        let d = map(i, 0, count, _w, _w * 1 / 4);
        arc(-_w / 2, -_h / 2, d * 2, d * 2, 0, 90);
      }
      break;
    case 4:
      rotate(int(random(4)) * 90);
      for (let i = 0; i < count; i++) {
        let d = map(i, 0, count, _w, _w * 1 / 4);
        triangle(-_w / 2, -_h / 2, -_w / 2, _h / 2, 0, -_h / 2);
      }
      break;
  }
  pop();
}

function setStrokeAndFill(_n) {
  if (random(100) < 50) {
    fill(pallete[_n % pallete.length]);
    noStroke();
  } else {
    noFill();
    stroke(pallete[_n % pallete.length]);
    strokeWeight(sw);
    strokeCap(ROUND);
    strokeJoin(ROUND);
  }
}

function drawNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    noStroke();
    fill(0, 0, 100,10);
    ellipse(x, y, w, h);
  }
}