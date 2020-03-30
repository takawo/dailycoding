let pallete = ["#FC8A81", "#F8887C", "#E92D17", "#F95D91", "#DBCDA9", "#737A84", "#071243"];
let bg;
let lines = [];
let points = [];
let num = 1000;

let rMax;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  let n = int(random(pallete.length));
  bg = pallete[n];
  pallete = pallete.filter(n => n !== bg); //選んだ背景色を配列から削除

  angleMode(DEGREES);
  rMax = sqrt(sq(width / 2) + sq(height / 2));

  let lineNum = 300;
  let pointNum = num - lineNum;
  for (let i = 0; i < lineNum; i++) {
    let angle = random(360);
    let r = random(rMax / 2);
    lines.push(new Line(angle, r, random(pallete)));
  }
  for (let i = 0; i < pointNum; i++) {
    let angle = random(360);
    let r = random(rMax);
    points.push(new Point(angle, r, random(pallete)));
  }
  background(bg);
}

function draw() {
	blendMode(BLEND);
  background(bg);
	blendMode(ADD);
  push();
  translate(width / 2, height / 2);
  scale(map(sin(frameCount),-1,1,1,5));
  for (let line of lines) {
    line.update();
    line.display();
  }
  for (let point of points) {
    point.update();
    point.display();
  }
  pop();
}

class Line {
  constructor(_angle, _r, _c) {
    this.angle = _angle;
    this.c = _c;
    this.r = _r;
    this.len = int(random(1, 5)) * 10;
    this.a = random(45,90);
    this.freq = random(1 / 15, 1 / 30);
    this.pos = createVector();
    this.direction = random(100) > 50 ? -1 : 1;
  }
  update() {
    this.r = tan((this.a + frameCount * this.freq) % 90);
    this.pos.x = cos(this.angle) * this.r;
    this.pos.y = sin(this.angle) * this.r;
  }
  display() {
    let d = map(this.r, 0, rMax, 0, 100);
    push();
    rotate(this.a + this.angle + frameCount / 10 * this.direction);
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    rectMode(CENTER);
    fill(this.c);
    noStroke();
    rect(0, 0, d*2, d / 5, d, d, d, d);
    pop();
  }
}

class Point extends Line {
  constructor(_angle, _r, _c) {
    super(_angle, _r, _c);
    this.freq = this.freq / 10;
  }
  display() {
    let d = map(this.r, 0, rMax, 0, 30);
    push();
    rotate(this.a + this.angle + frameCount / 10 * this.direction);
    translate(this.pos.x, this.pos.y);
    fill(this.c);
    noStroke();
    ellipse(0, 0, d, d);
    pop();
  }
}