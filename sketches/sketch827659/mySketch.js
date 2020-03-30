let url = "https://coolors.co/app/7bdff2-b2f7ef-eff7f6-f7d6e0-f2b5d4";
let pallete;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 85);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  let percent = 30 / 100;
  let radius = sqrt(sq(width / 2) + sq(height / 2));
    graphics.fill(0, 0, 100, 7);
    graphics.noStroke();
  for (let i = 0; i < width * height * percent; i++) {
    let angle = random(360);
    let r = 1 - (random(random(1)));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }

  pallete = createPallete(url);

	let w = sqrt(width * width + height * height);
	push();
	translate(width/2,height/2);
	rotate(45);
  separateGrid(-w/2, -w/2, w);
	pop();
  image(graphics, 0, 0);
  //frameRate(1);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      let n = noise(i/100,j/100,frameCount/100);
      if (n > 0.5 && d > width / 10) {
        separateGrid(i, j, w);
      } else {
        let colors = pallete.concat();
        drawGraphics(i, j, w, w, colors);
        // rect(i,j,w,w);
      }
    }
  }
}


function drawGraphics(x, y, w, h, colors) {

  let bgNum = int(random(colors.length));
  let bg = colors[bgNum];
  colors.splice(bgNum, 1);

  let colors2 = colors.concat();

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
  let sep_num = int(random(3, 9));
  for (let i = 0; i < sep_num; i++) {
    if (colors2.length == 0) {
      colors2 = colors.concat();
    }
    let cNum = int(random(colors2.length));
    let c = colors2[cNum];
    colors2.splice(cNum, 1);
    g.push();
    g.translate(_w / 2, 0);
    g.fill(c);
    g.noStroke();
    g.ellipse(0, 0, w * 2 - i * w * 2 / sep_num);
    g.pop();
  }

  push();
  translate(x + w / 2, y + h / 2);
  rotate(rotate_num * 360 / 4);
  rectMode(CENTER);
  fill(bg);
  noStroke();
  rect(0, 0, _w, _h);
  imageMode(CENTER);
  image(g, 0, 0);
  pop();

}


function getColor(_pallete, n) {
  let p = _pallete.concat();
  let arr = [];
  while (n > 0) {
    let m = int(random(p.length));
    arr.push(p[m]);
    p.splice(m, 1);
    n--;
  }
  return arr;
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