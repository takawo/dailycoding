let img;
let yStep = 5;

function preload() {
  img = loadImage("20180526125455.jpg");
}

function setup() {
  createCanvas(img.width*2, img.height*2);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 100);
  for (let y = 0; y < img.height; y += yStep) {
    push();
    translate(0, y*2);
    beginShape();
    noFill();
    stroke(0.1);
    for (let x = 0; x < img.width; x += 1) {
      let c = img.get(x, y);
      let b = brightness(c);
      let phase = map(b, 0, 90, 2, 0);
      for (let step = x; step < x+1; step += 0.1) {
        x2 = x;
        y2 = sin(y+phase * step) * yStep;
        vertex(x2*2, y2);
      }
    }
    endShape();
    pop();
  }
}