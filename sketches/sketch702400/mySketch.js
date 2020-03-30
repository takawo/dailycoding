let cells;
let cols, rows;
let offset, margin;
//cooloｒｓのURL
let url = "https://coolors.co/app/96adbc-2f4756-006382-ffe2da-fff262";
//カラーパレットの配列
let pallete;

let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  smooth();
  init();
}

function init() {
  
  graphics = createGraphics(width,height);
  graphics.colorMode(HSB,360,100,100,100);
  drawNoiseBackground(100000,graphics);
  
  cells = int(random(3, 7));
  cols = cells;
  rows = cells;
  offset = (width / cols) / int(random(3, 8));
  margin = offset / int(random(2, 4));
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
  //カラーパレットを生成
  pallete = createPallete(url);
}

function createPallete(_url) {
  //後ろから/の位置を数える．
  let slash_index = _url.lastIndexOf('/');
  //'/'以降の文字列を取得
  let pallate_str = _url.slice(slash_index + 1);
  //文字列を'-'で区切って配列に入れる
  let arr = pallate_str.split('-');
  //各要素の先頭に'#'を追加
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  //配列を返す
  return arr;
}


function draw() {
  background(0, 0, 20);
  let pnum_fill = -1;
  let pnum_stroke = -1;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);

      let num_fill = pnum_fill;
      while (pnum_fill == num_fill) {
        num_fill = int(random(pallete.length));
      }
      let num_stroke = pnum_stroke;
      while (pnum_stroke == num_stroke||num_stroke == num_fill) {
        num_stroke = int(random(pallete.length));
      }

      fill(pallete[num_fill]);
      strokeWeight(3);
      stroke(pallete[num_stroke]);
      rect(x, y, w, h);
      
      noFill();
      stroke(pallete[num_stroke]);
      strokeWeight(1.5);
      drawCheckerPattern(x, y, w, h);
      
      pnum_fill = num_fill;
      pnum_stroke = num_stroke;
    }
  }
  
  image(graphics,0,0);  
  noLoop();
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

function drawCheckerPattern(_x, _y, _w, _h) {
  let sepW = int(random(5, 10));
  let sepH = int(random(3, 15));
  push();
  translate(_x + _w / 2, _y + _h / 2);
  rotate(int(random(4)) * 90);
  translate(-_w / 2, -_h / 2);

  let stepH = int(random(1, 10)) / 10;
  let stepV = int(random(1, 10)) / 10;

  for (let y0 = -_h * 2; y0 < _h; y0 += _h / sepH) {
    let y = y0;
    let x = 0;
    let px = constrain(x, 0, w);
    let py = constrain(y, 0, h);
    while (x < _w) {
      let dx, dy;
      x += _w / sepW / 1;
      dx = constrain(x, 0, w);
      dy = constrain(y, 0, h);
      for (let i = 0; i < 1; i += stepH * 2) {
        let x1 = constrain(lerp(dx, px, i), 0, _w);
        let y1 = constrain(lerp(dy, py, i), 0, _h);
        let x2 = constrain(lerp(dx, px, i + stepH), 0, _w);
        let y2 = constrain(lerp(dy, py, i + stepH), 0, _h);
        line(x1, y1, x2, y2);
      }

      px = dx;
      py = dy;
      y += _h / sepH / 2;
      dx = constrain(x, 0, w);
      dy = constrain(y, 0, h);
      for (let i = 0; i < 1; i += stepV * 2) {
        let x1 = constrain(lerp(dx, px, i), 0, _w);
        let y1 = constrain(lerp(dy, py, i), 0, _h);
        let x2 = constrain(lerp(dx, px, i + stepH), 0, _w);
        let y2 = constrain(lerp(dy, py, i + stepH), 0, _h);
        line(x1, y1, x2, y2);
      }
      px = dx;
      py = dy;
    }
  }
  pop();
}