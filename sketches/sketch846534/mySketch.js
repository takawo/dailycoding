function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 50);
  push();
  translate(width / 2, height / 2);
  for (let angle = 0; angle < 360; angle += 5) {
    push();
    rotate(angle);
    if(mouseIsPressed){
    stroke(0, 0, 20);
    line(0, 0, 200, 0);
    }
    let n = map((angle * 13 + frameCount) % 100, 0, 100, 0, 1);
    let m = n + 0.1;
    if (m > 1) {
      let mm = m-1;
      m = 1;
      let nx = n * 200;
      let mx = m * 200;
      let mmx = mm * 200;
      stroke(0, 0, 100);
      line(nx, 0, mx, 0);
      line(0, 0, mmx, 0);

    } else {
      let nx = n * 200;
      let mx = m * 200;
      stroke(0, 0, 100);
      line(nx, 0, mx, 0);

    }
    pop();
  }
  pop();

}