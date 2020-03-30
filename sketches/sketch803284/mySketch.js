let cols, rows;
let margin, offset, cellW, cellH;
let url = "https://coolors.co/app/50514f-f25f5c-ffe066-247ba0-70c1b3";
let pallete;
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  frameRate(1);


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
}

function draw() {
  pallete = createPallete(url);
  let bgNum = int(random(pallete.length));
  background(pallete[bgNum]);
  pallete.splice(bgNum,1);
  
  cols = int(random(2, 10));
  rows = int(random(2, 10));

  offset = width / 10;
  margin = offset / 10;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellH + margin);

      push();
      translate(x + cellW / 2, y + cellH / 2);
      let rNum = int(random(4));
      let w, h;
      if (rNum % 2 == 1) {
        w = cellH;
        h = cellW;
      } else {
        w = cellW;
        h = cellH;
      }
      rotate(rNum * 360 / 4);
      separateGrid(-w / 2, -h / 2, w, h, pallete.concat());

      pop();

    }
  }
  image(bg, 0, 0);
}


function separateGrid(x, y, w, h, _colors) {
  let colors = _colors;
  let sepNumW = int(random(1, 6));
  let sepNumH = int(random(1, 6));
  let ww = w / sepNumW;
  let hh = h / sepNumH;
  for (let i = x; i < x + w - 1; i += ww) {
    for (let j = y; j < y + h - 1; j += hh) {
      if (random(100) < 90 && ww > cellW / 15 && hh > cellH / 15) {
        separateGrid(i, j, ww, hh, colors);
      } else {
        if(colors.length  < 1){
          colors = pallete.concat();
        }
        let num = int(random(colors.length));
        let c = colors[num];
        colors.splice(num,1);
        fill(c);
        noStroke();
        rect(i, j, ww, hh);
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