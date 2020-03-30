// let pallete = ["#F0F3BD", "#02C39A", "#028090", "#00A896", "#05668D"];
// let pallete = ["#071D10", "#E7A78E", "#FECA21", "#264E3B", "#071D10", "#D4A54C", "#DFD2D1", "#C15539"];
let pallete = ["#247BA0", "#70C1B3", "#B2DBBF", "#F3FFBD", "#FF1654"];

let bg;
let rs;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let bgNum = int(random(pallete.length));
  bg = pallete[bgNum];
  pallete.splice(bgNum, 1);
  rs = random(10000);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(15, graphics);
}

function draw() {
  background(bg);
  randomSeed(rs + frameCount / 100);

  let cells = int(random(2, 15));
  let offset = width / 10;
  let m = 0;
  offset / 5;
  let w = sqrt(sq(width) + sq(height));
  let cellSize = (w + offset * 2 - m * (cells - 1)) / cells;
  push();
  translate(width / 2, height / 2);
  rotate(int(random(8)) * 360 / 8);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -w / 2 - offset + i * (cellSize + m) + cellSize / 2;
      let y = -w / 2 - offset + j * (cellSize + m) + cellSize / 2;
      randomColor(pallete);
      randomShapes(x, y, cellSize);
    }
  }
  pop();

  image(graphics, 0, 0);


}

function randomColor(colors, transparent = 255) {
  fill(random(colors) + hex(transparent, 2));
  noStroke();
}


function randomShapes(x, y, d) {
  push();
  translate(x, y);
  let angle = int(random(4)) * 360 / 4;
  rotate(angle);
  let noiseScale = 100;
  let shape = int(noise(x / noiseScale, y / noiseScale, frameCount / noiseScale) * 21);
  //int((1-random(random()))*21);
  let dd = d / 2;
  let ddd = dd * int(random(1, 6)) / 5;
  switch (shape) {
    //connectability = 100%
    case 0:
      rectMode(CENTER);
      rect(0, 0, d, d);
      break;
    case 1:
      beginShape();
      vertex(-dd, -dd);
      vertex(dd, -dd);
      vertex(dd, dd);
      vertex(-dd, dd);
      beginContour();
      for (let angle = 360; angle > 0; angle--) {
        vertex(cos(angle) * ddd, sin(angle) * ddd);
      }
      endContour();
      endShape();
      break;
    case 2:
      beginShape();
      vertex(-dd, -dd);
      vertex(dd, -dd);
      vertex(dd, dd);
      vertex(-dd, dd);
      beginContour();
      let a = int(random(8)) * 360 / 8;
      for (let angle = 360 + a; angle > 0 + a; angle -= 90) {
        vertex(cos(angle) * ddd, sin(angle) * ddd);
      }
      endContour();
      endShape();
      break;
    case 3:
      arc(-dd, -dd, d, d, 0, 90);
      arc(dd, -dd, d, d, 90, 180);
      arc(dd, dd, d, d, 180, 270);
      arc(-dd, dd, d, d, 270, 360);
      break;
      //connectability = 75%
    case 4:
      arc(-dd, -dd, d * 2, d * 1.5, 0, 90);
      arc(-dd, dd, d * 2, d * 1.5, 270, 360);
      break;
    case 5:
      beginShape();
      vertex(-dd, -dd);
      vertex(dd, -dd);
      vertex(dd, dd);
      vertex(0, 0);
      vertex(-dd, dd);
      endShape();
      break;
    case 6:
      beginShape();
      vertex(-dd, -dd);
      vertex(dd, -dd);
      vertex(dd, dd);
      vertex(-dd, dd);
      for (let angle = 90; angle > -90; angle--) {
        vertex(-dd + cos(angle) * dd, 0 + sin(angle) * dd);
      }
      endShape();
      break;
    case 7:
      beginShape();
      vertex(-dd, -dd);
      vertex(dd, -dd);
      vertex(dd, dd);
      vertex(-dd, dd);
      for (let angle = 90; angle >= -90; angle--) {
        vertex(-dd + cos(angle) * ddd, 0 + sin(angle) * ddd);
      }
      endShape();
      break;
    case 8:
      beginShape();
      vertex(-dd, -dd);
      vertex(dd, -dd);
      vertex(dd, dd);
      vertex(-dd, dd);
      let e = (d - ddd) / 2
      vertex(-dd, dd - e);
      vertex(-dd + ddd, dd - e);
      vertex(-dd + ddd, dd - e - ddd);
      vertex(-dd, dd - e - ddd);
      endShape();
      break;
    case 9:
      triangle(-dd, -dd,
        dd, -dd,
        dd, 0);
      triangle(-dd, dd,
        dd, dd,
        dd, 0);
      break;
      //connectability = 50%
    case 10:
      triangle(-dd, -dd, dd, -dd, dd, dd);
      break;
    case 11:
      arc(-dd, -dd, d * 2, d * 2, 0, 90);
      break;
    case 12:
      triangle(-dd, -dd, dd, -dd, dd, 0);
      triangle(-dd, dd, dd, dd, -dd, 0);
      break;
    case 13:
      rect(-dd, -dd, d, ddd);
      rect(-dd, dd, d, -ddd);
      break;
    case 14:
      rect(-dd, -dd, d, ddd);
      rect(-dd, dd, ddd, -d);
      break;
    case 15:
      triangle(-dd, -dd, dd, -dd, 0, 0);
      triangle(-dd, dd, dd, dd, 0, 0);
      break;
      //connectability = 25%
    case 16:
      rect(-dd, -dd, d, ddd);
      break;
    case 17:
      triangle(-dd, -dd, dd, -dd, 0, 0);
      break;
    case 18:
      arc(-dd, -dd, d, d, 0, 90);
      arc(dd, -dd, d, d, 90, 180);
      break;
    case 19:
      triangle(-dd, -dd, 0, -dd, -dd, 0);
      triangle(dd, dd, 0, dd, dd, 0);
      break;
    case 20:
      arc(-dd, -dd, d, d, 0, 90);
      arc(dd, dd, d, d, 180, 270);
      break;
  }
  pop();
}


function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
  for (let i = 0; i < width * height * _n/100; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}