let pallete = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#02020C"];
let graphics;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100,100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 15 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    random(100) > 50 ? graphics.fill(0, 0, 100, 5) : graphics.fill(0, 0, 0, 5);
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  background(0, 0, 95);
  let offset = width / 20;
  //let m = map(sin(frameCount),-1,1,15,100);
  noFill();
  divideRect(offset, offset, width - offset * 2, height - offset * 2, 100);
  image(graphics, 0, 0);
  //noLoop();
}

function divideRect(x, y, w, h, m) {
  let p = 0.1;
  let n = map(noise((width + x + w / 2) / 500, (height + y + h / 2) / 500, frameCount / 100), 0, 1, p, 1 - p);
  if (w > m && h > m) {
    if (w >= h) {
      let nw = n * w;
      divideRect(x, y, nw, h, m);
      divideRect(x + nw, y, w - nw, h, m);
    }
    if (w < h) {
      let nh = n * h;
      divideRect(x, y, w, nh, m);
      divideRect(x, y + nh, w, h - nh, m);
    }
  } else {
    //noStroke();
    // circle(x + w / 2, y + h / 2, min(w, h));
    drawWave(x, y, w, h);
  }
}

function drawWave(x, y, w, h) {
  randomSeed((x + y) / 10);

  let cx = x + w / 2;
  let cy = y + h / 2;
  push();
  translate(cx, cy);
  let rotate_num = int(random(4)) * 360 / 4;
  //rotate(rotate_num);
  let ww, hh;
  if (h > w) {
    rotate(90);
    ww = h * 0.9;
    hh = w * 0.9;
  } else {
    ww = w * 0.9;
    hh = h * 0.9;
  }

  push();
  translate(-ww / 2, 0);
  lineArc(0, 0, ww, 0, int(random(4, 9)));

  // beginShape();
  // let freq = int((width + height + x + y + w + h) / 200) % 3 + 1;
  // for (let xx = 0; xx < ww; xx += 1) {
  //   let angle = map(xx, 0, ww, 0, 180*5/3);
  //   let yy = sin(angle) * hh / 3;
  //   vertex(xx, yy);
  // }
  // endShape();
  pop();
  pop();
}

function lineArc(x1, y1, x2, y2, step) {
  let d = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x1, y1);
  rotate(angle);
  let n = 0;
  let isFill = random(100) > 50 ? true : false;

  for (let i = 0; i < step; i++) {
    cx = d / step / 2 + i * d / step;
    let dd = d / step;
    if (isFill) {
      fill(random(pallete));
      noStroke();
    } else {
      stroke(random(pallete));
      strokeWeight(dd / 5);
      strokeCap(SQUARE);
      noFill();
    }
    if (n % 2 == 0) {
      arc(cx, 0, dd, dd, 0, 180);
    } else {
      arc(cx, 0, dd, dd, 0 + 180, 180 + 180);
    }

    n++;
  }
  pop();
}