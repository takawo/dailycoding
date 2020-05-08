let layers = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  let offset = width / 10;
  for (let i = 0; i < 5; i++) {
    let base = createGraphics(width, height);
    base.colorMode(HSB, 360, 100, 100, 100);
    base.background(0, 0, 90);
    base.blendMode(BURN);
    for (let i = 0; i < 500; i++) {
      let d = random(20,40);
      base.drawingContext.shadowColor = color(random(360), 100, 100);
      base.drawingContext.shadowBlur = d;
      base.fill(0, 0, 100, 35);
      base.noStroke();
      let x = random(width);
      let y = random(height);
      base.ellipse(x, y, 100, 100);
    }
    base.blendMode(BLEND);
    layers.push(base);
  }
  separateGrid(0,0,width, layers);
}

function draw() {
  background(0, 0, 95);
  blendMode(BURN);
  for (let layer of layers) {
    image(layer, 0, 0);
  }
  noLoop();
}


function separateGrid(x, y, d, layers) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w, layers);
      } else {
        let n = int(random(layers.length));
        for (let k = 0; k < layers.length; k++) {
          if (n != k) {
            let layer = layers[k];
            layer.push();
            layer.erase(255,0);
            layer.rect(i, j, w, w);
            layer.noErase();
            layer.pop();
          }
        }
      }
    }
  }
}