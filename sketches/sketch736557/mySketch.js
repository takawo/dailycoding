// I referred to @reona396's article to generate an array of emoji in this code.?
// http://blog.livedoor.jp/reona396/archives/55760887.html

let cells, cols, rows;
let offset, margin;
let w, h;
let emojiArr = [];
let noiseScaleX;
let noiseScaleY;
let noiseScale;
let noiseSeedValue;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
  emojiArr = createEmojiArr();
}

function createEmojiArr() {
  let arr = [];
  for (let i = 128512; i < 128592; i++) {
    arr.push(i);
  }
  for (let i = 127744; i < 128318; i++) {
    arr.push(i);
  }
  return arr;
}

function init() {
    cells = int((random(random())) * 10 + 3);
  cols = cells;
  rows = cells;
  offset = width / 15;
  margin = offset / int(random(2, 5));
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;
  noiseScaleX = random(10, 400);
  noiseScaleY = random(10, 400);
  noiseScale = random(150, 800);
}

function draw() {
  background(0, 0, 10);
  randomSeed(1000);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let cx = x + w / 2;
      let cy = y + h / 2;
      // rectMode(CENTER);
      // rect(cx, cy, w, h);
      for (let i = 1; i > 0; i -= 1 / int(random(3, 15))) {
        let n = noise(x / noiseScaleX, y / noiseScaleY, frameCount * 1.5 / noiseScale);
        let cn = int(map(n, 0, 1, 0, emojiArr.length));
        let emoji = String.fromCodePoint(emojiArr[cn]);
        push();
        translate(cx, cy);
        textAlign(CENTER, CENTER);
        scale(i);
        textSize(w/2);
        rotate(i * 10 * 3);
        text(emoji, 0, 0);
        // rectMode(CENTER);
        // rect(0,0,w,w);
        pop();
      }
    }
  }
  noLoop();
}