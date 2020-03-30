function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(240);
  lineArc(100, 100, 800 - 100, 800 - 100, 6);
  lineArc(100, 800-100, 800 - 100, 100, 6);
	noLoop();
}

function lineArc(x1, y1, x2, y2, step) {
  let d = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x1, y1);
  rotate(angle);
  let n = 0;
  for (let i = 0; i < step; i++) {
    cx = d / step / 2 + i * d / step;
		let d1 = noise(frameCount/100) * d/step*2;
		let d2 = (1-noise(frameCount/100)) * d/step*2;
    if (n % 2 == 0) {
      arc(cx, 0,d1,d1, 0, 180,PIE);
    } else {
      arc(cx, 0, d2,d2, 0 + 180, 180 + 180,PIE);
    }
    n++;
  }
  pop();
}