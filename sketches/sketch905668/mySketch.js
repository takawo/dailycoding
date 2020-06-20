let url = "https://coolors.co/ffbe0b-fb5607-ff006e-8338ec-3a86ff";
let pallete;
let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  pallete = createPallete(url);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);

  texture.stroke(0, 0, 0, 3);
  for (let i = 0; i < width * height * 1 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let angle = 60 + random(30) * (random(100) > 50 ? -1 : 1);
    let d = width / 20;
    texture.line(x + cos(angle) * d, y + sin(angle) * d,
      x + cos(angle + 180) * d, y + sin(angle + 180) * d);

  }
}

function draw() {
  background(random(pallete));
  drawArc(width / 2, height / 2, width);
  blendMode(BURN);
  image(texture,0,0);
  noLoop();
}

function drawArc(x, y, d) {

  let colors = shuffle(pallete.concat());

  push();
  translate(x, y);
  rotate(int(random(4)) * 360 / 4);
  drawingContext.shadowColor = color(0, 0, 0, 50);
  drawingContext.shadowBlur = d / 10;

  let gradient = drawingContext.createLinearGradient(-d / 2, -d / 2 + d, 0, -d / 2, -d / 2 + d, d);
  gradient.addColorStop(0.0, colors[0]);
  gradient.addColorStop(1.0, colors[1]);

  drawingContext.strokeStyle = gradient;

  strokeWeight(d * 2 / 3);
  noFill();
  arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90);
  pop();
  if (d > 50) {
    drawArc(x + d / 2, y, d / 2);
    drawArc(x - d / 2, y, d / 2);
    drawArc(x, y + d / 2, d / 2);
    drawArc(x, y - d / 2, d / 2);
  }
}


function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}