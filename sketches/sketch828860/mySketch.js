// reference : Kitasenju Design @kitasenjudesign 's awesome sketch.
// https://twitter.com/kitasenjudesign/status/1220656482812755968
// https://neort.io/art/boj6fms3p9fd1q8ocmd0

let url = "https://coolors.co/app/003049-d62828-f77f00-fcbf49-eae2b7";
let pallete;

let count;
let rs;
let graphics;
let img;
let capture;

function preload() {
  capture = createCapture({
    video: {
      mandatory: {
        minWidth: 160,
        minHeight: 120
      },
      optional: [{
        maxFrameRate: 30
      }]
    },
    audio: false
  });
}


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  frameRate(30);

  capture.hide();

  pallete = createPallete(url);

  rs = random(10000);
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

}

function draw() {
  //background(220);
  randomSeed(rs / 100);
  img = capture.get().resize(160, 120);
  push();
  translate(width / 2 + cos(frameCount / 3) * width / 4,
    height / 2 + sin(frameCount / 7) * height / 4
  );
  //rotate(45);
  let w = sqrt(sq(width * 3 / 2) + sq(height * 3 / 2));
  recursiveRect(-w / 2, -w / 2, w, w, 0);
  pop();
  count = frameCount * 2;
  if (count % 360 == 0) {
    //rs = random(1000);
  }
  image(graphics, 0, 0);
}

function recursiveRect(x, y, w, h, n) {
  if (random(100) < 90 && n > 3) {
    // let c1 = random(pallete);
    // let c2 = random(pallete);
    // while (c1 == c2) {
    //   c2 = random(pallete);
    // }
    // fill(c1);
    // noStroke();
    // rectMode(CENTER);
    // rect(x + w / 2, y + h / 2, max(w, 0), max(h, 0));
    // fill(c2);
    // noStroke();
    // circle(x + w / 2, y + h / 2, max(min(w, h), 0));
    image(capture, x, y, w, h);
  } else {
    let r1 = random(0.2, 0.8) * sin(count * .3 + n + random(360)) + random();
    r1 = r1 * r1;
    r1 = constrain(r1, 0, 1);
    let r2 = random(0.2, 0.8) * sin(count * .7 + n + random(360)) + random();
    r2 = r2 * r2;
    r2 = constrain(r2, 0, 1);
    let w1 = w * r1;
    let w2 = w * (1 - r1);
    let h1 = h * r1;
    let h2 = h * (1 - r1);
    recursiveRect(x, y, w1, h1, n + 1);
    recursiveRect(x + w1, y, w2, h1, n + 1);
    recursiveRect(x, y + h1, w1, h2, n + 1);
    recursiveRect(x + w1, y + h1, w2, h2, n + 1);
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