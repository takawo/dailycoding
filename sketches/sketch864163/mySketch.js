let font;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890./!?";
let pallete = ["#374C57", "#647B81", "#B3C1BF", "#3DD0AE", "#DE2320", "#03111D"];
let tf;
let movers = [];
let mover_num = 600;
let cells, offset, margin;
let graphics;
let texture;
let ns = 400;

function preload() {
  font = loadFont("Lato-Bold.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.noStroke();
  for (let i = 0; i < texture.width * texture.height * 8 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    texture.fill(0, 0, 0, 5);
    texture.ellipse(x, y, w, h);
  }
}

function draw() {

  blendMode(BLEND);
  background(0, 0, 95);
  image(texture, 0, 0);
  blendMode(BURN);
  cells = 2;
  int(random(3, 8));
  offset = width / 25;
  margin = offset / 3;
  let d = (width - offset * 2 - margin * (cells - 1)) / cells;
  let dd = d * 1.2;

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);

  let n = 0;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let textString = str.substr(int(random(str.length)), 1);
      let bound = font.textBounds(textString, 0, 0, dd);

      let x = offset + i * (d + margin);
      let y = offset + j * (d + margin);
      let cx = x + d / 2;
      let cy = y + d / 2;

      let rotate_num = int(random(4)) * 360 / 4;

      graphics.push();
      graphics.translate(cx, cy);
      graphics.translate(-bound.x - bound.w / 2, -bound.y - bound.h / 2);
      graphics.textFont(font);
      graphics.textSize(dd);
      graphics.noStroke();
      graphics.fill(0, 0, 100);
      graphics.drawingContext.ShadowColor = color(0, 0, 100);
      graphics.drawingContext.shadowBlur = d;
      graphics.drawingContext.shadowOffsetX = d / 2;
      graphics.drawingContext.shadowOffsetY = d / 2;
      graphics.text(textString, 0, 0);
      graphics.pop();
      separateGrid(x, y, d,d);
      n++;
    }
  }
  noLoop();
  frameRate(1);
}


function separateGrid(x, y, d,dMax) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      let n = noise(i / ns, j / ns, frameCount / ns);
      if (n > 0.05 && d > dMax / 15) {
        separateGrid(i, j, w,dMax);
      } else {
        let p1 = createVector(i, j);
        let p2 = createVector(i + d, j);
        let p3 = createVector(i + d, j + d);
        let p4 = createVector(i, j + d);
        let a1 = graphics.get(p1.x, p1.y);
        let a2 = graphics.get(p2.x, p2.y);
        let a3 = graphics.get(p3.x, p3.y);
        let a4 = graphics.get(p4.x, p4.y);
        let sum = alpha(a1) + alpha(a2) + alpha(a3) + alpha(a4);
        if (sum > 0) {
          let c1 = random(pallete);

          drawingContext.shadowColor = color(c1 + hex(200, 2));
          drawingContext.shadowBlur = w * 2;
          // drawingContext.shadowOffsetY = w / 2;
          // drawingContext.shadowOffsetX = w / 2;

          fill(c1);
          noStroke();
          if (random(100) > 50) {
            ellipse(i + w / 2, j + w / 2, w, w);
          } else {
            rect(i, j, w, w);

          }
        }
      }
    }
  }
}