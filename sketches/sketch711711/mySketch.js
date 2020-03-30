let graphics;
let graphics_cell = [];
let cells, cols, rows;
let cellW, cellH;
let noiseScale = 800;
let font;

function preload(){
  font = loadFont("AbrilFatface-Regular.ttf");
}


function setup() {
  createCanvas(800, 400);
  colorMode(HSB, 360, 100, 100, 100);
  graphics = createGraphics(width / 2, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.textFont(font);
  graphics.textSize(400);
  graphics.textAlign(CENTER, CENTER);
  graphics.fill(0, 0, 100);
  graphics.text("C", graphics.width / 2, graphics.height / 2-graphics.height/5);
  cells = int(random(2, 8));
  cols = cells;
  rows = cells;
}

function init() {

  cellW = graphics.width / cols;
  cellH = graphics.height / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, 0, graphics.width);
      let y = map(j, 0, rows, 0, graphics.height);

      let wave = int(sin(frameCount * 0.1 + (x * y)/100) * cellW/5);

      x += wave;

      let g = createGraphics(cellW, cellH);
      g.copy(graphics,
        x, y, cellW, cellH,
        0, 0, cellW, cellH);
      graphics_cell.push(g);
    }
  }
}



function draw() {
  graphics_cell = [];
  init()
  background(0,0,10);
  image(graphics, 0, 0);
  push();
  translate(width / 2, 0);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let n = j * cols + i;
      let x = map(i, 0, cols, 0, graphics.width);
      let y = map(j, 0, rows, 0, graphics.height);
      ///rect(x, y, cellW, cellH);
      image(graphics_cell[n], x, y);
    }
  }
  pop();
  noLoop();
}