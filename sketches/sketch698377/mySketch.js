let waves = [];
let cells, cols, rows;
let offset, margin;
let w, h;
let bg;
let waveType = ["sin", "cos"];
let pallete = ["#333333", "#5D737E", "#FFF07C", "#87BBA2", "#F0F7EE"];
let graphics;
let bgC;
let f;
//let n = eval("sin"+ "("+frameCount+")");

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  cells = int(random(2, 5));
  cols = cells;
  rows = cells;
  // let n = int(random(pallete.length));
  // bgC = pallete[n];
  // pallete.splice(n, 1);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  offset = width / cells / int(random(5, 10));
  margin = offset / int(random(2, 5));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      waves.push(new Wave(x, y, w, h));
    }
  }

}

function draw() {
  background(0, 0, 20);
  f = frameCount*3;
  for (wave of waves) {
    wave.display();
  }
  image(graphics, 0, 0);

  //noLoop();
}


function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 3);
    _graphics.ellipse(x, y, w, h);
  }
}

class Wave {
  constructor(_x, _y, _w, _h) {
    this.waveTypes = [waveType[int(random(2))], waveType[int(random(2))]];
    this.bound = new Bound(_x, _y, _w, _h);
    this.freqA = sqrt(random(1)) * 3 * (random(100) > 50 ? -1 : 1);
    this.freqB = sqrt(random(1)) * 3 * (random(100) > 50 ? -1 : 1);
    this.freqC = sqrt(random(1)) * 3 * (random(100) > 50 ? -1 : 1);
    this.prevDDir = 0;
    this.rs = random(1000);
  }
  display() {
    randomSeed(this.rs);
    let cc = int(random(pallete.length)) % pallete.length;

    push();
    translate(this.bound.x, this.bound.y + this.bound.h / 2);
    for (let x1 = 0; x1 < this.bound.w; x1 += .9) {
      let y1 = eval(this.waveTypes[0] + "((x1+f) * this.freqA) * " + this.waveTypes[1] + "((x1+f) * this.freqB) * this.bound.w / 4");
      // let y1 = sin((x1+f) * this.freqA) * cos((x1+f) * this.freqB) * this.bound.w / 4;
      let x2 = x1 + 1;
      let y2 = eval(this.waveTypes[0] + "((x2+f) * this.freqA) * " + this.waveTypes[1] + "((x2+f) * this.freqB) * this.bound.w / 4");
      // let y2 = sin((x2+f) * this.freqA) * cos((x2+f) * this.freqB) * this.bound.w / 4;
      let angle = atan2(y2 - y1, x2 - x1);
      push();
      translate(x1, y1);
      rotate(angle);
      let d = sin((x1 + y1) * this.freqC) * margin * 2;
      let dDir = d > 0;
      let c;
      if (dDir != this.prevDDir) {
        c = int(random(pallete.length)) % pallete.length;
        while (c == cc) {
          c = int(random(pallete.length)) % pallete.length;
        }
        cc = c;
      }
      fill(pallete[cc]);
      stroke(0, 0, 100, 10);
      this.prevDDir = dDir;
      ellipse(0, -d / 2, d, d);
      pop();
    }

    pop();
  }
}

class Bound {
  constructor(_x, _y, _w, _h) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
  }
}