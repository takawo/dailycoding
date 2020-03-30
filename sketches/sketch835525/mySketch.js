let movers = [];
let num = 30;
let pallete;
let url = "https://coolors.co/app/3d315b-444b6e-708b75-9ab87a-f8f991";
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  pallete = createPallete(url);
  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(width / 15, width / 10);
    movers.push(new Mover(x, y, r));
  }

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  graphics.fill(0, 0, 100, 1);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  background(0, 0, 0, 10);
  for (let m of movers) {
    m.update();
    m.display();
  }
  image(graphics, 0, 0);
}

class Mover {
  constructor(x, y, r) {
    this.c = random(pallete);
    while (this.c == this.nc) {
      this.nc = random(pallete);
    }
    this.center = createVector(x, y);
    this.r = r;
    this.currentAngle = int(random(4)) * 360 / 4;
    this.targetAngle = this.currentAngle + int(random(3) - 1) * 360 / 4;
    this.step = int(random(5, 9)) * 15;
    this.freq = int(random(1, 3)) * (random(100) > 50 ? -1 : 1);
    this.currentStep = 0;
    this.angleStep = 90 / this.step;
    this.currentPosition;
    this.trail = [];
    this.trailMaxLength = 100;
  }
  update() {
    this.currentAngle += this.angleStep;
    this.currentStep++;
    this.currentPosition = createVector(cos(this.currentAngle), sin(this.currentAngle)).mult(this.r).add(this.center);
    this.trail.push(this.currentPosition);
    if (this.trail.length > this.trailMaxLength) {
      this.trail.shift();
    }
    if (this.currentStep % this.step == 0) {
      let angle = int(atan2(this.currentPosition.y - this.center.y,
        this.currentPosition.x - this.center.x));
      angle += (int(random(3)) - 1) * 360 / 4;
      this.center = createVector(cos(angle), sin(angle)).mult(this.r);
      this.center.add(this.currentPosition);
      this.currentAngle = atan2(this.currentPosition.y - this.center.y,
        this.currentPosition.x - this.center.x)
    }
  }
  display() {
    noStroke();
    fill(this.c);
    let i = 0;
    for (let t of this.trail) {
      //vertex(t.x, t.y);
      let d = sin(this.currentStep + i * this.freq) * this.r / 4;
      ellipse(t.x - d / 2, t.y - d / 2, d);
      i++;
    }
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