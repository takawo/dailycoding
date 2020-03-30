let graphics;

function setup() {
  createCanvas(800, 400);
  colorMode(HSB, 360, 100, 100, 100);

  graphics = createGraphics(width / 2, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
	frameRate(1);
}

function draw() {
  background(0, 0, 80);
  graphics.clear();

  let cx = graphics.width / 2;
  let cy = graphics.height / 2;
  let offset = graphics.width / 10;

  let cells = int(random(5,15));
  let cols = cells;
  let rows = cells;

  let cellW = (graphics.width - offset * 2) / cols;
  let cellH = (graphics.height - offset * 2) / cols;

  graphics.push();
  graphics.translate(cx, cy);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -graphics.width / 2 + offset, graphics.width / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -graphics.height / 2 + offset, graphics.height / 2 - offset - cellH);
      graphics.fill(random(100) < 50 ? color(0, 0, 80) : color(0, 0, 0));
      graphics.noStroke();
      graphics.rect(x, y, cellW, cellH);
    }
  }
  graphics.pop();
  image(graphics, 0, 0);
  fill(0,0,80);
	noStroke();
  rect(width/4,0,width/4,height);

  let graphics_copy = createGraphics(graphics.width, graphics.height);
  let graphics_copyA = createGraphics(graphics.width, graphics.height);

  graphics_copy.copy(graphics, 0, 0, graphics.width / 2, graphics.height,
    0, 0, graphics.width / 2, graphics.height);
  graphics_copy.scale(-1, 1);
  graphics_copy.image(graphics_copy, -graphics_copy.width, 0, graphics_copy.width, graphics_copy.height);

  image(graphics_copy, width / 2, 0);

}