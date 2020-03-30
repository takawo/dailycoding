let graphicArr;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let textGraphics;
let graphics_num = 2;
let ratio = 0.66;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let depthMax = 6;
let bg;
let tf;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  //blendMode(ADD);
  init();
}

function init() {
  graphicArr = [];
  tf = new Transformer();
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 0, 10);
  bg.noStroke();
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let radius = sqrt(sq(width / 2) + sq(height / 2));
    let angle = random(360);
    let r = 1 - (random(random(random(1))));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    bg.ellipse(x, y, w, h);
  }

  textGraphics = createGraphics(width, height);
  textGraphics.colorMode(HSB, 360, 100, 100, 100);
  textGraphics.angleMode(DEGREES);

  for (let i = 0; i < graphics_num; i++) {
    let g = createGraphics(width, height);
    g.colorMode(HSB, 360, 100, 100, 100);
    g.angleMode(DEGREES);
    graphicArr.push(g);
  }
}

function draw() {
  background(0, 0, 80);
  cells = int(random(3, 6));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 5;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellH + margin);
      let cx = x + cellW / 2;
      let cy = y + cellH / 2;
      tf.push();
      tf.translate(cx, cy);
      let l = cellW / 4;
      let depth = int(random(3, 7));
      tree(depth, l);
      let t = str[int(random(str.length))];
      str.replace(t, "");
      textGraphics.textFont("serif");
      textGraphics.textSize(cellW * 0.9);
      textGraphics.fill(0, 0, 95);
      textGraphics.textAlign(CENTER, CENTER);
      textGraphics.text(t, tf.x, tf.y);
      tf.pop();
    }
  }
  image(bg, 0, 0);
  image(graphicArr[0], 0, 0);
  image(textGraphics, 0, 0);
  image(graphicArr[1], 0, 0);
  noLoop();
}

function keyPressed() {
  clear();
  init();
  redraw();
}

function tree(depth, l) {
  let len = 125;
  let g = random(graphicArr);
  if (depth > 0) {
    let n = int(random(2, 8));
    for (let angle = 0; angle < 360; angle += 360 / n) {
      tf.push();
      tf.rotate(angle);
      g.stroke(0, 0, 20, 100);
      g.noFill();
      let sw = map(l, 0, len, 0, depthMax);
      g.strokeWeight(sw);
      if (random(100) > 50) {
        g.push();
        g.translate(tf.x, tf.y);
        g.rotate(tf.a);
        g.bezier(0, 0, l / 2, l / 2, l / 2, -l / 2, l, 0);
        g.pop();
      } else {
        g.push();
        g.translate(tf.x, tf.y);
        g.rotate(tf.a);
        g.bezier(0, 0, l / 2, -l / 2, l / 2, l / 2, l, 0);
        g.pop();
      }
      tf.translate(l, 0);
      tf.rotate(random(360));
      tree(depth - 1, l * random(0.2, 0.7));
      tf.pop();
    }
  }
}