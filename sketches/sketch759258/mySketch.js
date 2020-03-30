let img;
let w = 800;
let tf;

function preload() {
  let n = int(random(1000));
  img = loadImage("https://loremflickr.com/" + w + "/" + w + "/?random=" + n);
}

function setup() {
  createCanvas(w, w);
  angleMode(DEGREES);
  tf = new Transformer();
  image(img,0,0);
  filter(GRAY);
  
  separateGrid(0, 0, w);
  image(img, w - w / 6, w - w / 6, w / 8, w / 8);

  for (let i = 0; i < width * height * 5 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let cw = random(3);
    let ch = random(3);
    noStroke();
    fill(255, 10);
    ellipse(x, y, cw, ch);
  }
  frameRate(1);
}


function separateGrid(x, y, d) {
  let sepNum = int(random(2, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 20) {
        separateGrid(i, j, w);
      } else {
        drawRandomShape(i + w / 2, j + w / 2, w);
      }
    }
  }
}

function drawRandomShape(x, y, d) {
  tf.push();
  tf.translate(x, y);
  let angle = int(random(4)) * 360 / 4;
  rotate(angle);
  let shape = int(random(9));
  let bc = img.get(int(tf.x), int(tf.y));
  rectMode(CENTER);
  fill(bc);
  noStroke();
  switch (shape) {
    case 0:
      rectMode(CORNER);
      rect(-d / 2, -d / 2, d, d / 2);
      arc(d / 2, 0, d, d, 90, 180, PIE);
      break;
    case 1:
      rectMode(CORNER);
      rect(-d / 2, -d / 2, d, d / 2);
      break;
    case 2:
      triangle(-d / 2, -d / 2, d / 2, -d / 2, -d / 2, d / 2);
      break;
    case 3:
      arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90, PIE);
      break;
    case 4:
      rectMode(CORNER);
      rect(-d / 2, 0, d, d / 2);
      triangle(0, 0, -d / 2, 0, 0, -d / 2);
      break;
    case 5:
      triangle(0, 0, -d / 2, d / 2, 0, d / 2);
      triangle(0, 0, 0, -d / 2, d / 2, -d / 2);
      break;
    case 6:
      rectMode(CORNER);
      rect(0, 0, d / 2, d / 2);
      triangle(0, 0, d / 2, -d / 2, d / 2, 0);
      break;
    case 7:
      triangle(-d / 2, -d / 2, 0, -d / 2, -d / 2, 0);
      triangle(d / 2, d / 2, 0, d / 2, d / 2, 0);
      break;
    case 8:
      rectMode(CORNER);
      rect(-d / 2, -d / 2, d / 2, d / 2);
      rect(0, 0, d / 2, d / 2);
      break;
  }
  tf.pop();
}