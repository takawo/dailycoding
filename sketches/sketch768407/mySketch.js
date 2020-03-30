let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  
  let percent = 10 / 100;
  for (let i = 0; i < width * height * percent; i++) {
    let x = random(width);
    let y = random(height);
    let dw = random(3);
    let dh = random(3);
    graphics.fill(0, 0, 0, 5);
    graphics.noStroke();
    graphics.ellipse(x, y, dw, dh);
  }
}

function draw() {
  background(0, 0, 90);

  let cells = int(random(5, 15));
  let offset = width / 10;
  let margin = 0; //offset / 5;
  let w = sqrt(sq(width) + sq(height));
  let cellSize = (w + offset * 2 - margin * (cells - 1)) / cells;

  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360 / 8);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let cx = -w / 2 - offset + i * (cellSize + margin) + cellSize / 2;
      let cy = -w / 2 - offset + j * (cellSize + margin) + cellSize / 2;
      let num = max(int(random(3) * 3), 2);
      // rectMode(CENTER);
      // rect(cx,cy,cellSize,cellSize);
      if (random(100) < 30) {
        drawLineTriangle(cx, cy, cellSize / 2, num);
      } else {
        drawLineArc(cx, cy, cellSize / 2, num);
      }
    }
  }
  pop();
  frameRate(.5);
  image(graphics,0,0);  
}

function drawLineArc(x, y, d, num) {
  push();
  translate(x, y);
  for (let i = 0; i < num; i++) {
    push();
    rotate(int(random(4)) * 360 / 4);
    for (let dd = d * 2 * 2; dd >= 0; dd -= d * 2 / 3) {
      arc(-d, -d, dd, dd, 0, 90);
    }
    pop();
  }

  pop();
}


function drawLineTriangle(x, y, d, num) {
  let rotateArr = [0, 90, 180, 360];
  let rotateArrCopy = rotateArr.concat();
  push();
  translate(x, y);
  for (let i = 0; i < num; i++) {
    push();
    rotate(int(random(4)) * 360 / 4);
    for (let dd = 0; dd <= d; dd += d / 3) {
      fill(0, 0, 100);
      noStroke();
      triangle(0, 0 - dd, -d + dd, -d, d - dd, -d);
      stroke(0);
      line(0, 0 - dd, -d + dd, -d);
      line(0, 0 - dd, d - dd, -d);
    }
    pop();
  }
  pop();
}