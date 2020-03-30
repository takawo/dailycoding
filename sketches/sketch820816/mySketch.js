let cells, offset, margin, cellW;
let pallete = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#FDFDFD", "#02020C"];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.stroke(255, 10 / 100 * 255);
  let percent = 10 / 100;
  for (let i = 0; i < graphics.width * graphics.height * percent; i++) {
    graphics.strokeWeight(random(2));
    graphics.point(random(graphics.width),
      random(graphics.height));
  }
}

function draw() {
  let bgNum = int(random(pallete.length));
  let bg = pallete[bgNum];
  background(bg);
  pallete.splice(bgNum, 1);

  cells = int(random(3, 8));
  offset = width / 10;
  margin = offset / 10;
  let w = sqrt(sq(width) + sq(height));
  cellW = (w + offset * 2 - margin * (cells - 1)) / cells;

  push();
  translate(width / 2, height / 2);
  rotate(45);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -w / 2 - offset + i * (cellW + margin);
      let y = -w / 2 - offset + j * (cellW + margin);
      //rect(x,y,cellW,cellW);
      let cx = x + cellW / 2;
      let cy = y + cellW / 2;
      let n = int(random(pallete.length));
      drawShapes(cx, cy, sqrt(sq(cellW) * 2) / 1.8, n);
    }

  }
  pop();

  image(graphics, 0, 0);

  noLoop();
}

function drawShapes(x, y, dMax, n) {
  let colors = pallete.concat();

  let offset = width / 10;
  let d = dMax;
  let currentAngle = 0;
  let startAngle = int(random(8)) * 360 / 8;
  let count = n;
  let m = int(random(2, 5));
  while (currentAngle < 360 * m) {
    let color = colors[count % colors.length];
    push();
    translate(x, y);
    rotate(startAngle + currentAngle);
    fill(color+hex(200,2));
    noStroke();
    switch (int(random() * 5)) {
      case 0:
        arc(0, 0, d, d, 0, 90, PIE);
        break;
      case 1:
        rect(0, 0, d / 2, d / 2, d / 2, d / 2 / 50);
        break;
      case 2:
        triangle(d / 2, d / 2, 0, 0, 0, d / 2);
        break;
      case 3:
        ellipse(d / 2 / 2, d / 2 / 2, d / 2, d / 2);
        break;
      case 4:
        rect(0, 0, d / 2, d / 2,0,d / 5,0,d/5);
        break;
    }
    pop();
    d = d - d / 8;
    currentAngle += 45 / 1;
    count += 3;
  }
}