let colors = ["#0C1C14", "#1A4F27", "#B3BFAD", "#4E5A31", "#DBE7E4", "#916148", "#668E47", "#A5AD4F"];
let images = [];
let cells, w, offset, margin, cellSize;

function preload() {
  cells = int(random(3, 12));

  w = sqrt(sq(800) + sq(800));
  offset = w / 10;
  margin = 0;offset / 5  ;
  cellSize = int((w + offset * 2 - margin * (cells - 1)) / cells);

  for (let i = 0; i < cells * cellSize; i++) {
    let image_num = int(random(10000));
    images[i] = loadImage("https://loremflickr.com/" + cellSize + "/" + cellSize + "/monochrome/?random=" + image_num);
  }
}


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  background(0, 0, 90);

  push();
  translate(width / 2, height / 2);
  rotate(45);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -w / 2 - offset + i * (cellSize + margin);
      let y = -w / 2 - offset + j * (cellSize + margin);
      push();
      translate(x + cellSize / 2, y + cellSize / 2);
      rotate(int(random(4)) * 360 / 4);
      rectMode(CENTER);
      drawRandomShape2(0, 0, cellSize);
      pop();
    }
  }
  pop();
}

function drawRandomShape2(x, y, d) {
  let img1 = random(images).get();
  let img2 = random(images).get();
  imageMode(CENTER);
  tint(color(random(colors)));  
  image(img1, 0, 0);
  let g = createGraphicsShape(d);
  img2.mask(g);
  tint(color(random(colors)));  
  image(img2, 0, 0);
}

function createGraphicsShape(d) {
  let g = createGraphics(d, d);
  g.angleMode(DEGREES);
  g.push();
  g.translate(d/2, d/2);
  let angle = int(random(4)) * 360 / 4;
  g.rotate(angle);
  let shape = int(random(9));
  g.fill(0);
  g.noStroke();
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
  return g;
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