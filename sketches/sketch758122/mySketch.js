let colors = ["#060719", "#FAF9E3", "#DA2913", "#1C3463", "#E98E30", "#1A6494", "#4EA2B9", "#ADC3BD"];
let w = 800;
let imgs = [];
let graphics = [];
let img_num = 15;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;

function preload() {
  for (let i = 0; i < img_num; i++) {
    let n = int(random(1000));
    imgs.push(loadImage("https://loremflickr.com/" + w + "/" + w + "/monochrome?random=" + n));
    graphics.push(createGraphics(w, w));
  }
}


function setup() {
  createCanvas(w, w);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 20);
  blendMode(ADD);
  angleMode(DEGREES);
  init();
}

function init() {
  cells = int(random(3, 8));
  cols = cells;
  rows = cells;
  offset = width / 20;
  margin = offset / 5;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellH + margin);
      let m = int(random(2, 5));
      for (let n = 0; n < m; n++) {
        let g = random(graphics);
        drawRandomShape(g, x + cellW / 2, y + cellH / 2, cellW);
      }
    }
  }
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].mask(graphics[i]);
    tint(random(colors)+hex(150,2));
    image(imgs[i], 0, 0);
  }
}

function drawRandomShape(g, x, y, d) {
  g.angleMode(DEGREES);
  g.push();
  g.translate(x, y);
  let angle = int(random(4)) * 360 / 4;
  g.rotate(angle);
  let shape = int(random(9));
  switch (shape) {
    case 0:
      g.rectMode(CORNER);
      g.rect(-d / 2, -d / 2, d, d / 2);
      g.arc(d / 2, 0, d, d, 90, 180, PIE);
      break;
    case 1:
      g.rectMode(CORNER);
      g.rect(-d / 2, -d / 2, d, d / 2);
      break;
    case 2:
      g.triangle(-d / 2, -d / 2, d / 2, -d / 2, -d / 2, d / 2);
      break;
    case 3:
      g.arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90, PIE);
      break;
    case 4:
      g.rectMode(CORNER);
      g.rect(-d / 2, 0, d, d / 2);
      g.triangle(0, 0, -d / 2, 0, 0, -d / 2);
      break;
    case 5:
      g.triangle(0, 0, -d / 2, d / 2, 0, d / 2);
      g.triangle(0, 0, 0, -d / 2, d / 2, -d / 2);
      break;
    case 6:
      g.rectMode(CORNER);
      g.rect(0, 0, d / 2, d / 2);
      g.triangle(0, 0, d / 2, -d / 2, d / 2, 0);
      break;
    case 7:
      g.triangle(-d / 2, -d / 2, 0, -d / 2, -d / 2, 0);
      g.triangle(d / 2, d / 2, 0, d / 2, d / 2, 0);
      break;
    case 8:
      g.rectMode(CORNER);
      g.rect(-d / 2, -d / 2, d / 2, d / 2);
      g.rect(0, 0, d / 2, d / 2);
      break;
  }
  g.pop();
}