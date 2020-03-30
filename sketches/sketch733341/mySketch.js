function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 90);

  let w = width / 4;
  let h = height / 4;

  for (let i = 0; i < 30; i++) {
    push();
    translate(width / 2, height / 2);
    beginShape();
    vertex(-w, -h);
    vertex(w, -h);
    vertex(w, h);
    vertex(-w, h);
    beginContour();
    let n = 3;
    for (let angle = 0; angle > -360; angle -= 360 / n) {
			let angle2 = angle + i * 10;
				angle2 += frameCount * (1 - i/30*5)/3;
      let x = cos(angle2) * w * 0.025;
      let y = sin(angle2) * w * 0.025;
      vertex(x, y);
    }
    endContour();
    endShape(CLOSE);
    w *= 1.15;
    h *= 1.15;
    pop();
  }
}