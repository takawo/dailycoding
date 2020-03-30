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
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < width * height * 5 / 100; i++) {
    graphics.fill(0, 0, 0, 5);
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
  background(0, 0, 90);
  separateGrid(0, 0, width);
  frameRate(1);
  image(graphics, 0, 0);
  //noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        let str = data[int(random(Object.keys(data).length))];

        let g = createGraphics(w, w);
        g.colorMode(HSB, 360, 100, 100, 100);
        g.textSize(w*0.85);
        g.textAlign(CENTER, CENTER);
        //g.textFont('Osaka');

        g.fill(0, 0, 20);
        g.text(str, w / 2, w / 2 + w / 8);

        let g2 = createGraphics(w, w);
        g2.angleMode(DEGREES);
        g2.push();
        g2.translate(w / 2, w / 2);
        g2.rotate(int(random(4)) * 360 / 4);
        g2.noStroke();
        g2.triangle(-w / 2, -w / 2, 0, -w / 2, 0, 0);
        g2.pop();

        let maskedImage = pgMask(g, g2);
        let step = int(random(2,5)) * 2;
        for (let angle = 0; angle < 360; angle += 360 / step) {
          push();
          translate(i + w / 2, j + w / 2);
          imageMode(CENTER);
          image(maskedImage, 0, 0);
          rotate(angle);
          image(maskedImage, 0, 0);
          pop();
        }
      }
    }
  }
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