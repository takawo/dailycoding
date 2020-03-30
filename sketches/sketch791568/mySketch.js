let graphics;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let step = 2;
let angle = 1.5;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(60);
}

function draw() {
  randomSeed(frameCount*step/100);
  let str = alphabet.substr(int(random(alphabet.length)),1);
  graphics = createGraphics(800, 800);
  graphics.angleMode(DEGREES);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.textSize(graphics.width /1.5);
  graphics.textAlign(CENTER, CENTER);
  graphics.push();
  graphics.translate(graphics.width / 2, graphics.height / 2);
  graphics.push();
  graphics.rotate(angle);
  graphics.fill(0,0,100);
  graphics.text(str, 0,0);
  graphics.pop();
  graphics.push();
  graphics.rotate(-angle);
  graphics.fill(0,0,0);
  graphics.text(str, 0,0);
  graphics.pop();
  graphics.push();
  graphics.rotate(0);
  graphics.fill(0,0,50);
  graphics.text(str, 0,0);
  graphics.pop();

  background(0, 0, frameCount*step %100);
  imageMode(CENTER);
  image(graphics, width/2, height/2);
}