// let url = "https://coolors.co/app/52489c-4062bb-59c3c3-ebebeb-f45b69";
let pallete = ["#F2C7A7","#F46F40","#DE1E0F","#0684CF","#090909","#4D261F","#D7BC9F"];
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
  let pallete_copy = pallete.concat();
  let bgNum = int(random(pallete_copy.length));
  let bg = pallete_copy[bgNum];
  pallete_copy.splice(bgNum,1);
  background(bg);
  
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
      drawGradientArc(-d / 2, -d / 2, d * 2, 0, 90, pallete_copy.concat());
      pop();
    }
  }
  image(graphics, 0, 0);
  frameRate(.5);
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

  let step = 1 / int(random(3, 8));
  for (let angle = angleMin; angle <= angleMax; angle += 1 / 3) {
    let x = cos(angle) * _d / 2;
    let y = sin(angle) * _d / 2;
    colorMode(RGB);
    let cc = lerpColor(color(cA), color(cB), angle / abs(angleMax - angleMin));

    let n = 0;
    while (n <= 1 - step) {
      let px1 = lerp(0, x, n);
      let py1 = lerp(0, y, n);
      let px2 = lerp(0, x, n + step);
      let py2 = lerp(0, y, n + step);
      stroke(lerpColor(color(c), color(cc), n));
      line(px1, py1, px2, py2);
      n += step;
    }
  }
  pop();
  //noLoop();
}