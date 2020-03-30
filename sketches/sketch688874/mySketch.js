let colorArr = [];
let num = 10;

let cellArr = [];

const cell_num = 10;
const cols = cell_num;
const rows = cell_num;
const offset = 40;
const margin = offset / 5;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 100);
  

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
      translate(x + w / 2, y + h / 2);
      rectMode(CENTER);
      fill(220,80,cellArr[j][i] * 100 / colorArr.length);
      rect(0, 0, w, h);
      textSize(20);
      textAlign(CENTER, CENTER);
      fill(0, 0, 0);
      stroke(0, 0, 100);
      strokeJoin(ROUND);
      strokeWeight(3);
      text(cellArr[j][i], 0, 0);
      pop();
    }
  }
}