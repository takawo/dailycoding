let mover;
let movers = [];
let mover_num = 50;
let url = "https://coolors.co/app/e6056b-3a3335-f0544f-fdf0d5-c6d8d3";
let palette;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  palette = createPalette(url);

  for (let i = 0; i < mover_num; i++) {
    let x = random(width);
    let y = random(height);
    let mover = new Mover(x, y, palette);
    movers.push(mover);
  }

  background(0, 0, 100);
}

function draw() {
  for (let mover of movers) {
    mover.update();
    mover.display();
  }

}

class Mover {
  constructor(x, y, palette) {
    this.springRatio = random(0.15,0.25);
    this.colors = palette.concat();
    // random(0.15,0.3);
    this.init(x, y);
  }
  init(x, y, d) {
    this.center = createVector(x, y);
    this.c1 = random(this.colors);
    this.c2 = random(this.colors);
    while (this.c1 == this.c2) {
      this.c2 = random(this.colors);
    }
    let dAngle = random(8) * 360 / 8;
    let x2 = this.center.x + cos(dAngle) * width / 8;
    let y2 = this.center.y + sin(dAngle) * height / 8;
    this.target = createVector(x2, y2);
    this.angle = int(random(8)) * 360 / 8;
    this.targetAngle = this.angle + int(random(-2, 2)) * 45;
    this.spdx = 0;
    this.spdy = 0;
    this.spdangle = 0;
    this.spdw = 0;
    this.spdh = 0;
    this.w = int(random(1, 4)) * 25;
    this.h = int(random(1, 4)) * 25;
    this.tw = int(random(1, 4)) * 25;
    this.th = int(random(1, 4)) * 25;
    if (d) {
      this.w = d;
      this.h = d;
    }
    this.maxDist = p5.Vector.dist(this.center, this.target);
  }
  update() {

    this.dist = p5.Vector.dist(this.center, this.target);
     colorMode(RGB);
   this.color = lerpColor(this.c1,this.c2,(this.maxDist-this.dist)/this.maxDist);
     colorMode(HSB);

    this.spdw = lerp(this.spdw, (this.tw - this.w) * this.springRatio, this.springRatio / 2);
    this.w += this.spdw;

    this.spdh = lerp(this.spdh, (this.th - this.h) * this.springRatio, this.springRatio / 2);
    this.h += this.spdh;

    this.spdangle = lerp(this.spdangle, (this.targetAngle - this.angle) * this.springRatio, this.springRatio / 2);
    this.angle += this.spdangle;

    this.spdx = lerp(this.spdx, (this.target.x - this.center.x) * this.springRatio, this.springRatio / 2);
    this.center.x += this.spdx;

    this.spdy = lerp(this.spdy, (this.target.y - this.center.y) * this.springRatio, this.springRatio / 2);
    this.center.y += this.spdy;

    if (this.dist < 0.01) {
      this.c1 = this.c2;
      this.c2 = random(this.colors);      
    while (this.c1 == this.c2) {
      this.c2 = random(this.colors);
    }
      
      this.dAngle = random(8) * 360 / 8;
      let x2 = this.center.x + cos(this.dAngle) * width / 8;
      let y2 = this.center.y + sin(this.dAngle) * height / 8;
      this.target = createVector(x2, y2);
      this.targetAngle = this.angle + int(random(-2, 2)) * 45;;

      this.tw = this.w + int(random(-2, 2)) * 25;
      this.th = this.w + int(random(-2, 2)) * 25;
      this.maxDist = p5.Vector.dist(this.center, this.target);
      if (this.checkBound()) {
        this.init(random(width), random(height), 0);
      }
    }
  }
  checkBound() {
    return (this.center.x - this.w / 2 < 0 || this.center.x + this.w / 2 > width ||
      this.center.y - this.h / 2 < 0 || this.center.y + this.h / 2 > height);
  }
  display() {
    push();
    translate(this.center.x, this.center.y);
    rotate(this.angle);
    rectMode(CENTER);
    // noStroke();
    stroke(0,0,0,30);
    fill(this.color);
    drawingContext.shadowColor = color(0, 0, 0, 5);
    drawingContext.shadowBlur = map(this.dist, 0, this.maxDist, 0, max(this.w, this.h));
    rect(0, 0, this.w, this.h);
    pop();
  }

}

function createPalette(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = color('#' + arr[i]);
  }
  return arr;
}