let font;
let data, data2;
let hexes = [];
let graphics;
let pallete = [];
let bg;


function preload() {
  font = loadFont("fa-solid-900.ttf");
  let url = "icons.json";
  data = loadJSON(url);
  pallete = createPallete("https://coolors.co/app/320d6d-db504a-ff6f59-323232-43aa8b");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  for (let obj in data) {
    if (data[obj].styles == "solid" || data[obj].styles == "solid") {
      hexes.push(data[obj].unicode);
    }
  }
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawTexture(graphics, 10 / 100, color(0, 0, 100, 5));
  //noLoop();  
}

function draw() {
  let colors = pallete.concat();
  let bgNum = int(random(colors.length));
  bg = colors[bgNum];
  colors.splice(bgNum,1);  
  
  background(bg);
  separateGrid(0, 0, width,colors);
  image(graphics,0,0);
  frameRate(0.5);
}

function drawTexture(g, percent, col) {
  g.push();
  g.fill(col);
  g.noStroke();
  for (let i = 0; i < width * height * percent; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    g.ellipse(x, y, w, h);
  }
  g.pop();
}


function separateGrid(x, y, d,col) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w,col);
      } else {
        textSize(w * 0.8);
        textFont(font);
        textAlign(CENTER, CENTER);
        let n = int(random(hexes.length));
        fill(random(col));
        text(String.fromCodePoint(unhex(hexes[n])), i + w / 2, j + w / 2-w/20);
      }
    }
  }
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