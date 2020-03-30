let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete =["#FEFEFE","#0C041E","#C21215","#E65D08","#AFADB9","#4F2B3F","#E99416","#586DC0"];
let bg;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function init() {
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  
  cells = int(random(2, 15));
  cols = cells;
  rows = cells;
  offset = width / 20;
  margin = offset / 20;

  let w = sqrt(sq(width / 2) + sq(height / 2));
  cellW = (w * 2 - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w * 2 - offset * 2 - margin * (rows - 1)) / rows;

  let bgNum = int(random(pallete.length));
  bg = pallete[bgNum];
  background(bg+"66");
  pallete.splice(bgNum,1);

  push();
  translate(width / 2, height / 2);
  rotate(45);
  rectMode(CENTER);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -w - offset + cellW / 2, w + offset - cellW / 2);
      let y = map(j, 0, rows - 1, -w - offset + cellW / 2, w + offset - cellW / 2);
      let n = int(random(3, pallete.length));
      let p = pallete.concat();
      let cNum = int(random(pallete.length));
      let c = p[cNum];
      p.splice(cNum, 1);
      fill(c);
      noStroke();
      rect(x, y, cellW, cellH);
      wavesInRect(x, y, cellW, cellH, n, p);
    }
  }
  pop();
  image(graphics,0,0);
}

function wavesInRect(_x, _y, _w, _h, _num, _p) {
for(var i = _p.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = _p[i];
    _p[i] = _p[r];
    _p[r] = tmp;
}
  push();
  translate(_x, _y);
  rotate(int(random(4)) * 360 / 4);
  let offsetH = _h / 10;
  for (let i = 0; i < _num; i++) {
    let amp = random(_h / _num / 4,_h/_num);
    let freq = random(0.1, 3);
    let y0 = map(i, 0, _num - 1, -_h / 2 - offsetH, _h / 2 + offsetH);
    noStroke();
    fill(_p[i]);
    beginShape();
    for (let x = -_w / 2; x <= _w / 2; x += 1) {
      let y = constrain(y0 + sin(x * freq) * amp, -_h / 2, _h / 2);
      vertex(x, y);
    }
    vertex(_w / 2, _h / 2);
    vertex(-_w / 2, _h / 2);
    endShape(CLOSE);
  }
  pop();
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