let pallete = ["#DADCDA","#DE200C","#3A6DA8","#A8BACC","#0A1D4E","#CD4645","#C0AEB5","#838CA9"];
let graphics, bc;
let shapes = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  let bn = int(random(pallete.length));
  bc = pallete[bn];
  pallete.splice(bn, 1);
  let cells = int(random(2, 7));
  let cols = cells;
  let rows = cells;
  let cx = width / 2;
  let cy = height / 2;
  let offset = -width / 10;
  let margin = offset * -1 / 2;

  let cellW = (width - offset * 2 - margin * (cols - 1)) / cells;
  let cellH = (height - offset * 2 - margin * (cols - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      let shape = new Shape(x + cellW / 2, y + cellW / 2, cellW, cellH, pallete.concat());
      shapes.push(shape);
    }
  }
}


function draw() {
  background(bc);

  for(let shape of shapes){
    shape.display();
  }
  image(graphics,0,0);
}

class Shape {
  constructor(_cx, _cy, _cellW, _cellH, _pallete) {
    this.pallete = _pallete.concat();
    this.center = createVector(_cx, _cy);
    this.width = _cellW;
    this.height = _cellH;
    this.arcs = [];
    let _rotate = int(random(4)) * 90;
    let r = sqrt(sq(this.width / 2) + sq(this.height / 2));
    let prevC = -1;
    for (let i = 0; i < 4; i++) {
      let c = prevC;
      while (c == prevC) {
        c = this.pallete[int(random(this.pallete.length))];
      }
      let sep = int(random(1, 5)) / 8;
      let shapeR = constrain(r / sep, r / 4, r);
      let angle = _rotate + 45 + 180 + i * 90;
      let x = this.center.x + cos(angle) * r;
      let y = this.center.y + sin(angle) * r;
      let sAngle = _rotate + i * 90;
      let eAngle = _rotate + (i + 1) * 90;
      let arc = new Arc(x, y, shapeR, sAngle, eAngle,c);
      this.arcs.push(arc);
      prevC = c;
    }

  }
  display() {
    for (let arc of this.arcs) {
      arc.display();
    }
  }
}

class Arc {
  constructor(_x, _y, _r, _sAngle, _eAngle,_c) {
    this.c = _c;
    this.center = createVector(_x, _y);
    this.r = _r;
    this.sAngle = _sAngle;
    this.eAngle = _eAngle;
  }
  display() {
    fill(this.c);
    noStroke();
    arc(this.center.x, this.center.y, this.r * 2, this.r * 2, this.sAngle, this.eAngle, PIE);
  }
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