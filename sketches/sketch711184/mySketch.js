let c1, c2;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 10);


  let cx = width / 2;
  let cy = height / 2;
  let offset = width / 20;
  let w = width - offset * 2;
  let h = height - offset * 2;
  c1 = color(220, 100, 100);
  c2 = color(0, 100, 100);


  let freqA = random(0, 1.5) * (random(100) > 50 ? -1 : 1);
  let freqB = random(0, 1.5) * (random(100) > 50 ? -1 : 1);
  let offsetA = random(360);
  let offsetB = random(360);

  push();
  translate(cx, cy);
  let prevDistance = -1;
  for (let x = -w / 2; x < w / 2; x += 1) {

    let y1 = sin(offsetA + x * freqA) * w / 2 / 2;
    let y2 = sin(offsetA + x * freqB) * w / 2 / 2;
    //line(x,y1,x,y2);

    let yMin = min(y1, y2);
    let yMax = max(y1, y2);

    let distance = int(dist(x, y1, x, y2));
    if (distance == 0 && prevDistance != 0) {
      swapColor();
    }
    prevDistance = distance;
    for (let y = yMin; y < yMax; y++) {
      let ratio = (y - yMin) / (yMax - yMin);
      colorMode(RGB);
      stroke(lerpColor(c1, c2, ratio));
      line(x, y, x, y + 1);
    }
  }
  pop();
  noLoop();
}

function swapColor() {
  let _temp = c1;
  c1 = c2;
  c2 = _temp;
}