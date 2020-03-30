const cols = 8;
const rows = 8;
const offset = 40;
const ratio = 0.85;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

function draw() {
  background("#e91a75");


  const w = (width - offset * 2) / cols;
  const h = (height - offset * 2) / rows;
  for (let j = 0; j < rows; j++) {
    let x = offset;
    // for (let i = 0; i < cols; i++) {
    while (x < width - offset) {
      let y = map(j, 0, rows, offset, height - offset);
      push();
      translate(x, y);
      let n = floor(random(9));
      stroke("#02f882");
      fill("#02f882");
      if (random(100) < 80) {
        switch (n) {
          case 0:
            break;
          case 1:
            //上
            triangle(0, 0, w, 0, w / 2, h / 2);
            break;
          case 2:
            //右
            triangle(w, 0, w, h, w / 2, h / 2);
            break;
          case 3:
            //下
            triangle(w, h, 0, h, w / 2, h / 2);
            break;
          case 4:
            //左
            triangle(0, 0, 0, h, w / 2, h / 2);
            break;
          case 5:
            //上
            triangle(0, 0, w, 0, w / 2, h / 2);
            //下
            triangle(w, h, 0, h, w / 2, h / 2);
            break;
          case 6:
            //右
            triangle(w, 0, w, h, w / 2, h / 2);
            //左
            triangle(0, 0, 0, h, w / 2, h / 2);
            break;
          case 7:
            //上
            triangle(0, 0, w, 0, w / 2, h / 2);
            //左
            triangle(0, 0, 0, h, w / 2, h / 2);
            break;
          case 8:
            //下
            triangle(w, h, 0, h, w / 2, h / 2);
            //右
            triangle(w, 0, w, h, w / 2, h / 2);
            break;
        }
      } else {
        ellipse(w / 2, h / 2, w * ratio, h * ratio);
        switch (n) {
          case 0:
            break;
          case 1:
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 0);
            break;
          case 2:
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 90);
            break;
          case 3:
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 180);
            break;
          case 4:
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 270);
            break;
          case 5:
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 0);
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 180);
            break;
          case 6:
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 90);
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 270);
            break;
          case 7:
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 0);
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 270);
            break;
          case 8:
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 90);
            drawRectinCircle(w / 2, h / 2, w / 2 * ratio, h / 2 * ratio, 180);
            break;
        }
      }
      pop();
      x += w;

    }
  }
  noLoop();
}

function mousePressed() {
  redraw();
}

function drawRectinCircle(_x, _y, _w, _h, _a) {
  push();
  translate(_x, _y);
  rotate(_a);
  rect(0, 0, _w, _h);
  pop();
}