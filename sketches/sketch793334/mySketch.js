function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);

  let offset = width / 10;
  let gWidth = width - offset * 2;
  let g = createGraphics(gWidth / 2, gWidth);
  g.background(120);
  g.textAlign(CENTER, CENTER);
  g.textSize(300);
  g.text("d", g.width, height / 2);
  separateGrid(0, 0, g.height, g)
  push();
  translate(offset, offset);
  image(g, 0, 0);
  pop();
  push();
  translate(width - offset, offset);
  scale(-1, 1);
  image(g, 0, 0);
  pop();
  noLoop();
}



function separateGrid(x, y, d, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 30) {
        separateGrid(i, j, w, g);
      } else {
        g.rect(i, j, w, w);
      }
    }
  }
}