let data;
let graphics;

function preload() {
  let url = 'https://gist.githubusercontent.com/shinout/1403826/raw/421d01202c4b065cd2c4c5f4294492bd2d8809b8/jis1_regular_merged.json';
  data = loadJSON(url);
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  frameRate(1);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < width * height * 15 / 100; i++) {
    graphics.fill(0, 0, 100, 5);
    graphics.noStroke();
    graphics.ellipse(
      random(width),
      random(height),
      random(3),
      random(3)
    );
  }
}

function draw() {
  background(0, 0, 20);

  let cells = int(random(2, 9));
  let cols = cells;
  let rows = cells;
  let offset = width / 10;
  let margin = offset / 5;

  let cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  let cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellH + margin);

      fill(0, 0, 100);
      noStroke();

      let str = data[int(random(Object.keys(data).length))];
      createTextGraphics(x, y, cellW, cellH, str);
      str = data[int(random(Object.keys(data).length))];
      createTextGraphics(x, y, cellW, cellH, str, 90);
    }
  }
  image(graphics, 0, 0);  
  
}

function createTextGraphics(_cx, _cy, _w, _h, _str, _a = 0) {
  let textGraphics = createGraphics(_w, _h);
  textGraphics.push();
  textGraphics.translate(0, 0);
  textGraphics.textSize(_w);
  textGraphics.textAlign(CENTER, CENTER);
  textGraphics.fill(255);
  textGraphics.text(_str, _w / 2, _h / 2 + _w / 8);
  textGraphics.pop();

  let maskGraphics = createGraphics(_w, _h);
  maskGraphics.angleMode(DEGREES);
  maskGraphics.push();
  maskGraphics.translate(_w / 2, _h / 2);
  let i = 0;
  for (let angle = 0; angle < 360; angle += 360 / 4) {
    if (i % 2 == 0) {
      maskGraphics.rotate(angle);
      maskGraphics.noStroke();
      maskGraphics.rect(0, 0, _w, _h);
    }
    i++;
  }
  maskGraphics.pop();
  let maskedImage = pgMask(textGraphics, maskGraphics);

  push();
  translate(_cx + _w / 2, _cy + _h / 2);
  rotate(_a);
  imageMode(CENTER);
  image(maskedImage, 0, 0);
  pop();
}


function pgMask(_content, _mask) {
  var img = createImage(int(_mask.width), int(_mask.height));
  img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
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
  contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
  contentImg.mask(img)
  return contentImg;
}