let colors = ["#ED6A5A", "#F4F1BB", "#9BC1BC", "#5CA4A9", "#E6EBE0"];

function setup() {
  createCanvas(600, 600);
  // let bgNum = int(random(colors.length));
  // let bg = colors[bgNum];
  // background(bg);
  // colors.splice(bgNum, 1);

  for (let i = 0; i < 100; i = i + 1) {
    let d = random(100);
    let x = random(d, width - d);
    let y = random(d, height - d);
    let c = random(colors);
    let n = random(100);
    if (n > 50) {
      fill(0, 10);
      noStroke();
      circle(x + d / 10, y + d / 10, d);
      fill(c);
      noStroke();
      circle(x, y, d);
    } else {
      fill(0, 10);
      noStroke();
      square(x + d / 10, y + d / 10, d);
      fill(c);
      noStroke();
      rectMode(CENTER);
      square(x, y, d);
    }
  }
  for (let i = 0; i < 100000; i = i + 1) {
    stroke(255, 15);
    let px = random(600);
    let py = random(600);
    point(px, py);
  }
}