//reference: Julien Espagnon's awesome penplotter works!
//https://twitter.com/Julien_Espagnon/status/1239654399741493248

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 10);

  let offset = -min(height / 10, width / 10);

  for (let i = 0; i < 25; i++) {

    let d1 = random(5,25);
    let x1 = random(offset + d1 / 2, width - offset - d1 / 2);
    let y1 = random(offset + d1 / 2, height - offset - d1 / 2);
    let d2 = random(50,150);
    let angle = random(360);
    let x2 = x1 + cos(angle)*width/2;
    let y2 = y1 + sin(angle)*width/2;

    let hue = random(360);
    c1 = color(hue, 100, 100);
    c2 = color((hue + 180) % 360, 80, 100);

    drawEllipseLine(x1, y1, d1, c1, x2, y2, d2, c2);
  }
  // push();
  // fill(0, 0, 100);
  // drawingContext.shadowColor = color(0, 0, 0, 100);
  // drawingContext.shadowBlur = 50;
  // textSize(100);
  // textAlign(RIGHT, BOTTOM);
  // textFont("Sen");
  // text("Creative Coding 2020: Day2", width * 0.9, height - 50);
  // pop();
  noLoop();
}

function mousePressed() {
  redraw();
}


function drawEllipseLine(x1, y1, d1, c1, x2, y2, d2, c2) {
  let distance = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let d = d1;

  push();

  drawingContext.shadowColor = color(0, 0, 100,20);
  drawingContext.shadowBlur = min(height, width)/20;

  translate(x1, y1);
  rotate(angle);
  noStroke();
  
    let gradient = drawingContext.createLinearGradient(-d1/2, 0, distance+d2/2, 0);

    gradient.addColorStop(0.0, c1);
    gradient.addColorStop(random(0.3,0.7), lerpColor(c1,c2,0.5));
    gradient.addColorStop(1.0, c2);
    //上で指定したグラデーション内容を塗りつぶしスタイルに代入する
    drawingContext.fillStyle = gradient;  
  
  
  for(let n = 1; n > 0; n -= 1/10){
  beginShape();
    let dd1 = d1 * n;
    let dd2 = d2 * n
  for (let angle = 90; angle < 270; angle++) {
    vertex(cos(angle) * dd1 / 2, sin(angle) * dd1 / 2);
  }
  for (let angle = 270; angle < 360 + 90; angle++) {
    vertex(distance + cos(angle) * dd2 / 2, sin(angle) * dd2 / 2);
  }
    
  endShape(CLOSE);
  }

  for (let n = 0; n < 1; n += 1 / 2) {
    colorMode(RGB);
    let c = lerpColor(c1, c2, n);
    colorMode(HSB);
    let x = n * distance;
    let d = d1 + (d2 - d1) * n;
    fill(c);
    noStroke();
    // ellipse(x, 0, d);
  }
  // line(0,0,distance,0);
  pop();
}