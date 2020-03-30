let w, h, num;
let url = "https://coolors.co/app/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d";
let pallete;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  w = width * 5;
  h = height * 5;
  num = 40;
  pallete = createPallete(url);
}

function draw() {
  background(0, 0, 0, 10);
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < num; i++) {

    let f = frameCount / 100;
    let n = map(i, 0, num, 0, pallete.length);
    let current = int(n + f) % pallete.length;
    let next = ceil(n + f) % pallete.length;
    let fl = (f+ n) % 1;

    let c1 = color(pallete[current]);
    let c2 = color(pallete[next]);

    colorMode(RGB);
    let c = lerpColor(c1, c2, fl);


    let x = cos(frameCount * 2.5 + i * 8) * w / 15;
    let y = sin(frameCount * 1.5 + i * 10) * w / 15;
    let r = map(i, 0, num, w / 100, w / 2);
    drawRectWithHole(x, y, w, h, r, c);
  }
  pop();
}

function drawRectWithHole(_x, _y, _w, _h, _r, _c) {
  push();
  translate(_x, _y);
  fill(_c);
  noStroke();
  beginShape();
  vertex(-_w / 2, -_h / 2);
  vertex(_w / 2, -_h / 2);
  vertex(_w / 2, _h / 2);
  vertex(-_w / 2, _h / 2);

  beginContour();
  for (let angle = 0; angle > -360; angle -= 5) {
    let x = cos(angle) * _r / 2;
    let y = sin(angle) * _r / 2;
    vertex(x, y);
  }
  endContour();
  endShape(CLOSE);
  pop();
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