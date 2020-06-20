let offset, w;
let d = 250;
let t = 0;
let n = 0;
let url = "https://coolors.co/f4f1de-e07a5f-3d405b-81b29a-f2cc8f";
let palette;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  offset = width / 10;
  w = sqrt(sq(width + offset) + sq(height + offset));
  palette = createPalette(url);
}

function draw() {
  background(0, 0, 90);
  randomSeed(t);
  let u = t;
  let s = t;
  push();
  translate(width / 2, height / 2);
  rotate(-45);
  translate(-w / 2, -w / 2);
  let deltaTime = 1.0 / 120.0;
  let k = 8.0;
  n = lerp(d, n, exp(-k * deltaTime));

  noStroke();
  drawingContext.shadowColor = color(0, 0, 0, 25);

  for (let y = 0; y < w; y += d + offset / 2) {
    for (let x = n; x < w + n; x += d) {
      let m = abs(palette.length + u) % palette.length;
      for (let i = palette.length - 1; i > 0; i--) {
        fill(palette[(m + i) % palette.length]);
        let dd = d * i / palette.length;
        arc(x + d / 2, y + d / 2, dd, dd, 0, 180);
      }
      u--;
    }
    for (let x = -n + d / 2; x < -n + w + d / 2; x += d) {
      let m = s % palette.length;
      for (let i = palette.length - 1; i > 0; i--) {
        fill(palette[(m + i) % palette.length]);
        let dd = d * i / palette.length;
        drawingContext.shadowBlur = dd / 4;
        arc(x + d / 2, y + d / 2, dd, dd, 180, 360);
      }
      s++;
    }
  }
  pop();

  if (abs(d - n) < 1) {
    n = 0;
    t++;
  }
}

function createPalette(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}