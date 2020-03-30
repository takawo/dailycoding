function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 95);

  let ratio = 0.75;
  let cx = width / 2;
  let cy = height / 2;
  let w = width * ratio;
  let h = height * ratio;

  push();
  translate(cx, cy);
  rotate(int(random(4)) * 90);
  push();
  translate(-w / 2, -h / 2);

  stroke(0, 0, 0);
  strokeWeight(10);
  fill(0, 0, 100);
  arc(0, 0, w * 2, h * 2, 0, 90, PIE);
  let nMax = sqrt(sq(w) + sq(h));
  for (let n = 0; n <= nMax; n += nMax / 20) {
    let x1 = n;
    let y1 = 0;
    let x2 = 0;
    let y2 = n;
    //line(x1, y1, x2, y2);

    let angle = atan2(y1 - y2, x1 - x2);
    let distance = dist(x1, y1, x2, y2);
    let dStep = w / 19;
    let diameter = dStep / 2.5;
    for (let d = 0; d < distance; d += dStep) {
      let x = x1 + cos(180 + angle) * d;
      let y = y1 + sin(180 + angle) * d;
      let distance2 = dist(x, y, 0, 0);

      let distanceA = dist(x + diameter, y + diameter, 0, 0);
      let distanceB = dist(x - diameter, y - diameter, 0, 0);

      let angleA = atan2(y + diameter, x + diameter);
      let angleB = atan2(y - diameter, x - diameter);

      if (distanceA < w && distanceB < w && distance2 < w && angleA > 0 && angleA < 90 && angleB > 0 && angleB < 90) {
        noStroke();
        fill(0, 0, 0);
        // arc(x, y, diameter*2, diameter*2,0,90);
        ellipse(x, y, diameter, diameter);
      }
    }
  }
  pop();
  noLoop();
}