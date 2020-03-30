
let url = "https://coolors.co/573ced-7b9fe9-e349c5-feb870-9aece0";
let pallete = [];
let graphics, bc;

let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let ratio = 0.75;
let movingArcSystems = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  init();
}

function init() {
  pallete = createPallete(url);
  let bn = int(random(pallete.length));
  bc = pallete[bn]
  pallete.splice(bn, 1);
  background(bc);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(2, 6));
  cols = cells;
  rows = cells;


  offset = -width / 10;
  margin = width / 20;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  text(cells, 10, 10);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      let cx = x + cellW / 2;
      let cy = y + cellH / 2;
      let r = sqrt(sq(cellW / 2) + sq(cellH / 2)) * ratio;
      let sep = int(random(2, 10));
      let movingArcSystem = new MovingArcSystem(cx, cy, r, sep, pallete.concat());
      movingArcSystems.push(movingArcSystem);
    }
  }
}

function draw() {
  background(bc + "77");
  for (let movingArcSystem of movingArcSystems) {
    for (let mA of movingArcSystem.movingArcs) {
      mA.display();
    }
  }
  image(graphics, 0, 0);
}

class MovingArcSystem {
  constructor(_cx, _cy, _r, _sep, _pallete) {
    this.movingArcs = [];
    let rStep = _r / (_sep + 1);
    for (let i = 0; i < _sep; i++) {
      let rMax = map(i, 0, _sep - 1, _r, rStep * 2);
      let rSub = rStep;
      let rMin = rMax - rSub;
      let mA = new MovingArc(_cx, _cy, rMax, rMin, _sep, _pallete);
      this.movingArcs.push(mA);
    }
  }
  display() {
    for (let mA of this.movingArcs) {
      mA.display();
    }
  }
}

class MovingArc {
  constructor(_cx, _cy, _rMax, _rMin, _sep, _pallete) {
    this.center = createVector(_cx, _cy);
    this.pallete = _pallete;
    this.prevC = -1;
    this.c = this.prevC;
    while (this.c == this.prevC) {
      this.c = this.pallete[int(random(this.pallete.length))];
    }
    this.prevC = this.c;
    this.rMax = _rMax;
    this.rMin = _rMin;
    this.sep = _sep;
    this.angleOriginA = int(random(this.sep)) * 360 / this.sep;
    this.angleOriginB = this.angleOriginA + int(random(this.sep)) * 360 /
      this.sep;
    this.angleLatitudeA = map(int(random(-this.sep, this.sep)), -this.sep + 1, this.sep - 1, 360 / this.sep / 2, 360 / this.sep);
    this.angleLatitudeB = map(int(random(-this.sep, this.sep)), -this.sep + 1, this.sep - 1, 360 / this.sep / 2, 360 / this.sep);
    this.freqA = int(random(3, 8)) / 5;
    this.freqB = int(random(3, 8)) / 5;
    this.freqC = map(int(random(10)), 0, 9, -1.5, 1.5);
  }
  display() {

    let angleA = this.angleOriginA + this.angleLatitudeA * sin(frameCount * this.freqA * 1.5);
    let angleB = this.angleOriginB + this.angleLatitudeB * cos(frameCount * this.freqB * 1.5);

    if (angleA > angleB) {
      let temp = angleA;
      angleA = angleB;
      angleB = temp;
    }

    if (abs(angleA - angleB) < 1) {
      while (this.c == this.prevC) {
        this.c = this.pallete[int(random(this.pallete.length))];
      }
      this.prevC = this.c;
    }

    fill(this.c);
    noStroke();
    push();
    translate(this.center.x, this.center.y);
    rotate(frameCount * this.freqC);

    beginShape();
    for (let angle = angleA; angle < angleB; angle++) {
      let x = this.rMax * cos(angle);
      let y = this.rMax * sin(angle);
      vertex(x, y);
    }
    for (let angle = angleB; angle > angleA; angle--) {
      let x = this.rMin * cos(angle);
      let y = this.rMin * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();

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