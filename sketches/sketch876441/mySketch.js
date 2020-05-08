// reference: @akane45_gun 's awesome sketch
// https://twitter.com/akane45_gun/status/1251393964864749568

let eyelid, eyeball, eyehyperemia;
let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  eyelid = createGraphics(width, height);
  eyelid.colorMode(HSB, 360, 100, 100, 100);
  eyelid.angleMode(DEGREES);

  eyelid.background(0, 0, 20);

  eyeball = createGraphics(width, height);
  eyeball.colorMode(HSB, 360, 100, 100, 100);
  eyeball.angleMode(DEGREES);

  eyeball = createGraphics(width, height);
  eyeball.colorMode(HSB, 360, 100, 100, 100);
  eyeball.angleMode(DEGREES);

  eyehyperemia = createGraphics(width, height);
  eyehyperemia.colorMode(HSB, 360, 100, 100, 100);
  eyehyperemia.angleMode(DEGREES);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);
  texture.stroke(0, 0, 100, 5);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    texture.strokeWeight(random(2));
    texture.point(random(width), random(height));
  }

}

function draw() {
	background(0,0,100);
  separateGrid(0, 0, width, eyelid, eyeball, eyehyperemia);
  image(eyehyperemia, 0, 0);
  image(eyeball, 0, 0);
  drawingContext.shadowColor = color(0, 0, 0, 50);
  drawingContext.shadowBlur = 50;
  image(eyelid, 0, 0);
  image(texture, 0, 0);
  noLoop();
}

function drawEyeLid(g, x, y, w, h) {
  g.push();
  g.erase(255, 0);
  g.translate(x, y);
  g.beginShape();
  g.vertex(-w / 2, 0);
  g.bezierVertex(-w / 2, 0, -w / 4, -h / 2, 0, -h / 2);
  g.bezierVertex(w / 4, -h / 2, w / 2, 0, w / 2, 0);
  g.bezierVertex(w / 2, 0, w / 4, h / 2, 0, h / 2);
  g.bezierVertex(-w / 4, h / 2, -w / 2, 0, -w / 2, 0);
  g.endShape(CLOSE);
  g.noErase();
  g.pop();
}

function drawEyeBall(g, x, y, w) {
  let tx = random(-w / 4, w / 4);
  let ty = random(-w / 4, w / 4);
  g.drawingContext.shadowColor = color(0, 0, 0);
  g.drawingContext.shadowBlur = 20;

  g.push();
  g.translate(x + tx, y + ty);
  g.noStroke();
  g.fill(0, 0, 40);
  g.circle(0, 0, w);
  g.fill(0, 0, 20);
  g.circle(0, 0, w * 0.6);
  g.fill(0, 0, 80);
  g.circle(w * 0.2, -w * 0.2, w * 0.25);
  g.pop();
}


function separateGrid(x, y, d, g, gg, ggg) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 3) {
        separateGrid(i, j, w, g, gg, ggg);
      } else {
        let dd = w * 0.9;
        drawEyeLid(g, i + w / 2, j + w / 2, dd, random(dd/ 4,dd*2/3));
        drawEyeBall(gg, i + w / 2, j + w / 2, w / 2);
        let l = w / 4;
        let depth = 3;
        ggg.push();
        ggg.translate(i + w / 2, j + w / 2);
        hyperemia(ggg, depth, l);
        ggg.pop();
      }
    }
  }
}

function hyperemia(g, depth, l) {
  let len = 125;
  let depthMax = 4;
  g.drawingContext.shadowColor = color(0, 100, 100);
  g.drawingContext.shadowBlur = l / 2;

  if (depth > 0) {
    let n = int(random(3, 10));
    for (let angle = 0; angle < 360; angle += 360 / n) {
      g.push();
      g.rotate(angle);
      g.stroke(0, 100, 100, 50);
      g.noFill();
      let sw = map(l, 0, len, 0, depthMax);
      g.strokeWeight(sw);
      if (random(100) > 50) {
        g.bezier(0, 0, l / 2, l / 2, l / 2, -l / 2, l, 0);
      } else {
        g.bezier(0, 0, l / 2, -l / 2, l / 2, l / 2, l, 0);
      }
      g.translate(l, 0);
      g.rotate(random(360));
      hyperemia(g, depth - 1, l * random(0.2, 0.7));
      g.pop();
    }
  }
}