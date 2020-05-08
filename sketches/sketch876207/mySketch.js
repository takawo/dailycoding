// fork from reona396's awesome sketch
// https://www.openprocessing.org/sketch/876207
let emoji_peace = "✌";
let emoji_face = "😛";
let tSize = 200;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 95);

  for (let angle = 0; angle < 360; angle += random(1, 3)) {
    let x = width/2 + cos(angle) * random(width/3,width/4);
    let y = height/2 + sin(angle) * random(height/3,height/4);
    fill(0,0,30);
    noStroke();
    arc(x,y,width,height,angle,angle + random(.1,1),PIE);
  }
  
  push();
  translate(width / 2, height / 2);
  translate(0, tSize / 5);
  textSize(tSize);
  textAlign(CENTER, CENTER);

  push();
  translate(-width / 5, 0);
  rotate(-30);
  text(emoji_peace, 0, 0);
  pop();

  push();
  translate(+width / 5, 0);
  rotate(30);
  scale(-1, 1);
  text(emoji_peace, 0, 0);
  pop();

  push();
  textSize(tSize * 1.3);
  text(emoji_face, 0, -100);
  pop();

  pop();
  noLoop();
}