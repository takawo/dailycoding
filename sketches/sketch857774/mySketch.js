let pallete = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#02020C"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  blendMode(BLEND);
  background(random(360),100,10)
  blendMode(ADD);
  push();
  translate(-width, -height);
  for (let i = 0; i < 1300; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(width / 6);
    let h = random(height /6);
    if (x + w > width) w = width - x;
    if (y + h > height) h = height - y;
    drawingContext.shadowOffsetX = width * 2;
    drawingContext.shadowOffsetY = height * 2;
    drawingContext.shadowColor = color(random(pallete) + hex(50, 2));
    drawingContext.shadowBlur = 50;
    noStroke();
    push();
    translate(x, y);
    rotate(random(360));
    ellipse(0, 0, w, h);
    pop();
  }
  pop();
	frameRate(0.5);
}