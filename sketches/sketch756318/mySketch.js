let url = "https://coolors.co/app/e2302d-510048-000028-e25b53-044472";
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
  blendMode(SUBTRACT);
  colorMode(HSB, 360, 100, 100, 100);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -500, 1500);

  rs = random(1000);
  pallete = createPallete(url);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < 50000; i++) {
    graphics.stroke(0, 0, 100, 7);
    graphics.point(random(width), random(height));
  }
  img = createImage(width, height);
  img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);

}

function draw() {
  rotate(45);
  noStroke();
  background(0, 0, 90);
  randomSeed(rs + frameCount / 45);
  cells = int(random(3, 15));
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
  whichShape(d);
  pop();

  push();
  translate(0, 0, d / 2);
  rotateZ(3 * 90);
  whichShape(d);
  pop();


  push();
  translate(0, -d / 2, 0);
  rotateX(1 * 90);
  whichShape(d);
  pop();

  push();
  translate(0, d / 2, 0);
  rotateX(3 * 90);
  whichShape(d);
  pop();

  push();
  translate(d / 2, 0, 0);
  rotateY(1 * 90);
  whichShape(d);
  pop();

  push();
  translate(-d / 2, 0, 0);
  rotateY(3 * 90);
  whichShape(d);
  pop();
  pop();
}

function whichColor(colors) {
  let c = random(colors) + "CC";
  let color_num = int(random(3));
  if (color_num == 0) {
    fill(c);
    noStroke();
  }else if (color_num == 1) {
    noFill();
    stroke(c);
  }else if (color_num == 2) {
    fill(c);
    let sc = c;
    while(c == sc){
      sc = random(colors) + "CC";
    }
    stroke(sc);
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
  let shape = int(random(9));
  switch (shape) {
    case 0:
      rectMode(CORNER);
   whichColor(pallete);
     rect(-d / 2, -d / 2, d, d / 2);
  whichColor(pallete);
      arc(d / 2, 0, d, d, 90, 180, PIE);
      break;
    case 1:
      rectMode(CORNER);
  whichColor(pallete);
      rect(-d / 2, -d / 2, d, d / 2);
      break;
    case 2:
  whichColor(pallete);
      triangle(-d / 2, -d / 2, d / 2, -d / 2, -d / 2, d / 2);
      break;
    case 3:
  whichColor(pallete);
      arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90, PIE);
      break;
    case 4:
      rectMode(CORNER);
  whichColor(pallete);
      rect(-d / 2, 0, d, d / 2);
  whichColor(pallete);
      triangle(0, 0, -d / 2, 0, 0, -d / 2);
      break;
    case 5:
  whichColor(pallete);
      triangle(0, 0, -d / 2, d / 2, 0, d / 2);
  whichColor(pallete);
      triangle(0, 0, 0, -d / 2, d / 2, -d / 2);
      break;
    case 6:
      rectMode(CORNER);
  whichColor(pallete);
      rect(0, 0, d / 2, d / 2);
  whichColor(pallete);
      triangle(0, 0, d / 2, -d / 2, d / 2, 0);
      break;
    case 7:
  whichColor(pallete);
      triangle(-d / 2, -d / 2, 0, -d / 2, -d / 2, 0);
  whichColor(pallete);
      triangle(d / 2, d / 2, 0, d / 2, d / 2, 0);
      break;
    case 8:
      rectMode(CORNER);
  whichColor(pallete);
      rect(-d / 2, -d / 2, d / 2, d / 2);
  whichColor(pallete);
      rect(0, 0, d / 2, d / 2);
      break;
  }
}