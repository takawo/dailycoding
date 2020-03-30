let noiseScale = 1500;
let graphics;
let rs;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  fill(0, 0, 100, 5);
  noStroke();

  rs = random(1000);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  graphics.fill(0, 0, 0, 3);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  randomSeed(rs);
  background(0, 0, 0);
  blendMode(ADD);
  push();
  translate(width / 2, height / 2);
  for (let rr = width / 2 * 1 / 5; rr < width; rr += width / 2 / 5) {
    let nn = random(1, 3);
    push();
    rotate(rr * 5 + frameCount / 3);
    for (let angle = 0; angle < 360; angle += 1) {
      let n = noise(rr / noiseScale, sin(angle / nn) * 150 / noiseScale, frameCount / noiseScale);
      let r = map(n, 0, 1, width / 3, width / 2);
      let d = map(noise(r, frameCount / noiseScale), 0.5, 1, 0, rr);
      d = constrain(d, 0, width / 4);
      push();
      let x = cos(angle) * (rr - d / 2);
      let y = sin(angle) * (rr - d / 2);
      translate(x, y);
      fill((angle + frameCount) % 360, 100, 100, 10);
      ellipse(0, 0, d, d);
      pop();
    }
    pop();
  }
  pop();
  blendMode(BLEND);
  image(graphics, 0, 0);

}