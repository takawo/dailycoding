let pallete = ["#030B45","#DCB15B","#E2656F","#CD9B98","#1840A4","#F5E39E"];
let rs;
let graphics, img;

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rs = int(random(10000));
  ortho(-width / 2, width / 2, height / 2, -height / 2, -1500, 1500);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < 50000; i++) {
    graphics.stroke(0, 0, 100, 15);
    graphics.point(random(width), random(height));
  }
  img = createImage(width, height);
  img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);
}

function draw() {
  randomSeed(rs + frameCount / 150);
  let colors = pallete.concat();

  let bgNum = int(random(colors.length));
  let bg = colors[bgNum];
  colors.splice(bgNum, 1);
  background(bg);
  let w = sqrt(sq(width) + sq(height));
  let cells = int(random(3, 10));
  let offset = width / 10;
  let margin = 0; //offset / 5;
  let cellW = (w + offset * 2 - margin * (cells - 1)) / cells;
  let cellH = (w + offset * 2 - margin * (cells - 1)) / cells;
  let sep = 6;
  push();
  //translate(width / 2, height / 2);
  rotate(45);

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -w / 2 + i * (cellW + margin);
      let y = -w / 2 + j * (cellH + margin);
      push();
      translate(x + cellW / 2, y + cellH / 2);
      rotate(int(random(4)) * 360 / 4);
      rectMode(CENTER);
      let angleA = int(random(1, 6 + 1)) / 6 * 360 / 6;
      let angleB = int(random(1, 6 + 1)) / 6 * 360 / 6;
      let freqA = int(random(1, 6 + 1)) / 3 * (random() > .5 ? -1 : 1);
      let freqB = int(random(1, 6 + 1)) / 3 * (random() > .5 ? -1 : 1);
      let n = map(sin(angleA + frameCount * freqA), -1, 1, 0, cellW);
      let m = map(sin(angleB + frameCount * freqB), -1, 1, 0, cellH);

      colors = shuffleArray(colors);
      noStroke();
      beginShape(TRIANGLE_FAN);
      fill(colors[0]);
      vertex(-cellW / 2, -cellH / 2);
      fill(colors[1]);
      vertex(-cellW / 2 + n, -cellH / 2);
      fill(colors[2]);

      vertex(-cellW / 2 + m, cellH / 2);
      fill(colors[3]);
      vertex(-cellW / 2, cellH / 2);
      fill(colors[0]);
      vertex(-cellW / 2, -cellH / 2);
      endShape(CLOSE);
      pop();
    }
  }
  pop();
  push();
  translate(0, 0, 100);
  texture(img);
  plane(w);
  pop();
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

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var r = floor(random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}