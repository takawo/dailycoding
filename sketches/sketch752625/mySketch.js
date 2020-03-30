let pallete = ["#C1B8A8", "#110B46", "#E21905", "#1D3F2E", "#C84B14", "#838E66", "#F7F6F4"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let bgNum = int(random(pallete.length));
  background(pallete[bgNum]);
  pallete.splice(bgNum, 1);


  let ppNum = int(random(pallete.length));
  let pp = pallete[ppNum];
  pallete.splice(ppNum, 1);

  let w = sqrt(sq(width) + sq(height))
  for (let i = 0; i < width * height * 25 / 100; i++) {
    let len = (1 - random(random(random()))) * w / 2;
    let angle = random(360);
    stroke(pp + hex(128, 2));
    let x = width / 2 + cos(angle) * len;
    let y = height / 2 + sin(angle) * len;
    point(x, y);
  }
  let cells = int(random(3, 18));
  let offset = width / 10;
  let margin = 0; //offset / 8;
  let cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;

  let cNum = int(random(pallete.length));
  let c = pallete[cNum];
  pallete.splice(cNum, 1);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + (cellSize + margin) * i;
      let y = offset + (cellSize + margin) * j;
      randomShapes(x + cellSize / 2, y + cellSize / 2, cellSize, cellSize, c);
    }
  }
  let pNum = int(random(pallete.length));
  let p = pallete[pNum];
  pallete.splice(pNum, 1);

  for (let i = 0; i < width * height * 20 / 100; i++) {
    stroke(p + hex(15, 2));
    let x = random(width);
    let y = random(height);
    point(x, y);
  }
}

function randomShapes(_cx, _cy, _w, _h, _color) {
  let rotate_num = int(random(4));
  if (rotate_num % 2 == 1) {
    let temp = _w;
    _w = _h;
    _h = temp;
  }
  push();
  translate(_cx, _cy);
  rotate(rotate_num * 360 / 4);

  let shapeNum = int(random(5));

  switch (shapeNum) {
    case 0:
      rectMode(CORNER);
      fill(_color);
      noStroke();
      rect(-_w / 2, -_h / 2, _w / 4, _h);
      rect(_w / 2, _h / 2, -_w / 4, -_h);
      stroke(_color);
      noFill();
      line(0, -_h / 2, 0, _h / 2);
      break;
    case 1:
      fill(_color);
      noStroke();
      triangle(-_w / 2, -_h / 2, 0, -_h / 2, -_w / 2, 0);
      triangle(_w / 2, _h / 2, 0, _h / 2, _w / 2, 0);
      stroke(_color);
      noFill();
      line(_w / 2, -_h / 2, -_w / 2, _h / 2);
      break;
    case 2:
      fill(_color);
      noStroke();
      arc(-_w / 2, -_h / 2, _w, _h, 0, 90);
      arc(_w / 2, _h / 2, _w, _h, 180, 270);
      stroke(_color);
      noFill();
      arc(-_w / 2, -_h / 2, _w * 3 / 2, _h * 3 / 2, 0, 90);
      break;
    case 3:
      rectMode(CORNER);
      fill(_color);
      noStroke();
      rect(-_w / 2, -_h / 2, _w / 2, _h);
      stroke(_color);
      noFill();
      line(_w / 2, -_h / 2, _w / 2, _h / 2);
      break;
    case 4:
      rectMode(CENTER);
      fill(_color);
      noStroke();
      rect(0, 0, _w / 4, _h);
      stroke(_color);
      noFill();
      line(-_w / 2, -_h / 2, 0, -_h / 2);
      line(_w / 2, _h / 2, 0, _h / 2);
      break;
    case 5:
      break;
    case 6:
      break;
  }
  pop();
}