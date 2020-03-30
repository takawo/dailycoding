let font;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,."
let graphics;

function preload() {
  font = loadFont("SRM_glyph-Semibold_beta.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.stroke(0, 0, 0, 10);
  for (let i = 0; i < width * height * 5 / 100; i++) {
    graphics.point(random(graphics.width),
      random(graphics.height));
  }
  textFont(font);
}

function draw() {
  background(0, 0, 95);
  let offset = width / 10;
  separateGrid(-offset, -offset, max(width, height) + offset * 2);
  frameRate(1);
  image(graphics, 0, 0);
  //noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
        //rect(i, j, w, w);
        textAlign(CENTER, CENTER);
        // stroke(0,0,100);
        // strokeWeight(w/10);
        let s = str[int(random(str.length))];
        if (s != "G") {
          textSize(w * 1.2);
          text(s, i + w / 2, j + w / 2 - w / 5);
        } else {
          textSize(w * 1.1);

          text(s, i + w / 2, j + w / 2 - w / 4);
        }
      }
    }
  }
}