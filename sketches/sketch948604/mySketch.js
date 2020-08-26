let url = "https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590";
let palette;
let g;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  palette = createPalette(url);
  g = createGraphics(width / 4, height / 4);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.angleMode(DEGREES);

  drawingContext.imageSmoothingEnabled = false;

}

function draw() {
  background(220);
  randomSeed(frameCount / 100);

  g.clear();
  g.push();
  g.translate(g.width / 2, g.height / 2);
  g.rotate(45);
  let w = sqrt(sq(g.width) + sq(g.height));
  g.translate(-w / 2, -w / 2);
  // noStroke();

  let num = 5;
  let d = w / num;
  let lineLength = d / 3;
  g.drawingContext.setLineDash([lineLength]);
  g.strokeWeight(d / 30);
  g.strokeCap(SQUARE);
  g.strokeJoin(ROUND);
  // drawingContext.shadowColor = color(0, 0, 0, 50);
  // drawingContext.shadowBlur = d / 100;
  g.noFill();
  // drawingContext.shadowOffsetX = cos(frameCount * 3) * d / 10;
  // drawingContext.shadowOffsetY = sin(frameCount * 3) * d / 10;

  for (let j = 0; j < num; j++) {
    for (let i = 0; i < num; i++) {
      let r = d;
      let s = r * 0.95;
      let x = i * (r * sin(60)) * 2;
      let y = j * (r + r * cos(60));
      g.push();
      g.translate(x, y);
      g.rotate(-30);
      let sep = 10;
      for (let i = sep; i > 0; i--) {
        let n = int(noise(x, y, (i * 10 + frameCount) / 50) * palette.length + 1);
        // fill(palette[int(x + n + i) % palette.length]);
        g.drawingContext.lineDashOffset = (map(i, sep, 0, lineLength * 2, 0) + frameCount) % (lineLength * 2);

        let t = s * i / sep;
        g.beginShape();
        for (let angle = 0; angle < 360; angle += 360 / 3) {
          g.vertex(cos(angle) * t, sin(angle) * t);
        }
        g.endShape(CLOSE);
      }
      g.pop();
      let x2 = x + cos(30) * r;
      let y2 = y + sin(30) * r;
      g.push();
      g.translate(x2, y2);
      g.rotate(-30 + 180);
      for (let i = sep; i > 0; i--) {
        let t = s * i / sep;

        let n = int(noise(x2, y2, (i * 10 + frameCount) / 50) * palette.length + 1);
        // fill(palette[int(x2 + n + i) % palette.length]);
        g.drawingContext.lineDashOffset = (map(i, sep, 0, lineLength * 2, 0) + frameCount) % (lineLength * 2);

        g.beginShape();
        for (let angle = 0; angle < 360; angle += 360 / 3) {
          vertex(cos(angle) * t, sin(angle) * t);
        }
        g.endShape(CLOSE);
      }
      g.pop();
    }
  }
  g.pop();
  // image(g,0,0);

  push();
  translate(width / 2, height / 2);
  rotate(45);
  let v = sqrt(width * width + height * height);
  translate(-v / 2, -v / 2);
  separateGrid(0, 0, v);
  pop();
  // noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && w > width / 3) {
        separateGrid(i, j, w);
      } else {
        push();
        translate(i + w / 2, j + w / 2);
        rotate(int(random(4)) * 360 / 4);
        imageMode(CENTER);
        // drawingContext.shadowColor = color(0, 0, 0, 33);
        // drawingContext.shadowBlur = w / 10;
        // drawingContext.shadowOffsetX = w / 20;
        // drawingContext.shadowOffsetY = w / 20;
        image(g, 0, 0, w, w);
        pop();
      }
    }
  }
}

function createPalette(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = color('#' + arr[i]);
  }
  return arr;
}