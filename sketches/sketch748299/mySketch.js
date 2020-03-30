let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete = ["#071D10","#E7A78E","#FECA21","#264E3B","#071D10","#D4A54C","#DFD2D1","#C15539"];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let bgNum = int(random(pallete.length));
  background(pallete[bgNum]);
  pallete.splice(bgNum,1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  
  cells = int(random(4, 10));
  cols = cells;
  rows = cells;
  
  offset = width / 10;
  margin = offset / 5;

  let w = sqrt(sq(width / 2) + sq(height / 2));
  
  cellW = (w * 2 + offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w * 2 + offset * 2 - margin * (rows - 1)) / rows;
  angleMode(DEGREES);
  strokeJoin(ROUND);
  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 360/4);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i,0,cols-1,-w-offset,w+offset-cellW);
      let y = map(j,0,rows-1,-w-offset,w+offset-cellW);
      circle(x,y,50);
      let arr = [];
      push();
      translate(x,y);
      let rMax = cellW/sqrt(3)*0.8;
      recursiveTriangles(arr, 0, int(random(2,4)),rMax);
      pop();
    }
  }
  pop();
  image(graphics, 0, 0);
}

function recursiveTriangles(arr, depth, max,rMax=width/2) {
  noStroke();
  fill(random(pallete));
  if (depth > max) {
    return;
  }
  if (depth == 0) {
    let r = rMax;
    let startAngle = int(random(12)) * 360 / 12;
    stroke(0,0,90);
    strokeWeight(15-cells);
    beginShape();
    for (let angle = startAngle; angle < 360 + startAngle; angle += 360 / 3) {
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      arr.push(createVector(x, y));
      vertex(x, y);
    }
    endShape(CLOSE);
    noStroke();
  }
  let target = int(random(arr.length));
  let next = (target + 1) % arr.length;
  let current = p5.Vector.lerp(arr[target], arr[next], 0.5);
  fill(random(pallete));
  triangle(arr[target].x, arr[target].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  recursiveTriangles([arr[target], arr[(next + 1) % arr.length], current], depth + 1, max);
  fill(random(pallete));
  triangle(arr[next].x, arr[next].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  recursiveTriangles([arr[next], arr[(next + 1) % arr.length], current], depth + 1, max);
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}