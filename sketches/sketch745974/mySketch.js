let moverSystems = [];
let num = 10;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete = ["#01080B", "#E71101", "#4F91C6", "#F3DBBC", "#333346", "#0A4BA0", "#045BE2"];
let bg;
let graphics;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(3, 12));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 5;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;
  
  let bgNum = int(random(pallete.length));
  bg = pallete[bgNum];
  pallete.splice(bgNum,1);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset + margin);
      let y = map(j, 0, rows, offset, width - offset + margin);
      let b = new Bound(x, y, cellW, cellH);
      moverSystems.push(new MoverSystem(b, int(random(5,10))*map(cells,2,7,10,5), cellW/20, pallete.concat()));
      moverSystems[i].render();
    }
  }
  background(bg);
  image(graphics,0,0);
}

function draw() {
  for (let ms of moverSystems) {
    ms.update();
    ms.render();
  }
	if(frameCount >300){
		noLoop();
	}
}

class Mover {
  constructor(x, y, d, c1, c2) {
    this.pos = createVector(x, y);
    this.noiseScale = createVector(400,400,400);
    this.d = d;
    this.dLife = d/random(300,200);
    this.maxD = this.d;
    this.c1 = c1;
    this.c2 = c2;
  }
  update() {
    let n = map(noise(this.pos.x / this.noiseScale.x, this.pos.y / this.noiseScale.y), 0, 1, 360, -360);
    let vel = createVector(cos(n), sin(n));
    this.pos.add(vel);
    this.d -= this.dLife;
    this.d = constrain(this.d, 0, this.maxD);
  }
  render() {
    colorMode(RGB);
    let c = lerpColor(color(this.c1), color(this.c2), this.d/this.maxD);
    colorMode(HSB);
    fill(c);
    noStroke();
    circle(this.pos.x, this.pos.y, this.d);
  }
}

class MoverSystem {
  constructor(b, n, d, p) {
    this.movers = [];
    this.b = b;
    this.n = n;
    this.d = d;
    this.p = p;
    for (let i = 0; i < this.n; i++) {
      let c1 = random(p);
      let c2 = c1;
      while (c1 == c2) {
        c2 = random(p);
      }
      this.movers.push(new Mover(random(this.b.x, this.b.x + this.b.w), random(this.b.y, this.b.y + this.b.h), this.d, c1, c2));
    }
  }
  update() {
    for (let m of this.movers) {
      m.update();
      this.b.checkBound(m);
    }
  }
  render() {
    //this.b.render();
    for (let m of this.movers) {
      m.render();
    }
  }
}



class Bound {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  checkBound(m) {
    if (m.pos.x - m.d / 2 < this.x) m.pos.x = this.x + m.d / 2;
    if (m.pos.x + m.d / 2 > this.x + this.w) m.pos.x = this.x + this.w - m.d / 2;
    if (m.pos.y - m.d / 2 < this.y) m.pos.y = this.y + m.d / 2;
    if (m.pos.y + m.d / 2 > this.y + this.h) m.pos.y = this.y + this.h - m.d / 2;
  }
  render() {
    //noFill();
    rect(this.x, this.y, this.w, this.h);
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