let cells, cols, rows;
let offset, margin;
let w, h;
let graphics;
let pallete = ["#03A688", "#F2798F", "#44A694", "#F28888", "#F27272"];
let prev_color = -1;
let swMax;
let bgColor;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
	//blendMode(EXCLUSION);
  init();
}

function init() {

  let n = int(random(pallete.length));
  bgColor = pallete[n];
  pallete.splice(n, 1);
  background(bgColor);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics)

  cells = int(random(3, 10));
  cols = cells;
  rows = cells;

  offset = width / cols / int(random(3, 6));
  margin = offset / int(random(3, 6));
  swMax = margin / int(random(2, 4));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      push();
      translate(x, y);
      for (let i = 0; i < int(random(5, 15)); i++) {
        drawShapeRandomly(w / 2, h / 2, w, h);
      }
      pop();
    }
  }
  image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 7);

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


function drawShapeRandomly(_x, _y, _w, _h) {
  push();
  translate(_x, _y);
  let w, h;
  let dMax = (_w + _h) / 2;
  let rotate_num = int(random(4));
  if (rotate_num % 2 == 1) {
    w = _h;
    h = _w;
  } else {
    w = _w;
    h = _h;
  }
  rotate(rotate_num * 90);
  let d = dMax / int(random(1, 5));
  let randomShape = int(random(14));

  setRandomFillAndShape();
  switch (randomShape) {
    case 0:
      ellipse(0, 0, d, d);
      break;
    case 1:
      arc(-w / 2, -h / 2, d, d, 0, 90, PIE);
      break;
    case 2:
      arc(0, -h / 2, d, d, 0, 180, PIE);
      break;
    case 3:
      arc(-w / 2, -h / 2, d, d, 0, 90, PIE);
      setRandomFillAndShape();
      arc(w / 2, h / 2, d, d, 180, 270, PIE);
      break;
    case 4:
      arc(0, -h / 2, d, d, 0, 180, PIE);
      setRandomFillAndShape();
      arc(w / 2, h / 2, d, d, 180, 270, PIE);
      break;
    case 5:
      rectMode(CENTER);
      rotate(int(random(2)) * 45);
      let dMax = sqrt(sq(w / 2) + sq(h / 2));
      rect(0, 0, min(d, dMax), min(d, dMax));
      break;
    case 6:
      rectMode(CORNER);
      rect(0, 0, d / 2, d / 2);
      break;
    case 7:
      rectMode(CORNER);
      rect(0, 0, d / 2, d / 2);
      setRandomFillAndShape();
      rect(-w / 2, -h / 2, d / 2, d / 2);
      break;
    case 8:
      beginShape();
      vertex(w / 2, h / 2);
      for (let angle = 0; angle < 90; angle++) {
        let x = w / 2 - d + cos(angle) * d;
        let y = h / 2 - d + sin(angle) * d;
        vertex(x, y);
      }
      endShape(CLOSE);
      break;
    case 9:
      beginShape();
      vertex(w / 2, h / 2);
      for (let angle = 0; angle < 180; angle++) {
        let x = cos(angle) * w / 2;
        let y = sin(angle) * h / 2;
        vertex(x, y);
      }
      vertex(-w / 2, h / 2);
      endShape(CLOSE);
      break;
    case 10:
      beginShape();
      vertex(-w / 2, -h / 2);
      vertex(-w / 2 + d, -h / 2);
      vertex(-w / 2, -h / 2 + d);
      endShape(CLOSE);
      break;
    case 11:
      beginShape();
      vertex(-w / 2, -h / 2);
      vertex(-w / 2 + d / 2, -h / 2);
      vertex(-w / 2, -h / 2 + d / 2);
      endShape(CLOSE);
      setRandomFillAndShape();
      beginShape();
      vertex(w / 2, h / 2);
      vertex(w / 2 - d / 2, h / 2);
      vertex(w / 2, h / 2 - d / 2);
      endShape(CLOSE);
      break;
    case 12:
      beginShape();
      vertex(0, 0);
      vertex(w / 2, 0);
      vertex(0, h / 2);
      endShape(CLOSE);
      break;
    case 13:
      beginShape();
      vertex(0, 0);
      vertex(d / 2, 0);
      vertex(0, d / 2);
      endShape(CLOSE);
      setRandomFillAndShape();
      beginShape();
      vertex(0, 0);
      vertex(-d / 2, 0);
      vertex(0, -d / 2);
      endShape(CLOSE);
      break;
      // case 14:
      //   break;
      // case 15:
      //   break;
      // case 16:
      //   break;
      // case 17:
      //   break;
      // case 18:
      //   break;
      // case 19:
      //   break;
      // case 20:
      //   break;
  }
  pop();
}

function setRandomFillAndShape() {
  let current_color = prev_color;
  while (current_color == prev_color) {
    current_color = pallete[int(random(pallete.length))];
  }

  if (random(100) > 50) {
    noStroke();
    fill(current_color);
  } else {
    noFill();
    stroke(current_color);
    strokeWeight(swMax / int(random(2, 8)));
    strokeJoin(ROUND);

  }
  prev_color = current_color;
}