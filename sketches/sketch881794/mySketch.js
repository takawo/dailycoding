//reference: https://www.tostv.jp/news/6082.html?fbclid=IwAR1Wtwss-bpQB006izG8Gl1zgqlu6RUsbmXex_6beQEiSkSMiwTlAqSIjsw

let graphics, graphics2;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

}

function draw() {
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);
  graphics.background(0, 0, 100);
  graphics.stroke(0, 0, 0, 3);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    graphics.strokeWeight(random(3));
    graphics.point(random(width), random(height));
  }
  
  graphics2 = createGraphics(width, height);
  graphics2.colorMode(HSB, 360, 100, 100, 100);
  graphics2.angleMode(DEGREES);
  graphics2.background(240, 80, 80);
  graphics2.stroke(0, 0, 100, 3);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    graphics2.strokeWeight(random(5));
    graphics2.point(random(width), random(height));
  }
  
  let offset = width / 10;
  separateGrid(-offset, -offset, width + offset * 2, graphics2, graphics)
  image(graphics, 0, 0);
  image(graphics2, 0, 0);
  // noLoop();
  frameRate(0.5);
  // save();
}

function drawMask(x, y, w, h, angle, g, gg) {
  g.push();
  g.translate(x, y);
  g.rotate(angle);
  g.rectMode(CENTER);
  let sw = w / 20;
  g.erase(255, 0);
  g.rect(0, 0, w, h);
  g.noErase();
  g.push();
  g.translate(-w / 2, 0);
  g.erase(0, 255);
  g.strokeWeight(sw);
  let angleA = random(30, 10) * (random(100) > 50 ? -1 : 1);
  let x1 = 0 + cos(180 + angleA) * w / 2;
  let y1 = -h / 2 + sw / 2 + sin(180 + angleA) * w / 2;
  let x2 = 0 + cos(180 - angleA) * w / 2;
  let y2 = h / 2 - sw / 2 + sin(180 - angleA) * w / 2;
  g.bezier(0, -h / 2 + sw / 2,
    x1, y1,
    x2, y2,
    0, h / 2 - sw / 2);
  g.noErase();
  g.pop();
  g.push();
  g.translate(w / 2, 0);
  g.erase(0, 255);
  g.strokeWeight(sw);
  let angleB = -angleA;
  let x3 = 0 + cos(angleB) * w / 2;
  let y3 = -h / 2 + sw / 2 + sin(angleB) * w / 2;
  let x4 = 0 + cos(-angleB) * w / 2;
  let y4 = h / 2 - sw / 2 + sin(-angleB) * w / 2;


  g.bezier(0, -h / 2 + sw / 2,
    x3, y3,
    x4, y4,
    0, h / 2 - sw / 2);
  g.noErase();
  g.pop();
  g.push();
  g.strokeWeight(w / 100);
  g.drawingContext.setLineDash([w / 40, w / 20]);
  g.noFill();
  g.stroke(0, 0, 80);
  g.rect(0, 0, w - w / 10, h - w / 10);
  g.pop();

  if (random(100) < 20) {
    let num = int(random(2));
    switch (num) {
      case 0:
        drawHair(x, y, w, h, angle, gg);
        break;
      case 1:
        drawSpot(x, y, w, h, angle, gg);
        break;
    }
  }
  g.pop();
}

function drawHair(x, y, w, h, angle, g) {
  g.push();
  g.translate(x, y);
  g.rotate(angle);
  let x1 = random(-w / 4, w / 4);
  let y1 = random(-w / 4, w / 4);
  let x4 = random(-w / 4, w / 4);
  let y4 = random(-w / 4, w / 4);
  let a1 = random(360);
  let a2 = random(360);
  let len1 = random(w / 4);
  let len2 = random(w / 4);
  let x2 = x1 + cos(a1) * len1;
  let y2 = y1 + sin(a1) * len1;
  let x3 = x1 + cos(a2) * len2;
  let y3 = y1 + sin(a2) * len2;
  g.stroke(0, 0, 40);
  g.strokeWeight(max(w / 60, 1));
  g.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  g.pop();
}

function drawSpot(x, y, w, h, angle, g) {
  g.push();
  g.translate(x, y);
  let a = random(360);
  let len = random(w / 2);
  let x1 = cos(a) * len;
  let y1 = sin(a) * len;
  g.rotate(angle);
  g.translate(x1, y1);
  g.drawingContext.shadowBlur = w / 2;
  let hue = random(360);
  let c1 = color(hue, 50, 30);
  let c2 = color(hue, 50, 30, 10);
  g.drawingContext.shadowColor = c1;
  g.fill(c2);
  g.ellipse(0, 0, random(w, w / 2), random(h / 2, h));
  g.pop();
}


function separateGrid(x, y, d, g, gg) {
  let sepNum = int(random(1, 4));
  let ww = d / sepNum;
  for (let i = x; i < x + d - 1; i += ww) {
    for (let j = y; j < y + d - 1; j += ww) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, ww, g, gg);
      } else {
        rect(i, j, ww, ww);
        let x = i + ww / 2;
        let y = j + ww / 2;
        let w = ww * 0.5;
        let h = w * 0.75;
        let angle = random(30) * (random(100) > 50 ? -1 : 1);
        drawMask(x, y, w, h, angle, g, gg);
      }
    }
  }
}