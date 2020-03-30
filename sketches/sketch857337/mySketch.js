let graphics;
let pallete = ["#0A0311", "#3E1C4B", "#13065C", "#0B089A", "#A922B0", "#D54705", "#76A6A9", "#2A34AF"];
// let pallete;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noStroke();
  // pallete = createPallete(url);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  let w = sqrt(sq(width) + sq(height));
  for (let i = 0; i < width * height * 15 / 100; i++) {
    graphics.stroke(0, 0, 100, 10);
    let angle = random() * 360;
    let r = (sqrt(1 - random(random()))) * w / 2;
    let px = width / 2 + cos(angle) * r;
    let py = height / 2 + sin(angle) * r;
    graphics.point(px, py);
  }
}

function draw() {
  background(220);
  randomSeed(100);
  push();
  translate(width / 2, height / 2);
  let w = sqrt(width * width + height * height);
  rotate(45);
  recursiveRect(-w / 2, -w / 2, w, w, 5);
  pop();
  image(graphics, 0, 0);
  noLoop();
}

function recursiveRect(x, y, w, h, depth) {
  if (depth < 0) return;
  //rect(x, y, w, h);

  let rsx = random(1000);
  let rsy = random(1000);

  let nw = noise(x / 1000 + rsx, frameCount / 50) * w;
  let nh = noise(y / 1000 + rsy, frameCount / 50) * h;
  let c = pallete.concat();
  shuffle(c, true);
  drawGradientRect(x, y, nw, nh, color(c[0]), color(c[1]));
  drawGradientRect(x + nw, y, w - nw, nh, color(c[1]), color(c[2]));
  drawGradientRect(x, y + nh, nw, h - nh, color(c[2]), color(c[3]));
  drawGradientRect(x + nw, y + nh, w - nw, h - nh, color(c[3]), color(c[4]));
  recursiveRect(x, y, nw, nh, depth - 1);
  recursiveRect(x + nw, y, w - nw, nh, depth - 1);
  recursiveRect(x, y + nh, nw, h - nh, depth - 1);
  recursiveRect(x + nw, y + nh, w - nw, h - nh, depth - 1);
}

function checkRects(x, y, w, h) {
  let sep = int(random(2, 4));
  push();
  translate(x, y);
  let n = int(random(2));
  if (sep == 2) n = 1;
  for (let j = 0; j < sep; j++) {
    for (let i = 0; i < sep; i++) {
      let xx = i * w / sep;
      let yy = j * h / sep;
      if (sep == 3) {
        if (n % 2 == 0) {
          fill(0, 0, 10);
        } else {
          fill(0, 0, 100);
        }
      } else {
        switch (n) {
          case 1:
          case 4:
            fill(0, 0, 100);
            break;
          case 2:
          case 3:
            fill(0, 0, 10);
            break;
        }
      }
      rect(xx, yy, w / sep, h / sep);
      n++;
    }
  }
  pop();
}

function drawGradientRect(x, y, w, h, c1, c2, mode = CORNER) {
  let cx = x + w / 2;
  let cy = y + h / 2;
  let rotate_num = int(random(4));
  push();
  translate(cx, cy);
  rotate(rotate_num * 360 / 4);
  if (rotate_num % 2 == 1) {
    let temp = w;
    w = h;
    h = temp;
  }
  translate(-w / 2, -h / 2);
  rect(0, 0, w, h);
  for (let xx = 0; xx < w; xx++) {
    colorMode(RGB, 255, 255, 255);
    let c = lerpColor(c1, c2, xx / w);
    colorMode(HSB, 360, 100, 100, 100);
    stroke(c);
    line(xx, 0, xx, h);
  }
  pop();
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