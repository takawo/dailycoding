let pallete = ["#4F857B", "#E2D8B3", "#016557", "#B9450E", "#554520", "#111710", "#C8A54B"];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 15 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.fill(0, 0, 100, 3);
    graphics.noStroke();
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  //blendMode(BLEND);
  background(0, 0, 20);
  //blendMode(DIFFERENCE);
  let wMax = sqrt(sq(width) + sq(height));
  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 360 / 4);
  separateGrid(-wMax / 2, -wMax / 2, wMax);
  pop();
  blendMode(BLEND);
  image(graphics, 0, 0);
  frameRate(.5);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 3));
  let ww = d / sepNum;
  for (let i = x; i < x + d - 1; i += ww) {
    for (let j = y; j < y + d - 1; j += ww) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, ww);
      } else {
        let dd = sqrt(sq(ww)+sq(ww))*2;
        push();
        translate(i+ww/2,j+ww/2);
        rotate(int(random(4)) * 360/4);
        fill(random(pallete));
        noStroke();
        arc(-ww/2,-ww/2,dd*2/3,dd*2/3,0,90);
        rotate(180);
        fill(random(pallete));
        noStroke();
        arc(-ww/2,-ww/2,dd*1/3,dd*1/3,0,90);
        pop();
      }
    }
  }
}