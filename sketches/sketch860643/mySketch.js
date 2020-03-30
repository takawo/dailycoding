let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);
  graphics.noStroke();
  for (let i = 0; i < width * height * 5 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let angle = random(360);
    let w = random(3);
    let h = random(3);
    random(100) > 50 ? graphics.fill(0, 0, 100, 15) : graphics.fill(0, 0, 0, 15);
    graphics.push();
    graphics.translate(x,y);
    graphics.rotate(angle);
    graphics.ellipse(0,0, w, h);
    graphics.pop();
  }
}

function draw() {
  background(0, 0, 15);
	
	
  let cells = int(random(3, 8));
  let cols = int(cells*1.5);
  let rows =cells;
  let offset = width / 10;
  let margin = offset / 4;

  let w = (width - offset * 2 - margin * (cols - 1)) / cols;
  let h = (height - offset * 2 - margin * (rows - 1)) / rows;

  // let d = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (w + margin);
      let y = offset + j * (h + margin);
      // rect(x, y, w, h);
      let points = getPoints(x, y, w, h, int(random(1, 4))+1);
      // for(let p of points){
      //   ellipse(p.x,p.y,10);
      // }
      let p1 = random(points);
      let num = int((1 - random(random())) * 10+3);
      for (let k = 0; k < num; k++) {
        let p2 = random(points);
        if (p1.equals(p2)) {
          p2 = random(points);
        }
        let sep1 = int(random(8, 18));
        let sep2 = sep1 * 4;
          drawEllipseLine(p1.x, p1.y, p2.x, p2.y, w / sep1, w / sep2, color(0, 0, 90));
        p1 = p2.copy();
      }
    }
  }
  image(graphics, 0, 0);
  // noLoop();
  frameRate(0.5);
}

function getPoints(x, y, w, h, num = 2) {
  let arr = [];
  for (let j = 0; j <= 1; j += 1 / (num)) {
    for (let i = 0; i <= 1; i += 1 / (num)) {
      let xx = x + i * w;
      let yy = y + j * h;
      arr.push(createVector(xx, yy));
    }
  }
  return arr;
}


function drawEllipseLine(x1, y1, x2, y2, d1, d2, c1 = color(0, 0, 0)) {
  let distance = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let d = d1;

  push();

  drawingContext.shadowColor = color(0, 0, 100);
  drawingContext.shadowBlur = max(d1, d2)*2;

  translate(x1, y1);
  rotate(angle);
  noStroke();
  fill(c1);
  beginShape();
  for (let angle = 90; angle < 270; angle++) {
    vertex(cos(angle) * d1 / 2, sin(angle) * d1 / 2);
  }
  for (let angle = 270; angle < 360 + 90; angle++) {
    vertex(distance + cos(angle) * d2 / 2, sin(angle) * d2 / 2);
  }

  endShape(CLOSE);

  pop();
}