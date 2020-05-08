// reference: sasakishun's @nuhsikasas awesome graphic work.
// https://twitter.com/nuhsikasas/status/1245022403840770049 

let pallete = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];
let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  texture = createGraphics(width, height);
  texture.stroke(255, 10 / 100 * 255);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    texture.strokeWeight(random(3));
    texture.point(random(width),
      random(height));
  }

}

function draw() {
  background(0, 0, 90);
  let offset = width / 10;
  push();
  translate(offset, offset);
  let w = width - offset * 2;
  let h = height - offset * 2;
  let xSep = 10;
  let ySep = 10;
  let x = 0;
  let y = 0;
  let xStep, yStep;
  let d = min(w, h) / 20;
  while (y < h) {
    yStep = h / ySep * int(2 + random(random()) * 5);
    x = 0;
    if (y + yStep > h) yStep = h - y;
    while (x < w) {
      xStep = w / xSep * int(1 + random(random()) * 5);
      if (x + xStep > w) xStep = w - x;
      push();
      translate(x, y);

      push();
      fill(0, 0, 0);
      drawingContext.shadowColor = color(0, 0, 0, 50);
      drawingContext.shadowBlur = d / 2;
      circle(d / 2, yStep - d / 2, d);
      circle(xStep - d / 2, yStep - d / 2, d);
      pop();


      let c = random(pallete);
      push();
      fill(c);
      drawingContext.shadowColor = color(c);
      drawingContext.shadowBlur = d / 2;
      noStroke();
      rect(0, yStep - d * 2, d, d, d, 0, 0, 0);
      if (yStep == h / ySep) {
        rect(d, 0, xStep - d, yStep - d);

      } else {
        rect(d, 0, xStep - d, yStep - d, d, 0, 0, 0);

      }
      pop();
      pop();
      x += xStep;
    }
    y += yStep;
  }
  pop();
  image(texture, 0, 0);
  noLoop();
}