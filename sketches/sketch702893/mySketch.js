let url = "https://coolors.co/app/7bdff2-b2f7ef-eff7f6-f7d6e0-f2b5d4";
let pallete;

let cells, cols, rows;
let offset, margin;
let w, h;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
  noLoop();
}

function init() {
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  pallete = createPallete(url);
  let bn = int(random(pallete.length));
  let bc = pallete[bn]
  pallete.splice(bn, 1);
  background(bc);
  cells = int(random(3, 8));
  cols = cells;
  rows = cells;
  offset = width / cols / int(random(2, 6));
  margin = offset / int(random(2, 6));
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
  let psc = -1;
  let pfc = -1;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let n = map(1 - random(random(random())), 0, 1, 15, 3);
      let sc = psc;
      while (sc == psc) {
        let csn = int(random(pallete.length));
        sc = pallete[csn];
      }

      let fc = pfc;
      while (fc == pfc || fc == sc) {
        let cfn = int(random(pallete.length));
        fc = pallete[cfn];
      }

      let rn = random(100);

      if (rn < 100 / 3) {
        fill(fc);
        noStroke();
        ellipse(x + w / 2, y + h / 2, (w + h) / 2);
      } else if (rn > 100 / 3 && rn < 100 * 2 / 3) {
        drawEllipseWithLine(x + w / 2, y + h / 2, (w + h) / 2, n, sc);
      } else {
        fill(fc);
        noStroke();
        ellipse(x + w / 2, y + h / 2, (w + h) / 2);
        drawEllipseWithLine(x + w / 2, y + h / 2, (w + h) / 2, n, sc);

      }
      psc = sc;
      pfc = fc;
    }
  }
  image(graphics, 0, 0);
}


function drawEllipseWithLine(_cx, _cy, _d, _sep, _c) {
  let r = _d / 2 * 0.95;
  push();
  translate(_cx, _cy);
  rotate(45 + 90 * int(random(4)));
  let ox = -r + r / _sep / 4;
  for (let x = ox; x < r; x += r / _sep) {
    let y = sqrt(sq(r) - sq(x));
    stroke(_c);
    strokeWeight(r / _sep / 5);
    noFill();
    line(x, y, x, -y);
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


function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 7);

  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}