let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let graphics;
let moverSystems = [];
let pallete = ["#040714","#C74D32","#9F0D10","#523734","#E7BA7B","#F8CF86","#D2AB74"];
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  let bgNum = int(random(pallete.length));
  bg = pallete[bgNum];
  pallete.splice(bgNum,1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  background(bg);
  cells = int(random(2, 8));
  cols = cells;
  rows = cells;
  offset = width / (int(random(1, 3)) * 10);
  margin = offset / 2;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      let m = int(random(8, 16));
      let n = int(random(3, 8));
      for (let w = cellW / 2; w > 0; w -= cellW / m) {
        moverSystems.push(new MoverSystem(x - w / 2 + cellW / 2, y - w / 2 + cellW / 2, w, w, n));
      }
    }
  }
  image(graphics,0,0);
}

function draw() {
  //background(bg+"0A");
  for (let ms of moverSystems) {
    ms.update();
    ms.render();
  }
}

class MoverSystem {
  constructor(x, y, w, h, m) {
    this.b = new Bound(x, y, w, h, m);
    this.movers = [];
    let n = int(random(1, m));
    for (let i = 0; i < n; i++) {
      let m = random(4);
      let dir = random() > .5 ? -1 : 1;
      this.movers.push(new Mover(m, dir, this.b,sqrt(w/2)));
    }
  }
  update() {
    for (let m of this.movers) {
      m.update();
    }

  }
  render() {
    for (let m of this.movers) {
      m.render();
    }
  }
}

class Mover {
  constructor(posNum, dir, b,d) {
    this.c = random(pallete);
    this.b = b;
    this.d=d;
    this.dir = dir;
    this.posNum = posNum;
    this.step = random(50, 120) / 1.5;
    this.pos;
  }
  update() {
    this.posNum += this.dir / this.step;
    if (this.posNum < 0) {
      this.posNum += this.b.corner.length;
      this.c = random(pallete);
    }
    let current = int(this.b.corner.length + this.posNum) % this.b.corner.length;
    let f = (1 + this.posNum) % 1;
    let next = int(this.b.corner.length + this.posNum + this.dir) % this.b.corner.length;
    if (this.dir > 0) {
      this.pos = p5.Vector.lerp(this.b.corner[current], this.b.corner[next], f);
    } else {
      this.pos = p5.Vector.lerp(this.b.corner[next], this.b.corner[current], f);
    }
  }
  render() {
    fill(this.c);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.d*1);
  }
}

class Bound {
  constructor(lx, ly, cw, ch, _n) {
    this.center = createVector(lx + cw / 2, ly + ch / 2);
    this.corner = [];
    let r = sqrt(sq(cw / 2) + sq(ch / 2));
    for (let i = 0; i < _n; i++) {
      let x = this.center.x + cos(i * 360 / _n) * r;
      let y = this.center.y + sin(i * 360 / _n) * r;
      this.corner.push(createVector(x, y));
    }
  }
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0,0,100,10);
    _graphics.ellipse(x, y, w, h);
  }
}