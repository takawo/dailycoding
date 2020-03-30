let url = "https://coolors.co/app/2b2d42-8d99ae-edf2f4-ef233c-d90429";
let pallete;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 95);
  pallete = createPallete(url);
  separateGrid(0, 0, width, pallete);
  frameRate(1);
  noLoop();
}

function mousePressed(){
	redraw();
	save();
}

function separateGrid(x, y, d, colors) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 10) {
        separateGrid(i, j, w);
      } else {
        let colors = pallete.concat();
        let rNum = int(random(colors.length));
        fill(colors[rNum]);
        noStroke();
        colors.splice(rNum,1);
        rect(i, j, w, w);
        drawGraphics(i, j, w, w,colors);
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
    let t = 100 * 3 / 4;
    colorMode(HSB, 360, 100, 100, 100);
    c = color(h, s, b, t);
    arr[i] = c;
  }
  return arr;
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

function drawGraphics(x, y, w, h,_colors) {
    if(_colors.length == 0){
      _colors = pallete.concat();
    }
    let bgNum = int(random(_colors.length));
    let bg = _colors[bgNum];
    _colors.splice(bgNum, 1);

    let colors2 = _colors.concat();

  let rotate_num = int(random(4));
  let _w, _h;
  if (rotate_num % 2 == 0) {
    _w = w;
    _h = h;
  } else {
    _w = h;
    _h = w;
  }
  let g = createGraphics(_w, _h);
  g.angleMode(DEGREES);
  let sep_num = int(random(3, 9));
  let m = max(_w, _h);
  let shapeNum = int(random(2));
  for (let i = 0; i <= sep_num; i++) {
    if (colors2.length == 0) {
      colors2 = pallete.concat();
    }
    let cNum = int(random(colors2.length));
    let c = colors2[cNum];
    colors2.splice(cNum, 1);
    let mm = m * 2 - i * m * 2 / sep_num;
    g.push();
    g.translate(_w / 2 -_w * i/sep_num, 0);
    g.fill(c);
    g.noStroke();
    g.rotate(45);
    if(shapeNum == 0){
    g.ellipse(0, 0, mm);      
    }else{
    g.rectMode(CENTER);
    g.rect(0,0,mm,mm);
    }
    g.pop();
  }

  push();
  translate(x + w / 2, y + h / 2);
  rotate(rotate_num * 360 / 4);
  rectMode(CENTER);
  // // fill(bg);
  // noStroke();
  // rect(0, 0, _w, _h);
  imageMode(CENTER);
  image(g, 0, 0);
  pop();

}