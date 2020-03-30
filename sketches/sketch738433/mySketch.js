let pallete = ["#FDE3B3", "#F4D4B5", "#5C5292", "#F89D22", "#EE1F26", "#090124", "#FECA6A"];

let num = 2000;
let movers = [];
let offset;
let bg;
let ratio = 0.75;
let w = 800;
let h = 800;
let nsx;
let nsy;
let graphics;
let maskGraphics;

function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  let n = int(random(pallete.length));
  bg = pallete[n];
  pallete.splice(n, 1);

  offset = width / 10;
  
  nsx = random(50,200);
  nsy = random(50,200);
  
  
  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    movers.push(new Mover(x, y));
  }
  graphics = createGraphics(w, h);
  maskGraphics = createGraphics(w, h);

  n = int(random(3,7));
  maskGraphics.beginShape();
  for(let angle = 0; angle < 360; angle += 360/n){
    let x = w/2 + cos(angle) * (width /2 * ratio);
    let y = h/2 + sin(angle) * (width /2 * ratio);
    maskGraphics.vertex(x,y);
  }
  maskGraphics.endShape();
  graphics.background(bg);
}

function draw() {

  for (let mover of movers) {
    mover.update();
    mover.display(graphics);
  }

  for (let i = movers.length - 1; i > 0; i--) {
    let mover = movers[i];
    if (mover.life == 0) {
      movers.splice(i, 1);
    }
  }
  for (let i = movers.length; i < num; i++) {
    let angle = random(360);
    let x = random(width);
    let y = random(height);
    movers.push(new Mover(x, y));
  }
    let maskedImage = pgMask(graphics,maskGraphics);
  image(maskedImage, 0, 0);
}

class Mover {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.noiseScaleX = nsx;
    this.noiseScaleY = nsy;
    this.noiseScaleZ = random(100, 200);
    this.vel = createVector(0, 0);
    this.life = random(1);
    this.count = int(random(1, 10));
    this.c = pallete[int(random(pallete.length))];
  }
  update() {
    // let n = noise(this.pos.x / this.noiseScaleX, this.pos.y / this.noiseScaleY, frameCount / this.noiseScaleZ);
    let n = noise(this.pos.x / this.noiseScaleX, this.pos.y / this.noiseScaleY);
    let angle = map(n, 0, 1, 0, 360);
    this.vel = createVector(cos(angle), sin(angle));
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
    this.life -= random(random(random(random()))) / 10;
    this.life = constrain(this.life, 0, 1);
  }

  display(g) {
    g.strokeWeight(map(this.life, 0, 1, 0, 5));
    g.stroke(this.c + "66");
    g.point(this.pos.x, this.pos.y);
  }
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 0, 0.2);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

function pgMask(_content,_mask){
  let img = createImage(_mask.width,_mask.height);
  img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
  var contentImg = createImage(_content.width,_content.height);
  contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
  contentImg.mask(img)
  return contentImg;
}