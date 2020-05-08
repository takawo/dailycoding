let url = "https://coolors.co/app/e2302d-510048-000028-e25b53-044472";
let pallete = [];

let flaskGraphcis;
let WaterGraphcis;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  
  pallete = createPallete(url);

  flaskGraphics = createGraphics(width, height);
  flaskGraphics.colorMode(HSB, 360, 100, 100, 100);
  flaskGraphics.angleMode(DEGREES);
  flaskGraphics.background(0, 0, 95);
  flaskGraphics.stroke(0, 0, 0, 5);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    flaskGraphics.strokeWeight(random(3));
    flaskGraphics.point(random(width), random(height));
  }

  waterGraphics = createGraphics(width, height);
  waterGraphics.colorMode(HSB, 360, 100, 100, 100);
  waterGraphics.angleMode(DEGREES);

  let offset = width / 20;
  separateGrid(offset,offset,width - offset*2, flaskGraphics, waterGraphics);

}

function draw() {
  background(0, 0, 80);
  image(waterGraphics, 0, 0);
  image(flaskGraphics, 0, 0);
  noLoop();
}

function separateGrid(x, y, d, g, gg) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 4) {
        separateGrid(i, j, w, g, gg);
      } else {
        if (random(100) > 50) {
          drawFlaskTriangle(i, j, w, w, g);
        } else {
          drawFlask(i, j, w, w, g);

        }
        drawWater(i, j, w, w, gg);
      }
    }
  }
}

function drawFlask(x, y, w, h, g) {
  let d = min(w, h) * 0.45;
  let rotate_num = random(30) * (random(100) > 50 ? -1 : 1);
  g.push();
  g.translate(x + w / 2, y + h / 2);
  g.rotate(rotate_num);
  g.noStroke();
  g.rectMode(CENTER);
  g.drawingContext.shadowColor = color(0, 0, 0, 15);
  g.drawingContext.shadowBlur = h / 4;
  g.rect(0, 0, w * 0.13, h * 0.7);
  g.rect(0, -h * 0.35, w * 0.18, h * 0.035, w);
  g.push();
  g.translate(0, h * 0.2);
  g.circle(0, 0, d);
  g.pop();
  g.pop();

  g.erase(255, 0);
  g.push();
  g.translate(x + w / 2, y + h / 2);
  g.rotate(rotate_num);
  g.rectMode(CENTER);
  g.rect(0, 0, w * 0.13, h * 0.7);
  g.rect(0, -h * 0.35, w * 0.18, h * 0.035, w);
  g.push();
  g.translate(0, h * 0.2);
  g.circle(0, 0, d);
  g.pop();
  g.pop();
  g.noErase();
}

function drawWater(x, y, w, h, g) {
  g.push();
  g.translate(x, y);
  let col = random(pallete);
  g.fill(col);
  g.noStroke();
  g.drawingContext.shadowColor = color(col);
  g.drawingContext.shadowBlur = h / 4;
  g.drawingContext.shadowOffetY = -h / 2;
  let hh = random(h * 2 / 5, h * 4 / 5);
  let hh2 = random(h * 2 / 5, h * 4 / 5);
  g.quad(0, hh, w, hh2, w, h, 0, h);

  g.blendMode(ADD);
  g.fill(0, 0, 100, 25);
  for (let i = 0; i < 25; i++) {
    let xx = random(w);
    let yy = random(min(hh, hh2), h);
    g.circle(xx, yy, min(w, h) / random(10, 50));
  }
  g.blendMode(BLEND);
  g.pop();


}

function drawFlaskTriangle(x, y, w, h, g) {
  let d = min(w, h) * 0.45;
  let rotate_num = random(30) * (random(100) > 50 ? -1 : 1);
  g.push();
  g.noStroke();
  g.fill(0, 0, 80);
  g.translate(x + w / 2, y + h / 2);
  g.rotate(rotate_num);
  g.rectMode(CENTER);
  g.drawingContext.shadowColor = color(0, 0, 0, 15);
  g.drawingContext.shadowBlur = h / 4;
  g.rect(0, 0, w * 0.13, h * 0.7);
  g.rect(0, -h * 0.35, w * 0.18, h * 0.035, w);
  g.translate(0, h * 0.2);
  g.rotate(-90);
  g.beginShape();
  for (let i = 0; i < 2; i++) {
    for (let angle = 0; angle < 360; angle += 360 / 3) {
      let dd = d * 0.6;
      if (angle == 0) dd = d * 0.5;
      g.curveVertex(cos(angle) * dd, sin(angle) * dd);
    }
  }
  g.endShape();
  g.pop();

  g.erase(255, 0);
  g.push();
  g.translate(x + w / 2, y + h / 2);
  g.rotate(rotate_num);
  g.rectMode(CENTER);
  g.rect(0, 0, w * 0.13, h * 0.7);
  g.rect(0, -h * 0.35, w * 0.18, h * 0.035, w);
  g.push();
  g.translate(0, h * 0.2);
  g.rotate(-90);
  g.beginShape();
  for (let i = 0; i < 2; i++) {
    for (let angle = 0; angle < 360; angle += 360 / 3) {
      let dd = d * 0.6;
      if (angle == 0) dd = d * 0.5;
      g.curveVertex(cos(angle) * dd, sin(angle) * dd);
    }
  }
  g.endShape();
  g.pop();
  g.pop();
  g.noErase();
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