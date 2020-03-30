let cells, cols, rows;
let offset, margin;
let cellW, cellH;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(2);
}

function draw(){

  background(0, 0, 90);

  cells = int(random(5, 10));
  let colStart;
  if (cells % 2 == 0) {
    cols = cells / 2;
    colStart = 0;
  } else {
    cols = ceil(cells / 2);
    colStart = 0.5;
  }
  rows = cells;

  offset = 0;
  margin = 0;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cells;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  let num = 2;
  
  if (cells % 2 == 0) {
    for (let j = 0; j < rows; j++) {
      for (let i = colStart; i < cols; i++) {
        let x = map(i, 0, cols - 1, width / 2, 0 + cellW);
        let x2 = map(i, 0, cols - 1, width / 2, width - cellW);
        let y = map(j, 0, rows - 1, 0, height - cellH);

        let b = int(random(num)) * 100 / (num-1);
        fill(0, 0, 0,b);
        stroke(0, 0, 100);
        noStroke();
        rect(x, y, -cellW, cellH);
        rect(x2, y, cellW, cellH);
      }
    }
  } else {

    for (let j = 0; j < rows; j++) {
      for (let i = colStart; i < cols; i++) {
        let x = map(i, 0.5, cols - 1, width / 2 + cellW / 2, cellW * 3 / 2);
        let x2 = map(i, 0.5, cols - 1, width / 2 - cellW / 2, width - cellW * 3 / 2);
        let y = map(j, 0, rows - 1, 0, height - cellH);
         let b = int(random(num)) * 100 / (num-1);
       fill(0, 0, 0,b);
        stroke(0, 0, 100);
        noStroke();
        rect(x, y, -cellW, cellH);
        if(i != 0.5){
        rect(x2, y, cellW, cellH);
        }
      }
    }
  }
}