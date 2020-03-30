let imgs = [];
let num = 26;
let count = 0;

function preload() {
  for (let i = 0; i < num; i++) {
    imgs.push(loadImage(i + ".png"));
  }
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  push();
  translate(width / 2, height / 2);
  let s = tan(frameCount % 90);
  let d = 100 * s;
  rotate(frameCount);
  noFill();
  imageMode(CENTER);
  scale(s);
  image(imgs[count], 0, 0);
  pop();
  if (frameCount % 90 == 0) {
    count++;
    count %= num;
  }
}