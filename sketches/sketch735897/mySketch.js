let imgs = [];
let graphics = [];
let w = 800;
let h = 800;
let margin, offset;
let cellW, cellH;
let cells, cols, rows;

function preload() {
  cells = int(random(2, 5))
  cols = cells;
  rows = cells;

  offset = w / int(random(10, 15));
  margin = offset / int(random(2, 4));

  cellW = int((w - offset * 2 - margin * (cols - 1)) / cols);
  cellH = int((w - offset * 2 - margin * (cols - 1)) / cols);

  let n = 0;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      imgs.push(loadImage("https://loremflickr.com/" + cellW + "/" + cellH + "/?random=" + (10000 + n)));
      n++;
      graphics.push(createGraphics(cellW, cellH));
    }
  }
}

function setup() {
  createCanvas(w, h);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let i = 0;
  for (let g of graphics) {
    g.colorMode(HSB, 360, 100, 100, 100);
    let n = int(random(3, 8));
    g.beginShape();
    for (let angle = 0; angle < 360; angle += 360 / n) {
      let x = g.width / 2 + cos(angle) * g.width / 2;
      let y = g.height / 2 + sin(angle) * g.height / 2;
      vertex(x, y);
    }
    //
    g.endShape(CLOSE);
    imgs[i].mask(g);
    i++;
  }

}

function draw() {
  background(0,0,10);
  let n = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      let step = 1 / (int(random(2, 5)) * int(random(3, 5)));
      for (let s = 1; s > 0; s -= step) {
        push();
        translate(x + imgs[n].width / 2, y + imgs[n].height / 2);
        rotate(map(s,0,0.1,0,45));
        scale(s);
        imageMode(CENTER);
        image(imgs[n], 0, 0);
        pop();
      }
      n++;
    }
  }
  noLoop();
}