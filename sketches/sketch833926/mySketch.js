let noiseScale = 1000;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  fill(0, 0, 100, 5);
  //stroke(0, 0, 10, 10);
  noStroke();
}

function draw() {
  blendMode(BLEND);
  background(0,0,0);
  blendMode(ADD);
  push();
  translate(width / 2, height / 2);
  for (let rr = width / 2 * 1 / 5; rr < width / 2; rr += width / 2 / 4) {
    push();
    rotate(rr * 3 + frameCount / 3);
    for (let angle = 0; angle < 360; angle += 1) {
      let n = noise(rr / noiseScale, sin(angle / 2) * 150 / noiseScale, frameCount / noiseScale);
      let r = map(n, 0, 1, width / 3, width / 2);
      let d = map(noise(r, frameCount / noiseScale), 0.5, 1, 0, rr);
      d = constrain(d, 0, width / 5);
      push();
      translate(cos(angle) * (rr - d / 2), sin(angle) * (rr - d / 2));
      //noStroke();
      ellipse(0, 0, d, d);
      pop();
    }
    pop();
  }
  pop();
}