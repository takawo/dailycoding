let pallete = ["#4F857B", "#E2D8B3", "#016557", "#B9450E", "#554520", "#111710", "#C8A54B"];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 15 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.fill(0, 0, 100, 3);
    graphics.noStroke();
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {

  background(0, 0, 90);
  let wMax = sqrt(sq(width) + sq(height));
  push();
  translate(width / 2, height / 2);
  rotate(45);
  for (let w = wMax; w > 1; w -= wMax / 100) {
    //rotate(30);
    let cells = int(random(1, 50));
    let ww = w / cells;
    for (let j = 0; j < cells; j++) {
      for (let i = 0; i < cells; i++) {
        let x = -w / 2 + i * ww + ww / 2;
        let y = -w / 2 + j * ww + ww / 2;
        rectMode(CENTER);
        fill(random(pallete));
        noStroke();
        rect(x, y, ww, ww);
      }
    }
  }
  pop();
  image(graphics, 0, 0);
  frameRate(1);
}