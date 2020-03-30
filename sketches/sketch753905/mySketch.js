let colors = ["#0C1C14", "#1A4F27", "#B3BFAD", "#4E5A31", "#DBE7E4", "#916148", "#668E47", "#A5AD4F"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  //背景描画
  background(20);

  //グリッドを45°回転させる前提で，画面を覆う大きさの幅を計算する
  let w = sqrt(sq(width) + sq(height));

  let cells = int(random(3, 8));
  let offset = w / 10;
  let margin = 0;
  offset / 5;
  let cellSize = (w + offset * 2 - margin * (cells - 1)) / cells;
  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360 / 8);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -w / 2 - offset + i * (cellSize + margin);
      let y = -w / 2 - offset + j * (cellSize + margin);
      //グリッドを再帰的に分割する
      separateGrid(x, y, cellSize);
    }
  }
  pop();
  for (let i = 0; i < width * height * 15 / 100; i++) {
    stroke(0, 0, 100, 10);
    let px = random(width);
    let py = random(height);
    point(px, py);
  }
}

function separateGrid(x, y, d) {
  let sepNum = int(random(2, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        drawRandomShape(i + w / 2, j + w / 2, w);
      }

    }
  }

}

function drawRandomShape(x, y, d) {
  push();
  translate(x, y);
  let angle = int(random(4)) * 360 / 4;
  rotate(angle);
  let shape = int(random(9));

  let bc = random(colors);
  rectMode(CENTER);
  fill(bc);
  noStroke();
  rect(0, 0, d, d);
  let sc = bc;
  while (bc == sc) {
    sc = random(colors);
  }
  fill(sc);
  noStroke();
  switch (shape) {
    case 0:
      rectMode(CORNER);
      rect(-d / 2, -d / 2, d, d / 2);
      arc(d / 2, 0, d, d, 90, 180, PIE);
      break;
    case 1:
      rectMode(CORNER);
      rect(-d / 2, -d / 2, d, d / 2);
      break;
    case 2:
      triangle(-d / 2, -d / 2, d / 2, -d / 2, -d / 2, d / 2);
      break;
    case 3:
      arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90, PIE);
      break;
    case 4:
      rectMode(CORNER);
      rect(-d / 2, 0, d, d / 2);
      triangle(0, 0, -d / 2, 0, 0, -d / 2);
      break;
    case 5:
      triangle(0, 0, -d / 2, d / 2, 0, d / 2);
      triangle(0, 0, 0, -d / 2, d / 2, -d / 2);
      break;
    case 6:
      rectMode(CORNER);
      rect(0, 0, d / 2, d / 2);
      triangle(0, 0, d / 2, -d / 2, d / 2, 0);
      break;
    case 7:
      triangle(-d / 2, -d / 2, 0, -d / 2, -d / 2, 0);
      triangle(d / 2, d / 2, 0, d / 2, d / 2, 0);
      break;
    case 8:
      rectMode(CORNER);
      rect(-d / 2, -d / 2, d / 2, d / 2);
      rect(0, 0, d / 2, d / 2);
      break;
  }
  pop();
}