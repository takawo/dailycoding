// This code inspired by @timrodenbroeker 's awesome tutorial
// https://timrodenbroeker.de/processing-tutorial-kinetic-typography-1/

let url = "https://coolors.co/app/59c3c3-52489c-ebebeb-cad2c5-84a98c";
let pallete;
let bg;
let bdd
let graphics;
let font;
let str = "abcdefghijklmnopqrtsuvwxyz";
let isOut = false;
let counter = 0;
let tileX;
let tileY;

function preload() {
  font = loadFont("RobotoMono-Regular.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  pallete = createPallete(url);
  let bn = int(random(pallete.length));
  bc = pallete[bn]
  pallete.splice(bn, 1);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, bg);

  graphicsInit();
}

function draw() {
  background(bc + "66");

  let tileW = int(width / tileX);
  let tileH = int(height / tileY);
  for (let y = 0; y < tileY; y++) {
    for (let x = 0; x < tileX; x++) {
      let wave = int(sin(frameCount * 0.025 + ( x * tileH * y*tileH ) * 0.000015) * 100);
      // SOURCE
      let sx = x * tileW + wave;
      let sy = y * tileH;
      let sw = tileW;
      let sh = tileH;

      // DISTINATION
      let dx = x * tileW;
      let dy = y * tileH;
      let dw = tileW;
      let dh = tileH;

      copy(graphics, sx, sy, sw, sh,
        dx, dy, dw, dh)

      if (x == 0 && y == tileY - 1) {
        if (sx < 0) {
          isOut = true;
        } else {
          isOut = false;
          counter = 0;
        }
      }
    }
  }
  image(bg, 0, 0);
  
  if(frameCount % 300 == 0){
  
  graphicsInit();
  }
}

function graphicsInit() {
  tileX = int(random(3, 10)) * 5;
  tileY = tileX;

  let fillColor = pallete[int(random(pallete.length))];

  let s = str.substr(int(random(str.length)), 1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.fill(fillColor);
  graphics.textSize(width);
  graphics.textFont(font);
  graphics.push();
  graphics.translate(width / 2, height / 2-180);
  graphics.textAlign(CENTER, CENTER);
  graphics.text(s, 0, 0);
  graphics.pop();

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
  let c = color(0, 0, 0, 3);
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