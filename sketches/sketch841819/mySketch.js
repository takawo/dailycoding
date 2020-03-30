let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallete;

let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let str2 = str.concat();
let fontLayer;
let dotLayer;
let bg;

let font;
let rs;

function preload() {
  font = loadFont("Chewy-Regular.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 5);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }

  pallete = createPallete(url);

  //noLoop();
}

function draw() {
  let w = sqrt(sq(width) + sq(height));
  rs = random(10000);

  dotLayer = createGraphics(width, height);
  dotLayer.colorMode(HSB, 360, 100, 100, 100);
  dotLayer.angleMode(DEGREES);

  randomSeed(rs);

  dotLayer.background(0, 100, 90);
  dotLayer.push();
  dotLayer.translate(width / 2, height / 2);
  dotLayer.rotate(45);
  separateGrid(-w / 2, -w / 2, w, dotLayer);
  dotLayer.pop();


  randomSeed(rs);
  fontLayer = createGraphics(width, height);
  fontLayer.colorMode(HSB, 360, 100, 100, 100);
  fontLayer.angleMode(DEGREES);
  fontLayer.background(0, 0, 15);
  fontLayer.erase(255, 0);
  fontLayer.textAlign(CENTER, CENTER);
  fontLayer.textFont(font);

  fontLayer.push();

  fontLayer.translate(width / 2, height / 2);
  fontLayer.rotate(45);
  separateGridTypo(-w / 2, -w / 2, w, fontLayer);
  fontLayer.pop();

  frameRate(.5);

  image(dotLayer, 0, 0);
  image(fontLayer,0,0);
  image(bg,0,0);
}

function separateGrid(x, y, d, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w, g);
      } else {
        let n = int(random(2, 29));
        drawPattern(i, j, w, w, n, g);
      }
    }
  }
}

function separateGridTypo(x, y, d, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGridTypo(i, j, w, g);
      } else {
        let n = int(random(2, 29));
        drawTypo(i, j, w, w, g);
      }
    }
  }
}

function drawTypo(_x, _y, _w, _h, _g) {
  if (str2.length < 1) {
    str2 = str.concat();
  }
  let snum = int(random(str2.length));
  let t = str2[snum];
  str2 = str2.replace(t, "");

  _g.push();
  _g.translate(_x + _w / 2, _y + _h / 2);
  _g.rotate(-45);
  _g.translate(0, -_w / 9);
  _g.textSize(_w);
  _g.text(t, 0, 0);
  _g.pop();
}

function drawPattern(_x, _y, _w, _h, _n, _g) {
  _g.fill(random(pallete));
  _g.rect(_x,_y,_w,_h);
  _g.stroke(0, 0, 100);
  _g.strokeWeight(_w/100);
  _g.push();
  _g.translate(_x,_y);
  for (let j = 0; j <= _h; j++) {
    for (let i =  0; i <= _w; i++) {
      let m = int(j * _w + i);
      if (m % _n == 0) {
        _g.point(i, j);
      }
    }
  }
  _g.pop();
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