function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  translate(0, height / 2);
  for (let x1 = 0; x1 < width; x1 +=1) {
    let y1 = sin(x1 * 2)*cos(x1 * 2/3) * width / 4;
    let x2 = x1 + 1;
    let y2 = sin(x2 * 2)*cos(x1 * 2/3)  * width / 4;
    let angle = atan2(y2-y1,x2-x1);
    point(x1, y1);
    push();
    translate(x1,y1);
    rotate(angle);
    let d = sin((x1+y1)*3.3)*30;
    ellipse(0,-d/2,d,d);
    pop();
  }
}