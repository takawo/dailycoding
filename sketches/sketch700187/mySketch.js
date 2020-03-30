// reference : http://takawo.hatenablog.com/entry/2017/10/17/213624

let circles = [];
let points = [];
let pg;
let pallete = ["#222222", "#84DCC6", "#8EB1C7", "#0D3951", "#C1152F"];
let texture;
let bgColor;
let font;
let randomness;
function preload(){
  font = loadFont("comfortaa.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  init();
}

function init() {
  pg = createGraphics(width, height);
  pg.colorMode(HSB, 360, 100, 100);
  pg.background(0, 0, 0);
  pg.fill(0, 0, 100);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(200);
  pg.textFont(font);
  pg.text("CIRCLE", width / 2, height / 2);
	randomness = int(random(10,50));

  let n = int(random(pallete.length));
  bgColor = pallete[n];
  pallete.splice(n, 1);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100);
  drawNoiseBackground(50000, texture);

  let i = 0;
  for (let y = 0; y < pg.height; y += 1) {
    for (let x = 0; x < pg.width; x += 1) {
      let c = pg.get(x, y);
      let b = brightness(c);
      if (b > 1) {
        points[i] = createVector(x, y);
        i++;
      }
    }
  }
}

function draw() {
  background(bgColor);
  // image(pg,0,0);
  let total = 2;
  let count = 0;
  let attempts = 0;
  if (random(100) > randomness) {
    while (count < total) {
      let c;
      c = createCircle();
      if (c != null) {
        circles.push(c);
        count++;
      }
      attempts++;
      if (attempts > 50) {
        noLoop();
        break;
      }
    }
  }
  for (let c of circles) {
    if (c.isAlive) {
      if (c.isEdge()) {
        c.isAlive = false;
      } else {
        for (let other of circles) {
          if (c != other) {
            let d = dist(c.pos.x, c.pos.y, other.pos.x, other.pos.y);
            if (d < c.r + other.r) {
              c.isAlive = false;
              break;
            }
          }
        }
      }
    }
    c.draw();
    c.grow();
  }
  image(texture, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
  let c;
  if (brightness(bgColor) > 50) {
    c = color(0, 0, 0, 7);
  } else {
    c = color(0, 0, 100, 7);
  }
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

function createCircle() {
  let n = int(random(points.length));
  let x = points[n].x;
  let y = points[n].y;
  for (let c of circles) {
    let d = dist(x, y, c.pos.x, c.pos.y);
    if (d < c.r) {
      return null;
    }
  }
  return new Circle(x, y);
}

class Circle {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.isAlive = true;
    this.r = 1;
    this.c = pallete[int(random(pallete.length))];
  }
  grow() {
    if (this.isAlive) {
      this.r += 0.1;
    }
  }
  isEdge() {
    return (this.pos.x + this.r > width || this.pos.x - this.r < 0 || this.pos.y + this.r > height || this.pos.y - this.r < 0);
  }
  draw() {
    // stroke(0, 0, 100);
    // strokeWeight(0.5);
    fill(this.c);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}