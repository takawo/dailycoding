let angle = 0;
let angleTarget;
let r;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  angleTarget = angle + random(180, 360) * (random(100) > 50 ? -1 : 1);
  r = width / 2 * 0.75;
  background(0, 0, 0);
}

function draw() {
  let offset = -30;
  
  blendMode(BLEND);
  background(0, 0, 0, 5);
  
  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 10);
  scale(0.99);
  translate(-width / 2, -height / 2);
  copy(0, 0, width, height, -offset, -offset, width + offset * 2, height + offset * 2);
  // blendMode(ADD);
  translate(width / 2, height / 2);

  let deltaTime = 1.0 / 120.0;
  let k = 5.0;
  angle = lerp(angleTarget, angle, exp(-k * deltaTime));

  noFill();
  stroke(0, 0, 100);
  strokeWeight(10);
  ellipse(0, 0, r * 2, r * 2);

  for (let a = 0; a < 360; a += 360 / 3) {
    let x = cos(angle + a) * r;
    let y = sin(angle + a) * r;
    fill(0, 0, 100);
    noStroke();
    drawingContext.shadowColor = color(0, 0, 100);
    drawingContext.shadowBlur = 50;
    ellipse(x, y, 50, 50);
  }
  
  pop();
  if (abs(angleTarget - angle) < 1) angleTarget = angle + random(180, 360) * (random(100) > 50 ? -1 : 1);


}