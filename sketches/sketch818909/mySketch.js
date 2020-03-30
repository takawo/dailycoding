// noprotect
let cells;
let cellW;
let offset;
let margin;
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallete;
let graphics;
let dots = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  pallete = createPallete(url);

  offset = width / 10;
  margin = 0;
  offset / 10;

  cells = int(random(5, 10));
  cellW = int((width - offset * 2 - margin * (cells - 1)) / cells);


  let percent = 10 / 100;
  graphics = createGraphics(width, height);
  graphics.stroke(255, 10 / 100 * 255);

  for (i = 0; i < graphics.width * graphics.height * percent; i++) {
    graphics.point(random(graphics.width),
      random(graphics.height));
  }

  for (let i = 2; i < 10; i++) {
    let colors = pallete.concat();

    let c1 = random(colors);
    let c2 = random(colors);
    while (c1 == c2) {
      c2 = random(colors);
    }
    let g = createDotGraphics(cellW, cellW, i, c1, c2);
    dots.push(g);
  }
}

function draw() {
  background(0, 0, 20);

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = int(offset + i * (cellW + margin));
      let y = int(offset + j * (cellW + margin));
      let sep = int(random(1, 5));
      for (let n = 0; n < sep; n++) {
        let g = random(dots);
        let gg = createWaveGraphics(x, y, cellW, cellW, n);
        push();
        translate(x, y);
        image(pgMask(g, gg), 0, 0);
        pop();

      }
    }
  }
  image(graphics, 0, 0);
  noLoop();
}

function createWaveGraphics(xx, yy, w, h, m) {
  let _g = createGraphics(w, h);
  _g.beginShape();
  _g.noStroke();
  for (let x = 0; x < _g.width; x++) {
    let y0 = map(m, 0, 5, _g.height / 4, _g.height);
    let y = y0 + map(noise((yy + y0) / 100, (xx + x) / 50, frameCount / 100), 0, 1, -0.5, 0.5) * _g.height;
    _g.vertex(x, y);
  }
  _g.vertex(_g.width, _g.height);
  _g.vertex(0, _g.height);
  _g.endShape(CLOSE);
  return _g;
}

function createDotGraphics(w, h, m, c1, c2) {
  let _g = createGraphics(w, h);
  _g.fill(c1);
  _g.rect(-2, -2, _g.width + 4, _g.height + 4);
  _g.stroke(c2);
  _g.strokeWeight(m / 4);
  for (let j = 0; j < _g.width; j++) {
    for (let i = 0; i < _g.width; i++) {
      let n = j * _g.width + i;
      if (int(n) % m == 0) {
        _g.point(i, j);
      }
    }
  }
  return _g;
}

function pgMask(_content, _mask) {
  var img = createImage(int(_mask.width), int(_mask.height));
  img.copy(_mask, 0, 0, int(_mask.width), int(_mask.height), 0, 0, int(_mask.width), int(_mask.height));
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i + 1] = 0;
    img.pixels[i + 2] = 0;
    img.pixels[i + 3] = v;
  }
  img.updatePixels();
  var contentImg = createImage(int(_content.width), int(_content.height));
  contentImg.copy(_content, 0, 0, int(_content.width), int(_content.height), 0, 0, int(_content.width), int(_content.height));
  contentImg.mask(img)
  return contentImg;
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