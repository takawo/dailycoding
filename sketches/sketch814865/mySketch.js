let graphicArr;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let url = "https://coolors.co/app/3e6990-aabd8c-101d42-eb4b98-2708a0";
let pallete = [];
let font;
let textGraphics;
let graphics_num = 1;
let ratio = 0.66;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let depthMax = 6;
let bg;
let tf;
let g;

function preload(){
	font = loadFont("Merriweather-Black.ttf");
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  pallete = createPallete(url);
  init();
}

function init() {
  graphicArr = [];
  tf = new Transformer();
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 5);
  bg.noStroke();
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.ellipse(x, y, w, h);
  }

  textGraphics = createGraphics(width, height);
  textGraphics.colorMode(HSB, 360, 100, 100, 100);
  textGraphics.angleMode(DEGREES);

  g = createGraphics(width, height);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.background(0, 0, 100);
  g.angleMode(DEGREES);
}

function draw() {
  let colors = pallete.concat();
  let bgNum = int(random(colors.length));
  let bgColor = colors[bgNum];
  colors.splice(bgNum,1);
  
  background(bgColor);
  
  cells = int(random(3, 6));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = offset / 5;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  let s = str.concat();
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellH + margin);
      let cx = x + cellW / 2;
      let cy = y + cellH / 2;
      tf.push();
      tf.translate(cx, cy);
      let l = cellW / 4;
      let depth = int(random(3, 7));
      tree(g,depth, l);
      let snum =int(random(s.length)); 
      let t = s[snum];
      s = s.replace(t, "");
      textGraphics.textFont(font);
      textGraphics.textSize(cellW * 0.9);
      textGraphics.fill(random(colors));
      textGraphics.textAlign(CENTER, CENTER);
      textGraphics.text(t, tf.x, tf.y);
      tf.pop();
    }
  }
  image(bg, 0, 0);
  let img = pgMask(textGraphics, g);
  image(img, 0, 0);
  noLoop();
}

function keyPressed() {
  clear();
  init();
  redraw();
}

function tree(g, depth, l) {
  let len = 125;
  if (depth > 0) {
    let n = int(random(3,8));
    for (let angle = 0; angle < 360; angle += 360 / n) {
      tf.push();
      tf.rotate(angle);
      g.stroke(0, 0, 0);
      g.noFill();
      let sw = map(l, 0, len, 0, depthMax);
      g.strokeWeight(sw);
      if (random(100) > 50) {
        g.push();
        g.translate(tf.x, tf.y);
        g.rotate(tf.a);
        g.bezier(0, 0, l / 2, l / 2, l / 2, -l / 2, l, 0);
        g.pop();
      } else {
        g.push();
        g.translate(tf.x, tf.y);
        g.rotate(tf.a);
        g.bezier(0, 0, l / 2, -l / 2, l / 2, l / 2, l, 0);
        g.pop();
      }
      tf.translate(l, 0);
      tf.rotate(random(360));
      tree(g,depth - 1, l * random(0.2, 0.7));
      tf.pop();
    }
  }
}

function pgMask(_content, _mask) {
  //Create the mask as image
  var img = createImage(int(_mask.width), int(_mask.height));
  img.copy(_mask, 0, 0, int(_mask.width), int(_mask.height), 0, 0, int(_mask.width), int(_mask.height));
  //load pixels
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    // 0 red, 1 green, 2 blue, 3 alpha
    // Assuming that the mask image is in grayscale,
    // the red channel is used for the alpha mask.
    // the color is set to black (rgb => 0) and the
    // alpha is set according to the pixel brightness.
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i + 1] = 0;
    img.pixels[i + 2] = 0;
    img.pixels[i + 3] = v;
  }
  img.updatePixels();
  //convert _content from pg to image
  var contentImg = createImage(int(_content.width), int(_content.height));
  contentImg.copy(_content, 0, 0, int(_content.width), int(_content.height), 0, 0, int(_content.width), int(_content.height));
  // create the mask
  contentImg.mask(img)
  // return the masked image
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