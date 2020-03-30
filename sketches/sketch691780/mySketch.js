let movers;
let mover;
let cells;
let cols;
let rows;
const offset = 80;
const margin = offset;
let w, h;
let hue_num;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  smooth();

	init();
}

function init(){
	movers = [];
	cells = int(random(2,8));
	cols = cells;
	rows = cells;	
	w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
	
  hue_num = int(random(12)) * 360 / 12;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let m = new Mover(x, y, w, h);
      movers.push(m);
    }
  }
  background(hue_num, 90, 15);
  drawNoise(55000);
}

function draw() {
  blendMode(NORMAL);
  //background(300, 90, 15,0.5);
  // blendMode(ADD);

  for (let m of movers) {
    for (let i = 0; i < 10; i++) {
      let n = m.update(frameCount + i);
      m.drawBound();
      m.display(n);
      m.checkBound();
      m.drawBound();
    }
  }
	if(frameCount % 1000 == 0){
		init();
	}
	
}

function mousePressed() {
  saveCanvas("output-" + cells + "_" + frameCount + ".png");
}

function drawNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    noStroke();
    fill(0, 0, 100, random(5));
    ellipse(x, y, w, h);
  }
}

class Mover {
  constructor(_x, _y, _w, _h) {
    this.bound = new Bound(_x, _y, _w, _h);
    this.pos = createVector(_x + _w / 2, _y + _h / 2);
    this.prev_pos = this.pos.copy();
    this.vel = createVector();
    this.noiseScale = random(200, 400);
    this.angle = random(360);
    this.isDraw = random(100) < 50;
    this.isFirst = random(100) < 50;
  }
  update(_num) {
    let n = noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale, _num / this.noiseScale);
    this.angle += map(n, 0, 1, -0.5, 0.5);
    let mag = noise(frameCount / 100) * 3 / 10 / 2;
    this.vel = createVector(cos(this.angle) * mag, sin(this.angle) * mag);
    this.prev_pos = this.pos.copy();
    this.pos.add(this.vel);
    return n;
  }
  display(_n) {
    if (this.isFirst || this.isDraw) {
      fill(0, 0, 100, 100);
      noStroke();
      ellipse(this.pos.x, this.pos.y, w / 8);
      this.isFirst = false;
      this.isDraw = false;
    }
    stroke(0, 0, 100, 100);
    strokeWeight(w / 50);
    noFill();
    line(this.pos.x, this.pos.y, this.prev_pos.x, this.prev_pos.y);
  }

  drawBound() {
    // fill(0, 0, 0, 5);
    // stroke(0, 0, 0);
    // noFill();
    // rect(this.bound.x, this.bound.y, this.bound.w, this.bound.h);
  }
  checkBound() {
    let x = constrain(this.pos.x, this.bound.x, this.bound.x + this.bound.w);
    let y = constrain(this.pos.y, this.bound.y, this.bound.y + this.bound.h);
    let halfX = this.bound.x + this.bound.w / 2;
    let halfY = this.bound.x + this.bound.w / 2;
    if ((this.pos.x != x && this.pos.y != y) || (int(x) == int(halfX) && this.pos.y != y) || (int(y) == int(halfY) && this.pos.x != x)) {
      this.isDraw = true;
    }
    this.pos.x = x;
    this.pos.y = y;
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