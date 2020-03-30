let pallete = ["#020205", "#EFAB01", "#DF160F", "#013464", "#CBA450", "#D03F20", "#CDB587", "#5C2E21"];
let graphics;

let cells, cols, rows;
let offset, margin;
let cellW, cellH;

function setup() {
  createCanvas(400, 400);
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let bgNum = int(random(pallete.length));
  let bg = pallete[bgNum];
  background(bg);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(3, 12));
  cols = cells;
  rows = cells;

  let w = sqrt(sq(width) + sq(height));
  offset = w / 9;
  margin = offset / 5;

  cellW = (w + offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w + offset * 2 - margin * (rows - 1)) / rows;

  push();
  translate(width/2,height/2);
  rotate(45);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = -w/2-offset + i * (cellW + margin);
      let y = -w/2-offset + j * (cellH + margin);
      let noiseScaleX = int(random(10, 50)) * int(random(1, 5));
      let noiseScaleY = int(random(10, 50)) * int(random(1, 5));
      let colors = arrShuffle(pallete.concat())
      for (let l = y; l < y + cellH; l+=3) {
        for (let k = x; k < x + cellW; k+=3) {
          point(k, l);
          let n = noise(k / noiseScaleX, l / noiseScaleY) * pallete.length;
          let current = int(n);
          let next = int(n + 1) % colors.length;
          let f = n % 1;
          colorMode(RGB);
          let c = lerpColor(color(colors[current]), color(colors[next]), f);
          colorMode(HSB);
          stroke(c);
          strokeWeight(3);
          point(k, l);
        }
      }
    }
  }
  pop();
  image(graphics, 0, 0);
}

function arrShuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
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