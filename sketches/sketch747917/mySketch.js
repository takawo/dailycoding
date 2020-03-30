let font;
let movers;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let pallete;
let graphics;
let textGraphics;
let imgs = [];
let imgLen = alphabet.length;
let imgGraphics;
let url = "https://coolors.co/app/50514f-f25f5c-ffe066-247ba0-70c1b3";

function preload() {
  font = loadFont("AbrilFatface-Regular.ttf");
  for(let i = 0; i < imgLen; i++){
  imgs[i] = loadImage("https://loremflickr.com/" + 800 + "/" + 800 + "/?random=" + int(random(10000)));
  }
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  init();
}

function init() {
  pallete = createPallete(url);
  movers = [];
  let strNum = int(random(alphabet.length));
  let imgNum = int(random(imgs.length));
  let txt = alphabet.substr(strNum, 1);
  let fontsize = width * 0.9;
  let x = width / 2 - fontsize / 3;
  let y = height / 2 + fontsize / 3;
  let options = {
    sampleFactor: .5,
    simplifyThreshold: 0
  };

  let bgNum = int(random(pallete.length));
  let bg = pallete[bgNum];
  pallete.splice(bgNum, 1);
  let txtNum = int(random(pallete.length));
  let tc = pallete[txtNum];
  pallete.splice(txtNum, 1);
  background(bg);

  textGraphics = createGraphics(width, height);
  textGraphics.textFont(font);
  textGraphics.textSize(fontsize);
  textGraphics.fill(tc);
  textGraphics.text(txt, x, y);
  imgGraphics = createImage(imgs[imgNum].width,imgs[imgNum].height);
  imgGraphics.copy(imgs[imgNum],0,0,imgs[imgNum].width,imgs[imgNum].height,0,0,imgs[imgNum].width,imgs[imgNum].height);
  imgGraphics.mask(textGraphics);
  let points = font.textToPoints(txt, x, y, fontsize, options);
  for (let p of points) {
    let c = imgs[imgNum].get(p.x,p.y);
    let m = new Mover(p.x, p.y, c);
    movers.push(m);
  }
  image(graphics, 0, 0);
  image(imgGraphics, 0, 0);
}


function draw() {
  let i = 0;
  let removeArr = [];
  for (let i = 0; i < movers.length; i++) {
    let m = movers[i];
    m.update();
    m.display();
    if (m.isDead()) {
      removeArr.push(i);
    }
  }
  for(let j = removeArr.length-1; j > 0; j--){
    movers.splice(removeArr[j],1);
  }
  if(frameCount %150 == 0){
    init();
  }
}

class Mover {
  constructor(_x, _y, _color) {
    this.pos = createVector(_x, _y);
    let nx = 1 / 50;
    let ny = 1 / 100;
    let nz = 1 / random(10, 50);
    this.noiseScale = createVector(nx, ny, nz);
    this.life = 300;
    this.lifeRatio = this.life / 100;
    this.color = _color;

  }
  update() {
    let n = noise(this.pos.x * this.noiseScale.x,
      this.pos.y * this.noiseScale.y);
    let angle = map(n, 0, 1, -180, 180);
    angle = (angle + frameCount / 10) % 360;
    let vel = createVector(cos(angle), sin(angle));
    this.pos.add(vel);
    this.life -= this.lifeRatio;
  }
  isDead() {
    return this.life < 0;
  }
  display() {
    strokeWeight(map(this.life, 0, 300, 0, 3));
    stroke(this.color);
    point(this.pos.x, this.pos.y);
  }
}

function mousePressed() {
  init();
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {

    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 10);
    _graphics.ellipse(x, y, w, h);
  }
}