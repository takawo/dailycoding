let graphics;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  
  
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  
  for (let i = 0; i < width * height * 15 / 100; i++) {
    if(random(100) > 50){
    graphics.fill(0, 0, 0, 10);
    }else{
    graphics.fill(0, 0, 100, 10);
    }
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }      
}

function draw(){
  
  background(20);

  let cells = int(random(3, 10));
  let cols = cells;
  let rows = cells;
  let offset = width / 10;
  let margin = 0;//offset / 5;

  let cellW = (width - offset * 2 - margin * (cells - 1)) / cells;


  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellW + margin);
      let dMax = cellW;
      if(random(100) > 50){
      let scaleFactor = dMax / (int(random(5,18))*5);
      drawFibonacciArc(x, y, dMax, 0, 90,scaleFactor);
      }else{
      separateRect(x,y,cellW,cellW);
      }
      
    }
  }
  
  image(graphics,0,0);
	frameRate(1);
}

function drawFibonacciArc(ox, oy, rMax, angleMin, angleMax,scaleFactor) {
  push();
  translate(ox + rMax / 2, oy + rMax / 2);
  rotate(int(random(4)) * 360 / 4);
  translate(-rMax / 2, -rMax / 2);
  noStroke();
  arc(0, 0, rMax * 2, rMax * 2, 0, 90);
  let i = 0;
  let phi = (sqrt(5) + 1) / 2;
  let x = 0;
  let y = 0;
  while (dist(x, y, 0, 0) < rMax-scaleFactor/2) {
    let angle = i * 360 / phi;
    let r = sqrt(i) * scaleFactor;
    x = cos(angle) * r;
    y = sin(angle) * r;
    strokeWeight(scaleFactor);
    stroke(0, 0, 20);
    let angle2 = atan2(y, x);
    if (angle2 > 0 && angle2 < 90) {
      point(x, y);
    }
    i++;
  }
  pop();
}


function separateRect(_x, _y, w, h) {
  push();
  translate(_x + w / 2, _y + h / 2);
  rotate(int(random(4)) * 360 / 4);
  let y = -h / 2;
  while (y < h / 2) {
    let yStep = h / int(random(1,25));
    let hStep = yStep * int(random(1, 4));
    if (y + hStep > h / 2) {
      hStep = h / 2 - y;
    }
    let x = -w / 2;
    while (x < w / 2) {
      let xStep = w / int(random(1, 25));
      let wStep = xStep * int(random(1, 4));
      if (x + wStep > w / 2) {
        wStep = w / 2 - x;
      }
      strokeWeight(0.1);
      fill(int(random(5)) * 255 / 5);
      rect(x, y, wStep, hStep);
      x += wStep;
    }
    y += hStep;
  }
  pop();
}