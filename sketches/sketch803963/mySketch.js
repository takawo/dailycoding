let url = "https://coolors.co/2d3142-4f5d75-bfc0c0-ffffff-ef8354";
let pallete;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 8);
  for (let i = 0; i < width * height * 20 / 100; i++) {

    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }
  frameRate(1);
}

function draw() {
  pallete = createPallete(url);
  let bgNum = int(random(pallete.length));
  background(pallete[bgNum]);
  pallete.splice(bgNum, 1);

  let offset = width / 10;
  let gWidth = width - offset * 2;
  let g = createGraphics(gWidth / 2, gWidth);
  separateGrid(0, 0, g.height, g);

  if (random(100) > 50) {
    push();
    translate(offset, offset);
    image(g, 0, 0);
    pop();
    push();
    translate(width - offset, offset);
    scale(-1, -1);
    image(g, 0, -g.height);
    pop();
  } else {
    push();
    translate(offset, offset);
    image(g, 0, 0);
    pop();
    push();
    translate(width - offset, offset);
    scale(-1, 1);
    image(g, 0, 0);
    pop();
  }
  //noLoop();

  image(bg, 0, 0);
}

function separateGrid(x, y, d, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 20) {
        separateGrid(i, j, w, g);
      } else {
        separateRect(i, j, w, w, g, pallete.concat());
      }
    }
  }
}

function separateRect(x, y, w, h, g, _colors) {
  let colors = _colors;
  let sepNumW = int(random(1, 6));
  let sepNumH = int(random(1, 6));
  let ww = w / sepNumW;
  let hh = h / sepNumH;
  for (let i = x; i < x + w - 1; i += ww) {
    for (let j = y; j < y + h - 1; j += hh) {
      if (random(100) < 90 && ww > width / 20 && hh > height / 20) {
        separateRect(i, j, ww, hh, g, colors);
      } else {
        if (colors.length < 1) {
          colors = pallete.concat();
        }
        let num = int(random(colors.length));
        let c = colors[num];
        colors.splice(num, 1);
        g.fill(c);
        g.stroke(0, 0, 90, 50);
        g.strokeWeight(0.5);
        g.rect(i, j, ww, hh);
      }
    }
  }
}


function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');

  for (let i = 0; i < arr.length; i++) {
    let red = unhex(arr[i].substr(0, 2));
    let green = unhex(arr[i].substr(2, 2));
    let blue = unhex(arr[i].substr(4, 2));
    colorMode(RGB, 255, 255, 255);
    let c = color(red, green, blue);
    let h = hue(c);
    let s = saturation(c);
    let b = brightness(c);
    let t = 100;
    colorMode(HSB, 360, 100, 100, 100);
    c = color(h, s, b, t);
    arr[i] = c;
  }
  return arr;
}