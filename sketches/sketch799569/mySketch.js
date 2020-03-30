let offset, margin;
let cells, w, d;
let graphics;
const speed = 2;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  offset = width / 10;
  cells = int(random(2, 10));

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();

  for (let i = 0; i < width * height * 15 / 100; i++) {
    if (random(100) > 50) {
      graphics.fill(0, 0, 0, 10);
    } else {
      graphics.fill(0, 0, 100, 10);
    }
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  background(0, 0, 95);
  let marginMax = (width - 0 * cells - offset * 2) / (cells - 1);
  margin = marginMax / 2 + sin(frameCount*speed) * marginMax / 2;
  d = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = +offset + i * (d + margin);
      let y = +offset + j * (d + margin);
      fill(0, 0, 80);
      rect(x, y, d, d);
      if (i < cells - 1 && j < cells - 1) {
        fill(0, 0, 20);
        rect(x + d, y + d, margin, margin);
      }
    }
  }
  image(graphics, 0, 0);
	if((270+frameCount*speed)%360 == 0){
	  cells = int(random(2, 10));	
	}
}