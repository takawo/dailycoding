let count = 0;
let w;
let angle = 0;
let graphics;
let pallete = ["#153197", "#B0AEC0", "#232555", "#E37736", "#1F03ED", "#FCFCFD", "#02011D", "#09A0F7"];
let rs;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  pixelDensity(1);
  angleMode(DEGREES);
  w = sqrt(width * width + height * height);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 10 / 100; i++) {
    graphics.fill(0, 0, random(100) > 50 ? 20 : 80, 5);
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }
  rs = random(10000);
}

function draw() {
  randomSeed(rs);
  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 2 + 45);
  separateGrid(-w / 2 - 1, -w / 2 - 1, w + 2, w + 2, 8, pallete.concat());
  pop();
  count += 0.05;
  image(graphics, 0, 0);
}

function separateGrid(x, y, w, h, depth, colors) {
  colors = shuffleArr(colors);
  let direction = random(100) > 50 ? -1 : 1;
  if (depth > 0) {
    let n = map(sin((x * y / 3333) + frameCount / 3) * cos((w * h) / 33333 + frameCount / 2), -1, 1, 0, 1);
    push();
    translate(x + w / 2, y + h / 2);
    noStroke();
    if (random(100) > 50) {
      fill(colors[0]);
      triangle(-w / 2, -h / 2, w / 2, -h / 2, 0, 0);
      fill(colors[1]);
      triangle(w / 2, h / 2, w / 2, -h / 2, 0, 0);
      fill(colors[2]);
      triangle(w / 2, h / 2, -w / 2, h / 2, 0, 0);
      fill(colors[3]);
      triangle(-w / 2, -h / 2, -w / 2, h / 2, 0, 0);
    } else {
      fill(colors[0]);
      triangle(-w / 2, -h / 2, w / 2, -h / 2, w / 2, h / 2);
      fill(colors[1]);
      triangle(-w / 2, h / 2, w / 2, h / 2, -w / 2, -h / 2);
    }
    pop();
    if (depth % 2 == 1) {
      separateGrid(x, y, w * n, h, depth - 1, pallete.concat());
      separateGrid(x + w * n, y, w - w * n, h, depth - 1, pallete.concat());
    } else {
      separateGrid(x, y, w, h * n, depth - 1, pallete.concat());
      separateGrid(x, y + h * n, w, h - h * n, depth - 1, pallete.concat());
    }
  }
}

function shuffleArr(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}