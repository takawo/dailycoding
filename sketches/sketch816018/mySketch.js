// way of drawing ellipse by dot is referred to @okazz_ awesome article.
// https://note.mu/outburst/n/n631a3845186c

let pallete = ["#1D3557", "#A8DADC", "#457B9D", "#F1FAEE", "#E63946", "#0A4BA0", "#045BE2"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  smooth();
  init();
}

function init() {
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(50000, bg);
}


function draw() {
  push();
  translate(width / 2, height / 2);
  let _w = sqrt(sq(width) + sq(height));
  rotate(int(random(4)) * 360 / 4 + 45);
  separateGrid(-_w / 2, -_w / 2, _w);
  pop();
  frameRate(1);
  image(bg, 0, 0);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 3));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
        
        let c1Num = int(random(pallete.length));
        let c2Num = int(random(pallete.length));
        while(c1Num == c2Num){
          c1Num = int(random(pallete.length));
          c2Num = int(random(pallete.length));
        }
        fill(pallete[c1Num]);
        noStroke();
        rect(i,j,w,w);
        let shapeNum = int(random(2));
        let direction = random(100) > 50 ? -1:1;
        let ax = i;
        let ay = j;
        let c =pallete[c2Num];
        switch (shapeNum) {
          case 0:
            drawGradientArc(ax, ay, w, 0, 90, c,direction);
            break;
          case 1:
            drawGradientCircle(ax, ay, w, c,direction);
            break;
        }
      }
    }
  }
}

// function mousePressed() {
//   init();
//   redraw();
// }

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 10);
    _graphics.ellipse(x, y, w, h);
  }
}


function drawGradientCircle(_x, _y, _diameter, _color, _direction) {
  push();
  translate(_x + _diameter / 2, _y + _diameter / 2);
  let radius = _diameter / 2;
  let count = _diameter * _diameter / sqrt(2); //点の数
  stroke(_color);
  for (let i = 0; i < count; i++) {
    let angle = random(360);
    //let r = sqrt(random(1));
    let r = 1 + random(random(random(random(1)))) * _direction;
    let x = r * radius * cos(angle);
    let y = r * radius * sin(angle);
    x = constrain(x, -radius, radius);
    y = constrain(y, -radius, radius);
    point(x, y);
  }
  pop();
}

function drawGradientArc(_centerX, _centerY, _diameter, startAngle, endAngle, _color, _direction) {
  push();
  translate(_centerX + _diameter / 2, _centerY + _diameter / 2);
  rotate(int(random(4)) * 90);
  translate(-_diameter / 2, -_diameter / 2);
  let radius = _diameter;
  let diff = abs(endAngle - startAngle) / 360;
  let count = _diameter * _diameter / sqrt(2) * diff; //点の数
  stroke(_color);
  noFill();
  for (let i = 0; i < count; i++) {
    let angle = random(startAngle, endAngle);
    // let r = sqrt(random(1));
    let r = 1 + random(random(random(random(1)))) * _direction;
    let x = r * radius * cos(angle);
    let y = r * radius * sin(angle);
    x = constrain(x, -radius, radius);
    y = constrain(y, -radius, radius);
    point(x, y);
  }
  pop();
}