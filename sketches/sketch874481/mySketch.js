let arr;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  arr = [sin, cos];
}

function draw() {
  background(220);
  
  drawingContext.shadowColor = color(0, 0, 0, 50);
  drawingContext.shadowBlur = height / 8;

  noStroke();
  randomSeed(2000);
  for (let y = 0; y < height * 3 / 2; y += 10) {
    let n = int(random(4, 8));
    let nArr = [];
    let nFreqArr = [];
    for (let nn = 0; nn < n; nn++) {
      nArr.push(random(arr));
      let m = random(.5, 1) * (random(100) < 50 ? -1 : 1);
      nFreqArr.push(m);
    }

    beginShape();
    for (let x = 0; x <= width; x += 1) {
      let v = 1;
      for (let i = 0; i < nArr.length; i++) {
        v *= nArr[i](nFreqArr[i] * (y + x));
      }
      let yy = v * height / 5;
      vertex(x, y + yy);
    }
    vertex(width, 2 * height);
    vertex(0, 2 * height);
    endShape(CLOSE)

  }
  noLoop();
}