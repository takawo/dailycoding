let imgs = [];
let imgNum = 20;
let w = 800;
let graphics;

function preload() {
  for (let i = 0; i < imgNum; i++) {
    imgs.push(loadImage("https://loremflickr.com/" + w + "/" + w + "?random=" + int(random(10000))));
  }
}


function setup() {
  createCanvas(w, w);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  strokeJoin(ROUND);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  background(10);
  push();
  recursiveTrianglesWithImages([], 0, 3, width / 2.2);
  pop();
  image(graphics,0,0);
}

function recursiveTrianglesWithImages(arr, depth, max, rMax = width / 2) {
  if (depth > max) {
    return;
  }
  if (depth == 0) {
    let r = rMax;
    let startAngle = int(random(12)) * 360 / 12;
    let g1 = createGraphics(width, height);
    g1.fill(255);
    g1.beginShape();
    for (let angle = startAngle; angle < 360 + startAngle; angle += 360 / 3) {
      let x = width / 2 + cos(angle) * r;
      let y = height / 2 + sin(angle) * r;
      arr.push(createVector(x, y));
      g1.vertex(x, y);
    }
    g1.endShape(CLOSE);

    let i1 = random(imgs).get();
    i1.mask(g1);
    image(i1, 0, 0);
  }

  let target = int(random(arr.length));
  let next = (target + 1) % arr.length;
  let current = p5.Vector.lerp(arr[target], arr[next], 0.5);

  let g2 = createGraphics(width, height);
  g2.triangle(arr[target].x, arr[target].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  let i2 = random(imgs).get();
  i2.mask(g2);
  image(i2, 0, 0);
  recursiveTrianglesWithImages([arr[target], arr[(next + 1) % arr.length], current], depth + 1, max);

  let g3 = createGraphics(width, height);
  g3.triangle(arr[next].x, arr[next].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  let i3 = random(imgs).get();
  i3.mask(g3);
  image(i3, 0, 0);
  recursiveTrianglesWithImages([arr[next], arr[(next + 1) % arr.length], current], depth + 1, max);
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
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