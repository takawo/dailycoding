let ddd;
let pallete = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];
let graphics;
let colors;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  // blendMode(MULTIPLY);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 15 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    random(100) > 50 ? graphics.fill(0, 0, 90, 5) : graphics.fill(0, 0, 20, 5);
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  colors = pallete.concat();
  let bgNum = int(random(colors.length));
  let bg = colors[bgNum];
  colors.splice(bgNum, 1);
  background(bg);
  let offset = width / 15;
  let margin = offset / 10;
  let num = int(random(1, 5)) * 4;
  ddd = (width - offset * 2 - margin * (num - 1)) / num;
  for (let i = 0; i < num; i++) {
    let y = offset + i * (ddd + margin) + ddd / 2;
    // fill(220);
    // noStroke();
    // rect(offset, y - ddd / 2, width - offset * 2, ddd, 3);
    lineRect(offset, y, width - offset, y, ddd / 2);
    lineRect(offset, y, width - offset, y, ddd / 2);
    //lineArc(100, 100, 800 - 100, 800 - 100, 6);
  }
  image(graphics,0,0);
  // noLoop();
  frameRate(0.5);
}

function lineRect(x1, y1, x2, y2, minD) {

  let d = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x1, y1);
  rotate(angle);
  let n = 0;
  let dd = 0;

  while (dd < d) {
    let ddPlus = d / int(random(random(random())) * 10000);
    if (dd + ddPlus > d) ddPlus = d - dd;
    let ax = dd + ddPlus / 2;
    let isFill = random(100) > 50 ? true : false;
    if (isFill) {
      fill(random(colors) + "99");
      noStroke();
    } else {
      stroke(random(colors) + "99");
      strokeWeight(1);
      strokeCap(SQUARE);
      noFill();
    }
    if (n % 2 == 0) {
      //arc(cx, 0, d1, d1, 0, 180);
      beginShape();
      vertex(ax - ddPlus / 2, 0);
      vertex(ax - ddPlus / 2, min(minD, ddPlus / 2));
      // vertex(ax + ddPlus / 2, min(ddd/8,ddPlus / 2));
      vertex(ax + ddPlus / 2, 0);
      endShape();
    } else {
      beginShape();
      vertex(ax - ddPlus / 2, 0);
      // vertex(ax - ddPlus / 2, -min(d/4,ddPlus / 2));
      vertex(ax + ddPlus / 2, -min(minD, ddPlus / 2));
      vertex(ax + ddPlus / 2, 0);
      endShape();
    }

    n++;
    dd += ddPlus;
  }
  pop();
}