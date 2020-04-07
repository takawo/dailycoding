let str = "行き止まりいき一方通行この先できません私有地迂回U";
let pallete = ["#FE9B00", "#EA9C4A", "#D82C19", "#EDE8EA", "#A8A3AC"];
let font;
let graphics;
let textureGraphics;

function preload() {
  font = loadFont("NotoSansJP-Black.otf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);

  textureGraphics = createGraphics(width, height);
  textureGraphics.colorMode(HSB, 360, 100, 100, 100);
  textureGraphics.angleMode(DEGREES);
  textureGraphics.stroke(0,0,100,5);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    textureGraphics.strokeWeight(random(3));
    textureGraphics.point(random(width), random(height));
  }

}

function draw() {
  background(0, 0, 100);
  graphics.background(0, 0, 20);

  let offset = width / 10;

  separateGrid(offset, offset, width - offset * 2);
  image(graphics, 0, 0);
  image(textureGraphics, 0, 0);
  frameRate(1);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5 && d <= width) {
        separateGrid(i, j, w);
      } else {
        let c = random(pallete);
        let cx = i + w / 2;
        let cy = j + w / 2;
        let s = str.substr(int(random(str.length)), 1);
        let bound = font.textBounds(s, 0, 0, w);

        graphics.push();
        graphics.textSize(w);
        graphics.textFont(font);
        graphics.translate(cx, cy);
        graphics.translate(-bound.x - bound.w / 2, -bound.y - bound.h / 2);
        graphics.erase(255, 0);
        graphics.text(s, 0, 0);
        graphics.push();
        graphics.noErase();
        graphics.stroke(c);
        graphics.noFill();
        graphics.drawingContext.shadowBlur = w / 10;
        graphics.drawingContext.shadowColor = color(0, 0, 100);
        graphics.strokeWeight(w / 100);
        graphics.text(s, 0, 0);
        graphics.pop();


        graphics.pop();
        // graphics.rect(i, j, w, w);
        draw10Print(i, j, w, w, c);
      }
    }
  }
}

function draw10Print(x, y, w, h, c) {
  push();
  translate(x, y);
  let sep = int(random(10, 20));
  let d = w / sep;
  stroke(c);
  strokeWeight(d / 5);
  strokeCap(PROJECT);
  for (let j = 0; j < sep; j++) {
    for (let i = 0; i < sep; i++) {
      let xx = d * i;
      let yy = d * j;
      if (random(100) > 50) {
        line(xx, yy, xx + d, yy + d);
      } else {
        line(xx + d, yy, xx, yy + d);
      }
    }
  }
  pop();
}