let cells, offset, margin, d;
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 20);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  let percent = 10 / 100;
  for (let i = 0; i < width * height * percent; i++) {
    bg.stroke(0, 0, random(100), 10);
    bg.point(random(bg.width), random(bg.height));
  }

  cells = int(random(2, 10));
  offset = width / 10;
  margin = 0;
  offset / 5;

  d = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d + margin);
      let y = offset + j * (d + margin);
      //rect(x, y, d, d);
      push();
      translate(x + d / 2, y + d / 2);
      rotate(int(random(4)) * 360 / 4);
      noStroke();
      arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90, PIE);
      push();
      translate(-d / 2, -d / 2);
      let angleStep = int(random(10, 5)) / 100 * 90;
      let sep = int(random(3, 15));
      stroke(0, 0, 0);
      strokeWeight(d / 80);
      for (let r = d; r > 0; r -= d / sep) {
        //arc(0,0,r,r,0,90);
        let n = int(random(2));
        for (let angle = 0; angle < 90; angle += angleStep) {
          beginShape();
          let a = angle;
          let e = min(angle + angleStep, 90);
          if (n % 2 == 0) {
            while (a < e) {
              vertex(cos(a) * r, sin(a) * r);
              a += 1;
            }
          }
          n++;
          endShape();
        }
      }
      pop();
      pop();
    }
  }
  image(bg, 0, 0);
}