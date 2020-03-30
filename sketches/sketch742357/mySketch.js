let pallete = ["#E8E7E7", "#C6B1BA", "#020202", "#EF9DC4", "#FD9404", "#577345", "#553B40"];
let bg;
let graphics;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let rs;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rs = random(100000);
  cells = int(random(4, 15));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 4;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;
  let bgNum = int(random(pallete.length));
  bg = pallete[bgNum];
  pallete.splice(bgNum, 1);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

}

function draw() {
  background(bg);
  randomSeed(rs);
  let num = 10;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i,
        0, cols - 1, offset, width - offset - cellW);
      let y = map(j,
        0, rows - 1, offset, width - offset - cellH);
      let h = cellW;
      let w = h / 4;
      let angle = int(random(8)) * 360 / 8;
      let m = int(random(4));
      switch (m) {
        case 0:
          drawTrianglishRect(x + cellW / 2, y + cellH / 2, w, h, pallete.concat(), angle);
          if (random(100) < 50) {
            drawTrianglishRect(x + cellW / 2, y + cellH / 2, w, h, pallete.concat(), angle + 90);
          } else {
            drawRoundishRound(x + cellW / 2, y + cellH / 2, w, h, pallete.concat(), angle + 90);
          }
          break;
        case 1:
          drawRoundishRound(x + cellW / 2, y + cellH / 2, w, h, pallete.concat(), angle);
          if (random(100) < 50) {
            drawRoundishRound(x + cellW / 2, y + cellH / 2, w, h, pallete.concat(), angle + 90);
          } else {
            drawTrianglishRect(x + cellW / 2, y + cellH / 2, w, h, pallete.concat(), angle + 90);
          }
          break;
        case 2:
          drawTrianglishRect(x + cellW / 2, y + cellH / 2, w, h, pallete.concat(), angle);
          break;
        case 3:
          drawRoundishRound(x + cellW / 2, y + cellH / 2, w, h, pallete.concat(), angle);
          break;
      }
    }
  }
  image(graphics, 0, 0);
  noLoop();
}

function drawTrianglishRect(_x, _y, _w, _h, _p, a) {
  push();
  translate(_x, _y);
  let angle = a;
  scale(random() > 0.5 ? -1 : 1, random() > 0.5 ? -1 : 1);
  rotate(angle);
  noStroke();
  rectMode(CENTER);
  let h = _h - _w * 2;
  let rc = random(_p);
  fill(rc);
  rect(0, 0, _w, h);
  let tc1 = rc;
  while (tc1 == rc) {
    tc1 = random(_p);
  }
  fill(tc1);
  triangle(-_w / 2, -h / 2, _w / 2, -h / 2, _w / 2, -h / 2 - _w);
  let tc2 = tc1;
  while (tc2 == tc1 || tc2 == rc) {
    tc2 = random(_p);
  }
  fill(tc2);
  triangle(-_w / 2, h / 2, _w / 2, h / 2, -_w / 2, h / 2 + _w);
  pop();
}

function drawRoundishRound(_x, _y, _w, _h, _p, a) {
  push();
  translate(_x, _y);
  scale(random() > 0.5 ? -1 : 1, random() > 0.5 ? -1 : 1);
  rotate(a);
  scale(random() > 0.5 ? -1 : 1, random() > 0.5 ? -1 : 1);
  noStroke();
  rectMode(CENTER);
  let h = _h - _w * 2;
  let rc = random(_p);
  fill(rc);
  rect(0, 0, _w, h);

  let tc1 = rc;
  while (tc1 == rc) {
    tc1 = random(_p);
  }
  let tc2 = tc1;
  while (tc2 == tc1 || tc2 == rc) {
    tc2 = random(_p);
  }
  fill(tc1);
  arc(_w / 2, -h / 2, _w * 2, _w * 2, 180, 270);
  fill(tc2);
  arc(-_w / 2, h / 2, _w * 2, _w * 2, 0, 90);
  pop();
}


function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    let c = random(pallete) + "15";
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}