let str = "sick,disturbed,unhinged,brainsick,demented,crazy,mad,unbalanced";
let g;
let texture;

function preload() {
  font = loadFont("Lato-Black.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(DARKEST);

  str = str.toUpperCase()
	let sep = int(random(5,10));
  let bounds = font.textBounds(str, 0, 0, width / sep);
  g = createGraphics(bounds.w + 3, bounds.h);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.textFont(font);
  g.textSize(width / sep);
  g.fill(0, 0, 15);
  g.text(str, -bounds.x, -bounds.y);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let r = (1 - random(random())) * sqrt(width * width + height * height) / 2;
    let angle = random(360);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    texture.point(x, y);
  }
	
  drawingContext.imageSmoothingEnabled = false;
}

function draw() {
  background(0, 0, 90);
  drawingContext.shadowColor = color(0, 0, 0, 80);

  let y = 0;
  let gx = random(g.width);
  while (y < height) {
    let x = 0;
    while (x < width) {
      let xStep = int(random(1, 5)) * 7;
      let n = noise(x / 50, y / 5, frameCount / 150);
      let gg;
      gx %= g.width;
      if (n > 0.5) {
        gg = g.get(gx, 0, xStep, g.height);
        gx += xStep;
      } else {
        gg = g.get(gx, 0, 1, g.height);
        gx += 1;
      }
      drawingContext.shadowBlur = xStep;
      image(gg, x, y, xStep, g.height);
      x += xStep;
    }
    y += g.height;
  }
  image(texture, 0, 0);
  noLoop();
}