let graphics;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let freq = 4;
let t = "A";
let font;

function preload(){
  font = loadFont("Lato-BoldItalic.ttf");
}


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

}

function draw() {
  background(220);

  graphics = createGraphics(width, height);
  graphics.angleMode(DEGREES);
  graphics.textSize(width * 2 / 3);
  graphics.textFont(font);
  graphics.textAlign(CENTER, CENTER);
  graphics.push();
  graphics.translate(width/2,height/2);
  graphics.rotate(frameCount);
  graphics.text(t, 0,-height/9);
  graphics.pop();

  let d = map(sin(frameCount * freq), -1, 1, 0, 50);
  let imgTop = graphics.get(0, 0, graphics.width, graphics.height / 2);
  let imgBottom = graphics.get(0, graphics.height / 2, graphics.width, graphics.height / 2);
  let imgMiddle = graphics.get(0, graphics.height / 2, graphics.width, 1);
  imageMode(CORNER);
  image(imgTop, 0, -d);
  image(imgMiddle, 0, imgTop.height - d, imgMiddle.width, d * 2);
  image(imgBottom, 0, height / 2 + d);
  if (frameCount * freq % 180 == 0) {
    let snum = int(random(str.length));
    t = str[snum];
    graphics.clear();
    graphics.text(t, width / 2, height / 2);
  }
}