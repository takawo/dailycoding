let imageA;
let imageB;
let canvasW = 800;
let canvasH = 400;
let offset = canvasW / 10;
let imageNum = 2;
let imageW = (canvasW - offset * imageNum * 2) / imageNum;
let imageH = imageW;

function preload() {
  imageA = loadImage("https://loremflickr.com/" + imageW + "/" + imageH + "/dog");
  imageB = loadImage("https://loremflickr.com/" + imageW + "/" + imageH + "/paris");
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
  image(imageA, 0, offset);
  image(imageB, width / 2 + offset * 2, offset);

  for (let y = offset; y < offset + imageA.height; y++) {
    let x1 = imageA.width;
    let y1 = y;
    let p1 = createVector(x1, y1);
    let c1 = color(imageA.get(imageA.width - 1, y - offset));
    let x2 = width - imageB.width;
    let y2 = y;
    let p2 = createVector(x2, y2);
    let c2 = color(imageB.get(1, y - offset));
    colorMode(RGB);
    let distance = dist(x1, y1, x2, y2);
    for (let nx = 0; nx < distance; nx += 1) {
      let ratio = nx / distance;
      let p = p5.Vector.lerp(p1, p2, ratio);
      let c = lerpColor(c1, c2, ratio);
      stroke(c);
      point(p.x, p.y);
    }
  }
  colorMode(HSB,360,100,100,100);
  noFill();
  stroke(0, 0, 100,50);
  rect(0, offset, imageA.width, imageA.height);
  rect(width / 2 + offset * 2, offset, imageB.width, imageB.height);
  noLoop();
}