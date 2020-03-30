//inspired from this great tutorial. https://www.youtube.com/watch?v=ZI1dmHv3MeM
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let time;
let rs;
let pc;
let pallete;
let url = "https://coolors.co/app/e6056b-3a3335-f0544f-fdf0d5-c6d8d3";
let bg;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  init();
}

function init() {
  cells = int(random(2,6));
  cols = cells;
  rows = cells;
  offset = width / int(random(10, 20));
  margin = offset / 5;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;
  rs = int(random(100000));
  time = 0;
  pallete = createPallete(url);
  let n = int(random(pallete.length));
  bg = pallete[n];
  pallete.splice(n, 1);
}

function draw() {
  background(bg);
  randomSeed(rs);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = map(j, 0, cols - 1, offset, width - offset - cellW);
      let y = map(i, 0, rows - 1, offset, height - offset - cellH);
      push();
      translate(x + cellW / 2, y + cellH / 2);
      let xOffset = x / int(random(5, 150));
      let yOffset = y / int(random(5, 150));
      let ringNum = int(random(5, 10));
      let step = int(random(30, 60));
      let angle = atan2(y-height/2,x-width/2);
      for (let k = 0; k < ringNum; k++) {
        let d = map(k, 0, ringNum, cellW / 2, 0);
        let c = random(pallete);
        while (c == pc) {
          c = random(pallete);
        }
        fill(c);
        noStroke();
        push();
        translate(cos(angle) * (cellW/2 - d),sin(angle) * (cellW/2 - d));
        rotate(angle);
        drawNoisyEllipse(xOffset, yOffset, d, step);
        pc = c;
        pop();
      }
      pop();
    }
  }
  time += 1 / 100;
}

function drawNoisyEllipse(_xOffset, _yOffset, _d, _step) {
  beginShape();
  let noiseMax = 0.55;
  for (let angle = 0; angle < 360; angle += 360 / _step) {
    let xoff = map(cos(angle + _xOffset), -1, 1, 0, noiseMax);
    let yoff = map(sin(angle + _yOffset), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, time), 0, 1, _d - _d / 2, _d);
    let x = r * cos(angle)+cos(frameCount*3+_d*1) * _d/3;
    let y = r * sin(angle)+sin(frameCount*2+_d*1) * _d/3;
    vertex(x, y);
  }
  endShape(CLOSE);
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