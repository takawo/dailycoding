let movers = [];
let url = "https://coolors.co/app/6a0136-b81365-bfab25-026c7c-444b6e";
let pallete;
let graphics;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  pallete = createPallete(url);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  let percent = 30 / 100;
  let radius = sqrt(sq(width / 2) + sq(height / 2));
  graphics.fill(0, 0, 40, 1);
  graphics.noStroke();
  for (let i = 0; i < width * height * percent; i++) {
    let angle = random(360);
    let r = 1 - (random(random(1)));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }


  for (let i = 0; i < 50; i++) {
    let angle = int(random(8)) * 360 / 8;
    let p = p5.Vector.fromAngle(angle, 100).add(createVector(width / 2, height / 2));
    let m = new Mover(p, random(1, 5) * 20);
    movers.push(m);
  }
  background(0, 0, 90);
}

function draw() {
  image(graphics, 0, 0);
  background(0, 0, 90, 5);
  for (let m of movers) {
    m.update();
    m.display();
  }
}

class Mover {
  constructor(center, r) {
    this.init(center, r);
  }
  init(center, r) {
    this.c = random(pallete);
    this.center = center.copy();
    this.r = r;
    this.currentAngle = int(random(4)) * 360 / 4;
    this.direction = random(100) > 50 ? -1 : 1;
    this.step = int(random(2, 5)) * 30;
    this.angleStep = 90 / this.step;
    this.currentPosition;
    this.prevPosArr = [];
    this.maxLength = 100;
    this.count = 0;
  }
  update() {
    this.currentAngle += this.direction * this.angleStep;
    this.currentPosition = createVector(cos(this.currentAngle), sin(this.currentAngle)).mult(this.r).add(this.center);
    this.prevPosArr.push(this.currentPosition);
    if (this.prevPosArr.length > this.maxLength) {
      this.prevPosArr.shift();
    }
    this.count++;

    if (this.count % this.step == 0) {
      let angle = -atan2(this.currentPosition.y - this.center.y,
        this.currentPosition.x - this.center.x);
      angle += int(random(3)) * 360 / 4 - 90;
      //this.r = map(int(random(9)),0,8,this.r*0.8,this.r*1.2);
      this.center = createVector(this.currentPosition.x + cos(angle) * this.r, this.currentPosition.y + sin(angle) * this.r);
      this.currentAngle = atan2(this.currentPosition.y - this.center.y,
        this.currentPosition.x - this.center.x);
    }
    if (random(100) < .1) {
      let angle = int(random(8)) * 360 / 8;
      let p = p5.Vector.fromAngle(angle, 100).add(createVector(width / 2, height / 2));
      this.init(p, random(1, 5) * 10);
    }
  }
  display() {
    //ellipse(this.center.x,this.center.y,10);
    noFill();
    stroke(this.c);
    strokeCap(ROUND);
    strokeWeight(this.r / 30);
    beginShape();
    for (let p of this.prevPosArr) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');

  for (let i = 0; i < arr.length; i++) {
    let red = unhex(arr[i].substr(0, 2));
    let green = unhex(arr[i].substr(2, 2));
    let blue = unhex(arr[i].substr(4, 2));
    colorMode(RGB, 255, 255, 255);
    let c = color(red, green, blue);
    let h = hue(c);
    let s = saturation(c);
    let b = brightness(c);
    let t = 100 * 3 / 4;
    colorMode(HSB, 360, 100, 100, 100);
    c = color(h, s, b, t);
    arr[i] = c;
  }
  return arr;
}