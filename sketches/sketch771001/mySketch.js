let img;
let noiseScaleX = 100;
let noiseScaleY = 100;

function preload() {
  let num = int(random(1000));
  img = loadImage("https://loremflickr.com/800/800?random=" + num);
}

function setup() {
  createCanvas(800, 800);
  let cells = int(random(5, 30));
  let w = width / cells;
  let h = height / cells;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = i * w;
      let y = j * h;
      let trim = img.get(x, y, w, h);
      //image(trim,x,y);
      if (random(100) < 50) {
        let ny = y + noise(x / noiseScaleX, y / noiseScaleY) * h;
        for (let yy = y; yy < ny; yy++) {
          image(trim, x, yy);
        }
      } else {
        let nx = x + noise(x / noiseScaleX, y / noiseScaleY) * w;
        for (let xx = x; xx < nx; xx++) {
          image(trim, xx, y);
        }
      }
    }
  }
  noLoop();
}