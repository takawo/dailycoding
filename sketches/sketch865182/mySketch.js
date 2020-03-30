let json;
let codePoints = [];
let graphics;

function preload() {
  json = loadJSON("data.json", function() {
    for (let i = 0; i < Object.keys(json).length; i++) {
      codePoints.push(json[i].fromCodePoint);
    };
    // print(codePoints);
  });
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);
  graphics.noStroke();
  graphics.fill(0, 0, 0, 10);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    let angle = random(360);
    graphics.push();
    graphics.translate(x, y);
    graphics.rotate(angle);
    graphics.ellipse(0, 0, w, h);
    graphics.pop();
  }
  frameRate(0.5);
}

function draw() {
  background(0, 0, 95);
  image(graphics, 0, 0);
  separateGrid(0, 0, width);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d >= width / 5) {
        separateGrid(i, j, w);
      } else {
        push();
        translate(i + w / 2, j + w / 2);
        let codePoint = random(codePoints);
        let str = String.fromCodePoint(codePoint);
        drawingContext.shadowColor = color(0, 0, 0,30);
        drawingContext.shadowBlur = w / 8;
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(w);
        text(str, 0, 0);
        pop();
      }
    }
  }
}