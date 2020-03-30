let font;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890./!?";
let pallete = ["#374C57", "#647B81", "#B3C1BF", "#3DD0AE", "#DE2320", "#03111D"];
let graphics;
let cells, offset, margin;
let texture;
let ns = 400;
let allPoints = [];
let d;

function preload() {
  font = loadFont("Lato-ThinItalic.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  cells = 6;
  int(random(3, 8));
  offset = width / 25;
  margin = offset / 3;
  d = (width - offset * 2 - margin * (cells - 1)) / cells;
  let dd = d * 1.2;
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);

  let n = 0;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let textString = str.substr(n % str.length, 1);
      n++;
      let bound = font.textBounds(textString, 0, 0, dd);

      let x = offset + i * (d + margin);
      let y = offset + j * (d + margin);
      let cx = x + d / 2;
      let cy = y + d / 2;
      let tx = -bound.x - bound.w / 2;
      let ty = -bound.y - bound.h / 2;

      let fx = cx + tx;
      let fy = cy + ty;

      let points = font.textToPoints(textString, fx, fy, dd, {
        sampleFactor: 0.05,
        simplifyThreshold: 0
      });

      allPoints = allPoints.concat(points);
      let rotate_num = int(random(4)) * 360 / 4;

      graphics.push();
      graphics.translate(cx, cy);
      graphics.translate(tx, ty);

      graphics.textFont(font);
      graphics.textSize(dd);
      graphics.noStroke();
      graphics.fill(0, 0, 100);
      // graphics.drawingContext.shadowColor = color(0, 0, 0);
      // graphics.drawingContext.shadowBlur = d / 4;
      graphics.text(textString, 0, 0);

      graphics.pop();
    }

  }
}

function draw() {
  background(0, 0, 20);
  //image(graphics, 0, 0);
  let i = 0;
  for (let p of allPoints) {
    push();
    translate(p.x, p.y);
    rotate((i + frameCount) * 3);
    noStroke();
    ellipse(cos(i - frameCount)*d/3,  sin(i + frameCount) * d/3, d/20, d/20);
    pop();
    i++;
  }

}

function drawEllipseLine(x1, y1, x2, y2, d1, d2, c1 = color(0, 0, 0), g) {
  let distance = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let d = d1;

  g.push();

  g.drawingContext.shadowColor = color(0, 0, 100);
  g.drawingContext.shadowBlur = max(d1, d2) * 2;

  g.translate(x1, y1);
  g.rotate(angle);
  g.noStroke();
  g.fill(c1);
  g.beginShape();
  for (let angle = 90; angle < 270; angle++) {
    g.vertex(cos(angle) * d1 / 2, sin(angle) * d1 / 2);
  }
  for (let angle = 270; angle < 360 + 90; angle++) {
    g.vertex(distance + cos(angle) * d2 / 2, sin(angle) * d2 / 2);
  }

  g.endShape(CLOSE);

  g.pop();
}