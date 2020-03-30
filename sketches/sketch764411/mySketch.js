let font;
let data, data2;
let hexes = [];
let graphics;

function preload() {
  font = loadFont("Font_Awesome_5_Brands-Regular-400.otf");
  let url = "icons.json";
  data = loadJSON(url);
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  for (let obj in data) {
    if (data[obj].styles == "brands" || data[obj].styles == "brands") {
      hexes.push(data[obj].unicode);
    }
  }
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawTexture(graphics, 10 / 100, color(0, 0, 0, 10));
}

function draw() {
  background(0, 0, 95);
  separateGrid(0, 0, width);
  image(graphics,0,0);
  frameRate(1);
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


function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        textSize(w * 0.85);
        textFont(font);
        textAlign(CENTER, CENTER);
        let n = int(random(hexes.length));
        text(String.fromCodePoint(unhex(hexes[n])), i + w / 2, j + w / 2);
      }
    }
  }
}