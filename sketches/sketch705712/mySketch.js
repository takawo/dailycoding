let cells, cols, rows;
let offset, margin;
let w, h;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  init();
  noLoop();
}

function init() {
  cells = int(random(3, 15));
  cols = cells;
  rows = cells;

  offset = width / cells / int(random(3, 8));
  margin = offset / int(random(1, 3));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  background(0,0,90);
  
  let jStep = 1;
  for (let j = 0; j < rows; j+=jStep) {
    let iStep = 1;
      jStep = int(random(1,3));
      if(j + jStep > rows){
        jStep = rows - j;
      }
      let ch = h * jStep + margin * (jStep -1);
    for (let i = 0; i < cols; i+= iStep) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      iStep = int(random(1,3));
      if(i + iStep > cols){
        iStep = cols - i;
      }
      let cw = w * iStep + margin * (iStep -1);
      rect(x,y,cw,ch);
    }
  }
}
