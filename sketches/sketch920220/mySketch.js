let layers = [];
let count = 0;
let easing = [];
let rs;
let t = 0;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  rs = random(10000);
  for (let i = 0; i < 10; i++) {
    let layer = createGraphics(400, 400);
    layer.colorMode(HSB, 360, 100, 100, 100);
    layer.angleMode(DEGREES);
    layers.push(layer);
  }

  let s = 0;
  let t = 1;
  let k = 8;
  let deltaTime = 1.0 / 200.0;
  for (let i = 0; i < 200; i++) {
    s = lerp(t, s, exp(-k * deltaTime));
    easing.push(s);
  }
}

function draw() {
  background(0, 0, 98);
  randomSeed(rs);
  for (let j = layers.length - 1; j >= 0; j--) {
    let layer = layers[j];
    layer.clear();
    let sep = j + 1;
    for (let i = 0; i < sep; i++) {
      let v = easing[int(i * 3 + t) % easing.length];
      if (j == 1 && v > 0.99) {
        rs = random(10000);
        t = 0;
      }
      let w = layer.width / 2;
      let h = layer.height / sep * 0.8;
      let x = (map(v, 0, 1, 0, layer.width + w) + layer.width / 2) % (layer.width + w);
      let y = map(i, 0, sep - 1, layer.height - h, h);
      if (sep == 1) {
        y = layer.height / 2;
        h = layer.height * 0.5;
      }
      layer.rectMode(CENTER);
      layer.drawingContext.shadowColor = color(0, 0, 0, 15);
      layer.drawingContext.shadowBlur = layer.width / 5;
      layer.noStroke();
      layer.fill(0, 0, 99);
      layer.rect(x, y, w, h, w);
    }
  }
  let w = sqrt(width * width + height * height);
  push();
  translate(width / 2, height / 2);
  rotate(45);
  translate(-w / 2, -w / 2);
  separateGrid(0, 0, w, this);
  pop();
  t +=1;
}

function separateGrid(x, y, d, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  let layer = random(layers);
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 3) {
        separateGrid(i, j, w, g);
      } else {
        let dx = i;
        let dy = j;
        let dw = w;
        let dh = w;

        g.push();
        g.translate(dx + dw / 2, dy + dh / 2);
        g.rotate(int(random(4) + count) * 360 / 4);
        g.translate(-dw / 2, -dh / 2);
        g.image(layer, 0, 0, w, w);
        g.pop();

      }
    }
  }
}