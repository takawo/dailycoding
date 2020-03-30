let g;
let bg;
let pallete = ["#030B45","#DCB15B","#E2656F","#CD9B98","#1840A4","#F5E39E"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  frameRate(1.5);
  g = createGraphics(width, height);
  g.colorMode(HSB,360,100,100,100);
  for (let i = 0; i < width * height * 5 / 100; i++) {
    g.fill(0,0,100,7);
    g.noStroke();
    g.ellipse(
      random(width),
      random(height),
      random(1, 3),
      random(1, 3)
    );
  }
}

function draw() {
  let colors = pallete.concat();
  let bgNum = int(random(colors.length));
  bg = colors[bgNum];
  colors.splice(bgNum,1);
  background(bg);
  let cells = int(random(3, 10));
  let offset = width / 10;
  let margin = 0;
  let cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellSize + margin) + cellSize / 2;
      let y = offset + j * (cellSize + margin) + cellSize / 2;
      push();
      translate(x, y);
      let rotateNum = int(random(4)) * 360 / 4;
      rotate(rotateNum);
      let d = cellSize / 2;
      strokeCap(SQUARE);
      strokeWeight(cellSize/20);
      noFill();
      stroke(random(colors));
      arc(-d, -d, cellSize, cellSize, 0, 90);
      stroke(random(colors));
      arc(d, d, cellSize, cellSize, 180, 270);
      stroke(random(colors));
      point(-d,d);
      stroke(random(colors));
      point(d,d);
      stroke(random(colors));
      point(-d,-d);
      stroke(random(colors));
      point(d,-d);
      pop();
    }
  }
  image(g,0,0);
}