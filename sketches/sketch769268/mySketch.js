let font;
let data, data2;
let hexes = [];
let graphics;
let pallete = [];
let bg;
let ratio = 0.75;

function preload() {
  font = loadFont("fa-solid-900.ttf");
  let url = "icons.json";
  data = loadJSON(url);
  pallete = createPallete("https://coolors.co/app/0016bf-ff0094-3772ff-00fddc-f5d547");
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
  colors.splice(bgNum, 1);

  background(bg);
  separateGrid(0, 0, width, colors);
  image(graphics, 0, 0);
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


function separateGrid(x, y, d, col) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w, col);
      } else {
        textSize(w * 0.8);
        textAlign(CENTER, CENTER);
        let n = int(random(hexes.length));
        let str = String.fromCodePoint(unhex(hexes[n]));
        // text(), i + w / 2, j + w / 2-w/20);
        if (random(100) < 50) {
          let g = createGraphics(ceil(w / 2), w);
          g.colorMode(HSB, 360, 100, 100, 100);
          g.textFont(font);
          g.textSize(w * ratio);
          g.textAlign(CENTER, CENTER);
          g.fill(random(col));
          g.text(str, w / 2, w / 2);
          push();
          translate(i, j);
          image(g, 0, 0);
          translate(w, 0);
          scale(-1.0, 1.0);
          image(g, 0, 0);
          pop();
        } else {
          let g = createGraphics(w, ceil(w / 2));
          g.colorMode(HSB, 360, 100, 100, 100);
          g.fill(random(col));
          g.textSize(w * ratio);
          g.textFont(font);
          g.textAlign(CENTER, CENTER);
          g.text(str, w / 2, w / 2);
          push();
          translate(i, j);
          image(g, 0, 0);
          translate(0, w);
          scale(1.0, -1.0);
          image(g, 0, 0);
          pop();

        }
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