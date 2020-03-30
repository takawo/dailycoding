let r = 1;
let x = [];
let y = [];
let angle = [];

let num = 10;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  background(220);

  for (let i = 0; i < num; i++) {
    x[i] = 0;
    y[i] = 0;
    angle[i] = 360/num * i;
  }
}

function draw() {
  for (let i = 0; i < num; i++) {
    push();
    translate(width / 2, height / 2);
    x[i] += cos(angle[i]) * r;
    y[i] += sin(angle[i]) * r;
    ellipse(x[i], y[i], 10, 10);
    let n = noise(x[i] / 400, y[i] / 400); //0〜1 
    n = map(n, 0, 1, -3, 3);
    angle[i] = angle[i] + n;

    pop();

    if (x[i] > width / 2) {
      x[i] = -width / 2;
    }
    if (x[i] < -width / 2) {
      x[i] = width / 2;
    }
    if (y[i] > height / 2) {
      y[i] = -height / 2;
    }
    if (y[i] < -height / 2) {
      y[i] = height / 2;
    }
  }

}    