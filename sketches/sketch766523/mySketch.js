let url = "https://coolors.co/app/52489c-4062bb-59c3c3-ebebeb-f45b69";
let pallete;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.fill(0, 0, 100, 7);
    graphics.noStroke();
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  frameRate(.5);
  background(0, 0, 20);
  pallete = createPallete(url);

  let offset = width / 10;
  let margin = 0;

  let cells = int(random(3, 9));
  let d = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d + margin) + d / 2;
      let y = offset + j * (d + margin) + d / 2;
      push();
      translate(x, y);
      rotate(int(random(4)) * 360 / 4);
      drawGradientArc(-d / 2, -d / 2, d * 2, 0, 90, pallete.concat());
      pop();
    }
  }
  image(graphics, 0, 0);
}

function drawGradientArc(_x, _y, _d, angleA, angleB, colors) {
  push();
  translate(_x, _y);
  let angleMin = min(angleA, angleA);
  let angleMax = max(angleA, angleB);
  let cNum = int(random(colors.length));
  let c = colors[cNum];
  colors.splice(cNum, 1);

  let cANum = int(random(colors.length));
  let cA = colors[cANum];
  colors.splice(cANum, 1);

  let cBNum = int(random(colors.length));
  let cB = colors[cBNum];
  colors.splice(cBNum, 1);
  for (let angle = angleMin; angle <= angleMax; angle += .3) {
    let x = cos(angle) * _d / 2;
    let y = sin(angle) * _d / 2;
    colorMode(RGB);
    let cc = lerpColor(color(cA), color(cB), angle / abs(angleMax - angleMin));
    stroke(cc);
    line(x, y, 0, 0);
  }
  pop();
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