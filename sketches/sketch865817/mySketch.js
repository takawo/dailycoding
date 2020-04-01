let graphics = [];
let graphics_num = 4;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  for (let i = 0; i < graphics_num; i++) {
    let g = createGraphics(width, height);
    g.colorMode(HSB, 360, 100, 100, 100);
    g.angleMode(DEGREES);
    graphics.push(g);
  }
}

function draw() {
  background(0, 0, 90);

  let n = 0;
  for (let g of graphics) {
    randomSeed(n * 100);
    g.clear();
    let bri = map(n, 0, graphics_num - 1, 20, 70);
    g.background(0, 0, bri);
    g.erase(255, 0);
    let offset = width / 2;
    let sep = 7;
    for (let i = 0; i < sep; i++) {
      g.push();
      g.translate(-offset, height / 2);
      let step = (width + offset * 2) / sep;
      let d = (width + offset * 2) / sep * 0.9;
      let x = (i * step + 3 * frameCount / (graphics_num - n)) % (width + offset * 2);
      let y = random(-height / 20, height / 20);
      g.translate(x, y);
      g.rotate(10 * (n % 2 == 0 ? -1 : 1) + random(-5, 5));
      g.ellipse(0, 0, d, 650 * random(1, 1.1));
      g.pop();
    }
    drawingContext.shadowColor = color(0, 0, 0);
    drawingContext.shadowBlur = width / 15;
    image(g, 0, 0);
    n++;
  }
}