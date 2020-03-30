let g;
let fonts = [];
let kanji = "";
let pallete = ["#0A0309", "#EBE6EA", "#ECA456", "#548495", "#A5ADB6", "#E3171D", "#BE343C", "#0A0309"];
let hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

function preload() {
  fonts.push(loadFont("NotoSansJP-Regular.otf"));
  fonts.push(loadFont("NotoSansJP-Black.otf"));
  fonts.push(loadFont("NotoSansJP-Thin.otf"));
}

function setup() {
  createCanvas(800, 800);
  
  // for(let i = 131364; i < 131364 + 9; i++){
  //   kanji += (String.fromCharCode(hex(i,6))); 
  // }
  
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

function draw() {
  let font = random(fonts);
  let colors = pallete.concat();
  let bgNum = int(random(colors.length));
  bg = colors[bgNum];
  colors.splice(bgNum, 1);
  background(bg);
  let tsize = width * 0.75;
  let strNum = int(random(hiragana.length));
  let str = hiragana.substr(strNum, 1);
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
  noStroke();
  text(str, 0, 0);
  let f = 0;
  let c1 = color(random(colors));
  let c2 = color(random(colors));
  while (c1 == c2) {
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
    let step = int(random(1, 5)) / 25;
    for (let x2 = 0; x2 < distance; x2 += 3) {
      colorMode(RGB, 255, 255, 255, 255);
      let angle2 = f * 30;
      let c = lerpColor(c1, c2, angle2 % 360 / 360);
      noStroke();
      fill(red(c), green(c), blue(c), 50);
      let y2 = sin(angle2) * tsize / 50;
      if (distance < tsize / 10) {
        ellipse(x2, y2, y2 * 2, y2 * 2);
      }
      if (angle2 % 360 == 0) {
        c1 = c2;
        while (c1 == c2) {
          c2 = color(random(colors));
        }
      }
    }
    pop();
    f += step;
  }
  pop();
  frameRate(1);
  image(g, 0, 0);
}