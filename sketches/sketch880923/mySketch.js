let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890./!?";
// let pallete = ["#374C57", "#647B81", "#B3C1BF", "#3DD0AE", "#DE2320", "#03111D"];

let url = "https://coolors.co/app/7bdff2-b2f7ef-eff7f6-f7d6e0-f2b5d4";
let pallete;

let texture;
let font;

function preload() {
  font = loadFont("Lato-BoldItalic.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  
  pallete = createPallete(url);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.noStroke();
  for (let i = 0; i < texture.width * texture.height * 8 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(5);
    let h = random(5);
    texture.fill(0, 0, 100, 5);
    texture.ellipse(x, y, w, h);
  }
}

function draw() {
  blendMode(BLEND);
  background(0, 0, 10);
  blendMode(ADD);
  let offset = width / 20;
  let margin = offset / 5;
  let graphics = this;
  let n = 0;
  let cells = 6;
  let d = (width - offset * 2 - margin * (cells - 1)) / cells;
  let dd = d * 1.2;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let textString = str.substr(n, 1);
      let bound = font.textBounds(textString, 0, 0, dd);

      let x = offset + i * (d + margin);
      let y = offset + j * (d + margin);
      let cx = x + d / 2;
      let cy = y + d / 2;

      let rotate_num = int(random(4)) * 360 / 4;

      let col = random(pallete)+hex(200,2);
      let dashStep = int(random(5,12)) * 10;

      for (let i = 0; i < 20; i++) {
        graphics.push();
        graphics.translate(cx, cy);
        graphics.translate(-bound.x - bound.w / 2, -bound.y - bound.h / 2);
        graphics.textFont(font);
        graphics.textSize(dd);
        graphics.stroke(col);
        graphics.noFill();
        graphics.drawingContext.shadowColor = color(col);
        graphics.drawingContext.shadowBlur = 20;
        graphics.drawingContext.setLineDash([dashStep,20]);
        graphics.text(textString, 0, 0);
        graphics.pop();
      }
        n++;
    }
  }
  image(texture,0,0);
  noLoop();
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