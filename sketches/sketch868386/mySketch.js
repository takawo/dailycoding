let str = "AUDIENCE";
let g;
let font;
let graphics;

function preload() {
  font = loadFont("Lato-BoldItalic.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
        drawingContext.shadowOffsetX = random(-20,20);
        drawingContext.shadowOffsetY = random(-20,20);

  let bounds = font.textBounds(str, 0, 0, width / 8);
  g = createGraphics(bounds.w + 3, bounds.h);
  g.textFont(font);
  g.textSize(width / 8);
  g.fill(255, 128);
  g.text(str, -bounds.x, -bounds.y);

  g.drawingContext.imageSmoothingEnabled = false;
  drawingContext.imageSmoothingEnabled = false;
  
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 10 / 100; i++) {
    let d = random(5);
    let x = random(-d, width + d);
    let y = random(-d, height + d);
    graphics.fill(random(180,280),100,100,10);
    graphics.ellipse(x,y,d,d);
  }  
}

function draw() {
  background(0, 0, 0);
  blendMode(SCREEN);
  let x = random(-g.width);
  let y = 0;

  while (y < height) {
    while (x < width) {
      let n = 0;
      while (n < g.width) {
        let step = random() * 1 / 30 * g.width;
        if (n + step > g.width) {
          step = g.width - n;
        }
        let gx = n;
        let gw = max(int(step), 1);
        let gg = g.get(gx, 0, gw, g.height);
        let nw = gg.width * noise(x / 40, y / 40) * 8;
        n += nw;
        drawingContext.shadowColor = color((45 + int(random(3)) * 360 / 3) % 360, 100, 100);
        image(gg, x + gx, y, nw, g.height);
      }
      x += g.width;
    }
    x = random(-g.width)
    y += g.height;
  }
  image(graphics,0,0);
  noLoop();
}