let cells = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(220);
  init();
}

function init() {
  let offset = width / 10;
  let w = width - offset * 2;
  let h = height - offset * 2;
  push();
  translate(offset, offset);
  recursiveRect(0, 0, w, h, 10);
  pop();
}

