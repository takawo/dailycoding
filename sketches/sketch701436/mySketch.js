let cells, cols, rows;
let offset, margin;
let w, h;
let graphics;

let pallete = ["#123638", "#FF625E", "#FFA08B", "#FFCDAC", "#FCE9CC"];

let colors;
let prev_bg_color = -1;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(50000, graphics);

  cells = int(random(2, 10));
  cols = cells;
  rows = cells;

  offset = width / (int(random(3, 5)) * int(random(3, 5)));
  margin = offset / int(random(2, 6));
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  background("#123638");

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);

      let cx = x + w / 2;
      let cy = y + h / 2;

      drawRecursiveArcInRect(cx, cy, w, h);

    }
  }
  image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 7);
    _graphics.ellipse(x, y, w, h);
  }
}


function drawRecursiveArcInRect(cx, cy, w, h) {
  let points = [];
  let p1 = createVector(cx - w / 2, cy - h / 2);
  points.push(p1);
  let p2 = createVector(cx + w / 2, cy - h / 2);
  points.push(p2);
  let p3 = createVector(cx + w / 2, cy + h / 2);
  points.push(p3);
  let p4 = createVector(cx - w / 2, cy + h / 2);
  points.push(p4);

  let colors = pallete.concat();
  let bg_color_num = int(random(colors.length));
  while (colors[bg_color_num] == prev_bg_color) {
    bg_color_num = int(random(colors.length));
  }
  prev_bg_color = colors[bg_color_num];
  fill(colors[bg_color_num]);
  colors.splice(bg_color_num, 1);
  noStroke();
  rectMode(CENTER);
  rect(cx, cy, w, h);

  let prev_color = -1;

  let n = int(random(2, 6));
  for (let i = 0; i < n * 3; i++) {
    let n_float = int(random(points.length)) + int(random(n)) / n;
    let n_a = int(n_float);
    let n_b = int(n_float + 1) % points.length;
    let n_f = n_float % 1;

    let R = w / (n);
    int(random(1.5, 10));
    let p = p5.Vector.lerp(points[n_a], points[n_b], n_f);

    for (let r = R; r > 0; r -= R / 5) {

      // strokeWeight(1);
      // stroke(0, 0, 50);
      let current_color = prev_color;
      while (current_color == prev_color) {
        current_color = int(random(colors.length))
      }
      fill(colors[current_color]);
      strokeWeight(5);
      stroke(0, 0, 100);
      noStroke();
      prev_color = current_color;

      beginShape();
      vertex(p.x, p.y);
      for (let angle = n_a * 90; angle <= n_a * 90 + 180; angle += 1) {
        let x = constrain(p.x + cos(angle) * r, cx - w / 2, cx + w / 2);
        let y = constrain(p.y + sin(angle) * r, cy - h / 2, cy + h / 2);
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
}