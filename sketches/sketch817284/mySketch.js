let shapeGraphics;
let patternGraphics;
let textureGraphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  shapeGraphics = createGraphics(width, height);
  shapeGraphics.angleMode(DEGREES);
  patternGraphics = createGraphics(width, height);

  textureGraphics = createGraphics(width, height);
  textureGraphics.colorMode(HSB, 360, 100, 100, 100);
  textureGraphics.noStroke();
  textureGraphics.fill(0, 0, 0, 8);

  for (let i = 0; i < textureGraphics.width * textureGraphics.height * 5 / 100; i++) {
    textureGraphics.ellipse(
      random(textureGraphics.width),
      random(textureGraphics.height),
      random(3),
      random(3)
    );
  }
}

function draw() {
  background(0, 0, 95);
  let offset = width / 20;
  separateGrid(-offset, -offset, width + offset * 2);
  image(shapeGraphics, 0, 0);

  let img = pgMask(patternGraphics, shapeGraphics);
  image(img, 0, 0);
  frameRate(1);
  image(textureGraphics, 0, 0);
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 5));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 8) {
        separateGrid(i, j, w);
      } else {
        let n = int(random(2, 29));
        while (n == int(w)) {
          n = int(random(2, 29));
        }
        drawPattern(i, j, w, w, n, patternGraphics);
        drawBezierShape(i, j, w, shapeGraphics);
      }
    }
  }
}

function drawBezierShape(x, y, rr, g) {
  g.push();
  g.translate(x + rr / 2, y + rr / 2);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.angleMode(DEGREES);
  g.fill(0, 0, 100);

  let angleStep = 360 / int(random(5, 8));
  let noiseScale = int(random(1, 8)) * 50;
  let sep = 1; //random(4, 18);
  g.fill(0, 0, 100);
  g.stroke(0, 0, 0);
  g.strokeWeight(0.5);

  for (let r = rr / 2; r > 0; r -= rr / 2 / sep) {
    g.beginShape();
		g.rotate(random(360));
    for (let angle = 0; angle < 360; angle += angleStep) {
      let r1 = map(noise(angle / noiseScale), 0, 1, r / 2, r);
      let x1 = cos(angle) * r1;
      let y1 = sin(angle) * r1;
      vertex(x1, y1);
      let pRatio = random(2, 4);
      let px1 = x1 + cos(angle + 90) * r1 / pRatio;
      let py1 = y1 + sin(angle + 90) * r1 / pRatio;
      let angle2 = angle + angleStep;
      let r2 = map(noise(angle2 % 360 / noiseScale), 0, 1, r / 2, r);
      let x2 = cos(angle2) * r2;
      let y2 = sin(angle2) * r2;
      pRatio = random(2, 4);
      let px2 = x2 + cos(angle2 - 90) * r2 / pRatio;
      let py2 = y2 + sin(angle2 - 90) * r2 / pRatio;
      g.bezierVertex(px1, py1, px2, py2, x2, y2);
    }
    g.endShape();
  }

  g.pop();

}

function drawPattern(_x, _y, _w, _h, _n, g) {
  for (let j = _y; j <= _y + _h; j++) {
    for (let i = _x; i <= _x + _w; i++) {
      let m = int(j * _w + i);
      if (m % _n == 0) {
        g.point(i, j);
      }
    }
  }
}

function pgMask(_content, _mask) {
  let img = createImage(int(_mask.width), int(_mask.height));
  img.copy(_mask, 0, 0, int(_mask.width), int(_mask.height), 0, 0, int(_mask.width), int(_mask.height));
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i + 1] = 0;
    img.pixels[i + 2] = 0;
    img.pixels[i + 3] = v;
  }
  img.updatePixels();
  let contentImg = createImage(int(_content.width), int(_content.height));
  contentImg.copy(_content, 0, 0, int(_content.width), int(_content.height), 0, 0, int(_content.width), int(_content.height));
  contentImg.mask(img)
  return contentImg;
}