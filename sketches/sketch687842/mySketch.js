let pallete = ["#CF7882", "#DCA7A1", "#CFBAFB", "#52B2BE", "#443850", "9D6FFC"];
let cell_num = 4;
const cols = cell_num;
const rows = cell_num;
const offset = 40;
const margin = offset/2;

function setup() {
  createCanvas(900, 900);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  blendMode(DARKEST);

  background("#FDFBEE");
  //backgroundNoise(10000);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {

      let w = (width - offset * 2 - margin * (cols - 1)) / cols;
      let h = (height - offset * 2 - margin * (rows - 1)) / rows;
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);

      drawCircleInRect(x + w / 2, y + h / 2, w / 2, h / 2);
      drawOnNoise(x, y, w, h, map(cell_num, 1, 10, 3000, 150));
    }
  }
}

function drawOnNoise(_x, _y, _w, _h, _n) {
  for (let i = 0; i < _n; i++) {
    let x = _x + random(0, _w);
    let y = _y + random(0, _h);
    let w = random(0.1, 1);
    let h = random(0.1, 1);
    noStroke();
    fill(pallete[i % pallete.length]+"66");
    ellipse(x, y, w, h);
  }
}


function drawCircleInRect(x, y, w, h) {

  let i = int(random(pallete.length));

  i = setFillAndStroke(i);
  rect(x - w, y - h, w, h);
  i = setFillAndStroke(i);
  rect(x + w, y - h, -w, h);
  i = setFillAndStroke(i);
  rect(x + w, y + h, -w, -h);
  i = setFillAndStroke(i);
  rect(x - w, y + h, w, -h);

  push();
  translate(x, y);
  let r = w;
  while (r > 10) {
    for (let angle = 0; angle < 360; angle += 90) {
      i = setFillAndStroke(i);
      arc(0, 0, r * 2, r * 2, angle, angle + 90, PIE);
    }
    rotate(45);
    rectMode(CENTER);
    let d = sqrt(sq(r) + sq(r));
    i = setFillAndStroke(i);
    rect(-d / 4, -d / 4, d / 2, d / 2);
    i = setFillAndStroke(i);
    rect(d / 4, -d / 4, d / 2, d / 2);
    i = setFillAndStroke(i);
    rect(d / 4, d / 4, d / 2, d / 2);
    i = setFillAndStroke(i);
    rect(-d / 4, d / 4, d / 2, d / 2);
    r = d / 2;
  }
  pop();
}

function backgroundNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 3);
    let h = random(1, 3);
    noStroke();
    fill(30, 50, 10, 5);
    ellipse(x, y, w, h);
  }
}


function setFillAndStroke(_n) {
  fill(pallete[_n] + "99");
  stroke(random(360), 80, 30);
  strokeWeight(0.2);
  let n = (_n + int(random(1, 2))) % pallete.length;
  return n;
}