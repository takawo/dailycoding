let url = "https://coolors.co/114b5f-028090-e4fde1-456990-f45b69";
let palette = createPalette(url);
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);
  graphics.blendMode(ADD);
}

function draw() {
  blendMode(BLEND);
  background(0, 0, 10);
  // blendMode(ADD);
  separateGrid(0, 0, width, graphics);
  drawingContext.shadowColor = color(0, 0, 100, 50);
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 20;
  image(graphics, 0, 0);
  noLoop();
}

function separateGrid(x, y, d, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w, g);
      } else {
        let angle = random(360);
        let sep = 10;
        for (let ww = w; ww > 0; ww -= w / sep) {
          let rate_a = 0.9;
          let rate_b = rate_a * 0.9;
          let step = rate_a - rate_b;
          let f = ww * rate_a;
          let e = ww * rate_b;
          g.push();
          g.translate(i + w / 2, j + w / 2);
          g.rotate(angle + random(360));
          g.noStroke();
          g.fill(random(palette));
          g.ellipse(0, 0, f, f);
          g.push();
          g.erase(255, 0);
          g.ellipse(w * step / 2, w * step / 2, e, e);
          g.noErase();
          g.pop();
          g.pop();
        }
      }
    }
  }
}

function createPalette(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}