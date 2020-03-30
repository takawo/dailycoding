let url = "https://coolors.co/app/d37804-fe859b-e4c5cd-0fbbf7-003c9b";
let pallete;

let graphics, bc;
let cell, cols, rows;
let offset, margin;
let cellW, cellH;
let center, angle;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
	init();
}

function draw(){
	frameRate(1);
  dotInit();
}


function init() {
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
}

function dotInit(){
  pallete = createPallete(url);
  background(int(random(12)) * 360 / 12, 100, 10);

  cells = int(random(8, 20));
  cols = cells;
  rows = cells;

  offset = -width / 8;
  margin = offset * -1 / 5;

  let w = sqrt(sq(width) + sq(height));

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w - offset * 2 - margin * (rows - 1)) / rows;

  center = createVector(width / 2, height / 2);
  angle = 0;

  push();
  translate(center.x, center.y);
  rotate(angle);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let d = new DotGraphics(x, y, cellW, cellH, pallete);
    }
  }
  pop();
  image(graphics, 0, 0);
}


class DotGraphics {
  constructor(_x, _y, _w, _h, _pallete) {
    this.pallete = _pallete.concat();
    this.cn = int(random(this.pallete.length));
    this.prevCn = this.cn;
    this.g = createGraphics(_w, _h);
    this.g.colorMode(HSB, 360, 100, 100, 100);

    let cells = int(random(5, 10));
    let cols = cells;
    let rows = cells;
    let margin = 1.5;

    let cellW = (this.g.width - margin * (cols - 1)) / cols;
    let cellH = (this.g.height - margin * (rows - 1)) / rows;


    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let x, y;
        if (cells % 2 == 0) {
          x = map(i, 0, cols - 1, 0, this.g.width - cellW - margin);
          y = map(j, 0, rows - 1, 0, this.g.height - cellH);
        } else {
          x = map(i, 0, cols - 1, 0, this.g.width - cellW);
          y = map(j, 0, rows - 1, 0, this.g.height - cellH);

        }
        this.g.fill(random(100) < 30 ? color(0, 0, 0, 0) : color(this.pallete[this.cn]));
        this.g.noStroke();
        this.g.rect(x, y, cellW, cellH);

        if (random(100) < 10) {
          while (this.cn == this.prevCn) {
            this.cn = int(random(this.pallete.length));
          }
          this.prevCn = this.cn;
        }
      }
    }

    let graphics_copy = createGraphics(this.g.width, this.g.height);

    graphics_copy.copy(this.g, 0, 0, this.g.width / 2, this.g.height,
      0, 0, this.g.width / 2, this.g.height);
    graphics_copy.scale(-1, 1);
    graphics_copy.image(graphics_copy, -graphics_copy.width + 1, 0, graphics_copy.width, graphics_copy.height);

    image(graphics_copy, _x, _y);
  }


}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 3);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}