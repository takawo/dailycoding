let cells, cols, rows;
let margin, offset;
let cellW, cellH;
let pallete = ["#8E7A5F", "#FDDBA9", "#100E0D", "#DA3827", "#5E4D3F", "#CC9B64", "#CECBC4", "#3582D8"];
let graphics;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  let bgN = int(random(pallete.length));
  background(pallete[bgN]);
  pallete.splice(bgN, 1);
  cells = int(random(2, 5));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 2;
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW) + cellW / 2;
      let y = map(j, 0, rows - 1, offset, height - offset - cellH) + cellH / 2;
      let points = makeGrid(x, y, cellW / 2, int(random(3, 8)), int(random(5, 10)));
      noFill();
      stroke(0, 0, 10, 50);
      beginShape();
      for (let p of points) {
        vertex(p.x, p.y);
      }
      endShape();
      let a = 0;
      for (let k = 0; k < points.length - 1; k++) {
        let p1 = points[k];
        let p2 = points[(k + 1)];
        let c1 = random(pallete);
        let c2 = c1;
        let nScaleA = random(100, 800);
        let nScaleB = random(100, 800);
        while (c1 == c2) {
          c2 = random(pallete);
        }
        let angle = atan2(p2.y - p1.y, p2.x - p1.x);
        let distance = dist(p1.x, p1.y, p2.x, p2.y);
        push();
        translate(p1.x, p1.y);
        rotate(angle);
        for (let nx = 0; nx < distance; nx += 1) {
          let ny = sin(a + nx) * cellW / 20;
          colorMode(RGB);
          let c = lerpColor(color(c1 + "33"), color(c2 + "33"), map(nx, 0, distance, 0, 1));
          push();
          translate(nx, ny);
          fill(c);
          noStroke();
          ellipse(0, 0, ny * 2, ny * 2);
          pop();
        }
        a += distance;
        pop();
      }

    }
  }
  image(graphics, 0, 0);
}


function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let c = random(pallete) + "11";
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

function makeGrid(cx, cy, rMax, sep, n) {
  let arr = [];
  let center = createVector(cx, cy);

  let startAngle = random(360);
  for (let i = n; i > 0; i--) {
    let r = map(i, n, 1, rMax, rMax / 10);
    let anglePlus = map(i, n, 1, 0, 0);
    for (let angle = startAngle; angle < 360 + startAngle; angle += 360 / sep) {
      let x = cos(angle + anglePlus) * r;
      let y = sin(angle + anglePlus) * r;
      let p = createVector(x, y);
      p.add(center);
      arr.push(p);
    }
  }
  return arr;
}