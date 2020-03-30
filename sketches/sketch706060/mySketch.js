let cells, cols, rows;
let offset, margin;
let w, h;
let graphics;


let url = "https://coolors.co/app/50514f-f25f5c-ffe066-247ba0-70c1b3";
let pallete = [];

let noiseScale = 10;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw(){
  init();
  image(graphics, 0, 0);
	noLoop();
}

function mousePressed(){
	redraw();
}

function keyPressed(){
	saveCanvas("output.png");
}


function init() {
  cells = int(random(15, 50));
  cols = cells;
  rows = cells;

  offset = width / cells / int(random(3, 8));
  margin = offset / int(random(1, 3));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
  pallete = createPallete(url);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(50000, graphics);

  background(0, 0, 90);
  strokeWeight(15 / cells);
  let jStep = 1;
  for (let j = 0; j < rows; j += jStep) {
    let iStep = 1;
    jStep = int(random(1, cells / 2));
    if (j + jStep > rows) {
      jStep = rows - j;
    }
    let ch = h * jStep + margin * (jStep - 1);
    for (let i = 0; i < cols; i += iStep) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      iStep = int(random(1, cells / 2));
      if (i + iStep > cols) {
        iStep = cols - i;
      }
      let cw = w * iStep + margin * (iStep - 1);
      let m = max(cw, ch);
      let r = sqrt(sq(m) + sq(m));
      drawLineInRect(x, y, cw, ch, r);

    }
  }
}

function drawLineInRect(x, y, w, h, r) {
  let fillAndStroke = getColor(pallete, 2);

  push();
  translate(x + w / 2, y + h / 2);
  let rotate_num = int(random(4));
  rotate(rotate_num * 90);
  if (rotate_num % 2 == 1) {
    let temp = w;
    w = h;
    h = temp;
  }
  rectMode(CENTER);
  fill(fillAndStroke[0]);
  stroke("#114b5f");
  rect(0, 0, w, h);
  let sep = int(random(15, 50)) * int(random(3, 5));
  for (let x = -r * 2; x <= r * 2; x += 10) {
    let x2 = cos(45) * x;
    let y2 = sin(45) * x;
    let x3 = x2 + cos(45 + 90) * r * 4;
    let y3 = y2 + sin(45 + 90) * r * 4;
    let x4 = x2 + cos(45 - 90) * r * 4;
    let y4 = y2 + sin(45 - 90) * r * 4;
    let angle = atan2(y3 - y4, x3 - x4);
    let distance = dist(x3, y3, x4, y4);

    noFill();
    beginShape();
    let noiz = noise(x / noiseScale, y / noiseScale, frameCount / noiseScale);
    let nStep = distance / sep;
    noiz *= distance * -1;
    for (let n = x; n < distance; n += nStep) {
      let r2 = n;
      beginShape();
      while (r2 < n + nStep / 2) {
        let x5 = cos(180 + angle) * r2 + x3;
        let y5 = sin(180 + angle) * r2 + y3;
        let xn = constrain(x5, -w / 2, w / 2);
        let yn = constrain(y5, -h / 2, h / 2);
        if (x5 == xn && y5 == yn) {
          vertex(xn, yn);
        }
        r2++;
      }
      endShape();

      // line(xn1, yn1, xn2, yn2);
    }
    endShape();

  }
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