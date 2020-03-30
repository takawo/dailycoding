let font;
let g;

let pallete = ["#E8E7E7", "#C6B1BA", "#020202", "#EF9DC4", "#FD9404", "#577345", "#553B40"];

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function preload() {
  font = loadFont("Lato-Black.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  g = createGraphics(width, height);
  g.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 5 / 100; i++) {
    g.fill(0, 0, 100, 7);
    g.noStroke();
    g.ellipse(
      random(width),
      random(height),
      random(1, 3),
      random(1, 3)
    );
  }
}
function draw(){
  let colors = pallete.concat();
  let bgNum = int(random(colors.length));
  bg = colors[bgNum];
  colors.splice(bgNum, 1);
  background(bg);
  let tsize = width * 0.9;
  let strNum = int(random(alphabet.length));
  let str = alphabet.substr(strNum,1);
  let points = font.textToPoints(str, 0, 0, tsize, {
    sampleFactor: .5,
    simplifyThreshold: 0
  });
  let bound = font.textBounds(str, 0, 0, tsize);
  push();
  translate(width / 2, height / 2);
  let cx = -(bound.x + bound.w) / 2;
  let cy = bound.h / 2;
  translate(cx, cy);

  textSize(tsize);
  textFont(font);
  fill(0, 0, 0, 50);
  text(str, 0, 0);
  let f = 0;
    let c1 = color(random(colors));
    let c2 = color(random(colors));
    while(c1 == c2){
      c2 = color(random(colors));
    }
  for (let i = 0; i < points.length - 1; i++) {
    let current = points[i];
    let next = points[i + 1];
    let distance = dist(current.x, current.y,
      next.x, next.y);
    let angle = atan2(next.y - current.y, next.x - current.x);
    push();
    translate(current.x, current.y);
    rotate(angle);
    let step = int(random(1, 5)) / 35;
    for (let x2 = 0; x2 < distance; x2 += 1) {
      colorMode(RGB,255,255,255,255);
      let c = lerpColor(c1,c2,x2/distance);
      stroke(255,20);
      fill(red(c),green(c),blue(c),30);
      let y2 = sin(f * 30) * tsize / 30;
      if (distance < tsize / 10) {
        ellipse(x2, y2, y2 * 2, y2 * 2);
      }
    }
    pop();
    f += step;
  }
  pop();
  frameRate(1);
  image(g, 0, 0);
}