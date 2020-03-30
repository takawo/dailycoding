let url = "https://coolors.co/app/3e6990-aabd8c-101d42-eb4b98-2708a0";
let pallete = [];
let _d = 400;
let rs;
let sep = 8;
let cells;
let offset;
let cellSize;

let graphics;
let img;

function setup() {
  createCanvas(800, 800, WEBGL);
  angleMode(DEGREES);
  blendMode(ADD);
  colorMode(HSB, 360, 100, 100, 100);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -500, 1500);

  rs = random(1000);
  pallete = createPallete(url);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < 50000; i++) {
    graphics.stroke(0, 0, 100, 5);
    graphics.point(random(width), random(height));
  }
  img = createImage(width, height);
  img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);

}

function draw() {
  rotate(45);
  noStroke();
  background(0, 0, 10);
  randomSeed(rs + frameCount / 90);
  cells = int(random(3, 10));
  offset = width / 10;
  let w = sqrt(sq(width) + sq(height));
  cellSize = (w + offset * 2) / cells;
  orbitControl();

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -w / 2 - offset + i * cellSize;
      let y = -w / 2 - offset + j * cellSize;
      drawShape(x + cellSize / 2, y + cellSize / 2, cellSize / 2);
    }
  }

  push();
  translate(0, 0, -100);
  texture(img);
  plane(w);
  pop();
}

function drawShape(x, y, d) {
  push();
  translate(x, y);
  rotateX(int(random(sep)) * 360 / sep + frameCount / 5);
  rotateY(int(random(sep)) * 360 / sep + frameCount / 4);
  rotateZ(int(random(sep)) * 360 / sep + frameCount / 3);

  push();
  translate(0, 0, -d / 2);
  rotateZ(1 * 90);
  whichColor(pallete);
  whichShape(d);
  pop();

  push();
  translate(0, 0, d / 2);
  rotateZ(3 * 90);
  whichColor(pallete);
  whichShape(d);
  pop();


  push();
  translate(0, -d / 2, 0);
  rotateX(1 * 90);
  whichColor(pallete);
  whichShape(d);
  pop();

  push();
  translate(0, d / 2, 0);
  rotateX(3 * 90);
  whichColor(pallete);
  whichShape(d);
  pop();

  push();
  translate(d / 2, 0, 0);
  rotateY(1 * 90);
  whichColor(pallete);
  whichShape(d);
  pop();

  push();
  translate(-d / 2, 0, 0);
  rotateY(3 * 90);
  whichColor(pallete);
  whichShape();
  pop();
  pop();
}

function whichColor(colors) {
  let c = random(colors) + "66";
  if (random(100) < 50) {
    fill(c);
    noStroke();
  } else {
    noFill();
    stroke(c);
    //strokeWeight(cellSize/50);
  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}

function whichShape(d) {
  let n = int(random(2));
  if (n == 0) {
    arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90);
  } else {
    triangle(-d / 2, -d / 2, d / 2, -d / 2, -d / 2, d / 2);
  }
}