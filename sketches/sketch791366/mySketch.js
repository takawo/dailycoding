let bg;
let pallete;
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let cells, cols, rows;
let offset, margin;
let cellW, cellH;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  pallete = createPallete(url);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 5);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }
}

function draw() {
  background(0,0,20);

  cells = int(random(2, 10));
  cols = cells;
  rows = cells;
  offset = width / 10;
  margin = 0; // offset / 5;

  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellH + margin);
      let cx = x + cellW / 2;
      let cy = y + cellH / 2;
      let repeat = int(random(1, 4));
      for (let m = 0; m < repeat; m++) {
        push();
        translate(cx, cy);
        rotate(int(random(4)) * 360 / 4);
        let r = cellW * 1 / 2;
        int(random(3, 10)) / 9;
        drawBezier(-cellW / 2, -cellH / 2, cellW / 2, cellH / 2, r);
        pop();
      }
    }
  }
  image(bg,0,0);
  noLoop();
}

function keyPressed(){
	redraw();
}


function drawBezier(x1, y1, x4, y4, r) {
  let x2 = x1 + cos(0) * r;
  let y2 = y1 + sin(0) * r;
  let x3 = x4 + cos(180 + 0) * r;
  let y3 = y4 + sin(180 + 0) * r;
  let c = random(pallete);
  noStroke();
  fill(c);
  //bezier(x1,y1,x2,y2,x3,y3,x4,y4);
  beginShape();
  vertex(x1, y1);
  bezierVertex(x2, y2, x3, y3, x4, y4);
  vertex(x4, y1);
  endShape(CLOSE);
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