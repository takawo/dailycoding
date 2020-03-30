let url = "https://coolors.co/app/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d";
let pallete;
let graphics;
let bc;
let cells, cols, rows;
let margin, offset;
let cellW, cellH;
let mic;
let scaleRatio = 20;
let volStep = 0;
let base;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
  mic = new p5.AudioIn();
  mic.start();
}

function init() {
  cells = int(random(3, 10));
  cols = cells;
  rows = cells;
  offset = width / (20 * int(random(1, 4)));
  margin = offset / int(random(2, 8));
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  pallete = createPallete(url);
  base = createGraphics(width, height);
  base.colorMode(HSB, 360, 100, 100, 100);
  base.angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  let n = int(random(pallete.length));
  bc = pallete[n];
  pallete.splice(n, 1);
}

function draw() {
  background(bc);
  //background(bc + "05");

  let vol = mic.getLevel();
  let level = map(vol, 0, 1, height, 0);
  if (vol > 0.03) {
    volStep++;
  }
  //ellipse(width / 2, h - 25, 50, 50);
  randomSeed(100);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let n = int(random(pallete.length));
      let freq = int(random(50)) / 100;
      let step = n + volStep * freq;
      let current = int(step) % pallete.length;
      let next = int(step + 1) % pallete.length;
      let fl = step % 1;

      let c1 = color(pallete[current]);
      let c2 = color(pallete[next]);

      colorMode(HSB);
      let c = lerpColor(c1, c2, fl);

      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      let w = constrain(cellW * vol * scaleRatio,0,cellW*2);
      let h = constrain(cellH * vol * scaleRatio,0,cellH*2);
      base.push();
      base.translate(x + cellW / 2, y + cellH / 2);
      base.rotate(int(random(4)) * 90);
      base.rectMode(CENTER);
      base.fill(c);
      base.noStroke();
      base.arc(-cellW/2, -cellH/2, w, h,0,90);
      base.pop();
    }
  }
  image(base,0,0);
  image(graphics,0,0);
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
  let c = color(0, 0, 100, 10);
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