let graphics;
let cells, cols, rows;
let offset, margin;
let w, h;
let emojiArr = [];
let emoji;
let emojiIndex;
let x, y;
let noiseX, noiseY, noiseScaleX, noiseScaleY;

function setup() {
  createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  emojiArr = createEmojiArr();
  emojiIndex = int(random(emojiArr.length));
  emoji = emojiArr[emojiIndex];

  noiseX = 1 / random(100, 400);
  noiseY = 1 / random(100, 400);
  noiseScaleX = 1 / random(100, 400);
  noiseScaleY = 1 / random(100, 400);
}

function draw() {
  if (frameCount % 100 == 0) {
    emojiIndex += 10;
    emojiIndex %= emojiArr.length;
    emoji = emojiArr[emojiIndex];
    noiseX = 1 / random(100, 400);
    noiseY = 1 / random(100, 400);
    noiseScaleX = 1 / random(100, 400);
    noiseScaleY = 1 / random(100, 400);
  }
  x = width / 2 + map(noise(noiseX, frameCount * noiseScaleX), 0, 1, -width*0.7, width*0.7);
  y = height / 2 + map(noise(noiseY, frameCount * noiseScaleY), 0, 1, -height*0.7, height*0.7);
  push();
  translate(x, y);
  textSize(width / 8);
  textAlign(CENTER, CENTER);
  scale(map(frameCount%100,0,99,1,0));
  shearX(cos(frameCount * 0.35) / 5);
  shearY(sin(frameCount * 0.7) / 5);
  text(emoji, 0, 0);
  pop();
  //frameRate(1);
  //noLoop();

}

function createEmojiArr() {
  let arr = [];
  let emoji;
  for (let i = 128512; i < 128592; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  for (let i = 127744; i < 128318; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  return arr;
}