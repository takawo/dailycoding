let img;
let img2;

function preload() {
  let img_num = int(random(1000));
  img = loadImage("https://loremflickr.com/800/800/");
  img2 = loadImage("https://loremflickr.com/800/800/?random=" + img_num);
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  let cells = int(random(2, 5));
  let offset = width / 10;
  let cellSize = (width - offset * 2) / cells;

  image(img2, 0, 0);
  background(255, 0, 0, 150);

  let graphics = createGraphics(width, height);
  graphics.angleMode(DEGREES);

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + cellSize * i;
      let y = offset + cellSize * j;

      let rotate_num = int(random(4)) * 360 / 4;

      x = x + cellSize / 2;
      y = y + cellSize / 2;

      graphics.push();
      graphics.translate(x, y);
      graphics.rotate(rotate_num);
      graphics.rectMode(CENTER);

      let cells2 = int(random(2, 5));
      let cellSize2 = cellSize / cells2;

      for (let jj = 0; jj < cells2; jj++) {
        for (let ii = 0; ii < cells2; ii++) {
          let xx = -cellSize / 2 + ii * cellSize2;
          let yy = -cellSize / 2 + jj * cellSize2;
          // rectMode(CORNER);
          // rect(xx,yy,cellSize2,cellSize2);
          let rotate_num2 = int(random(4)) * 360 / 4;

          graphics.push();
          graphics.translate(xx + cellSize2 / 2, yy + cellSize2 / 2);
          graphics.rotate(rotate_num2);
          if (random(100) < 50) {
            graphics.fill(20);
            graphics.triangle(-cellSize2 / 2, -cellSize2 / 2,
              cellSize2 / 2, -cellSize2 / 2,
              -cellSize2 / 2, cellSize2 / 2);
          } else {
            graphics.fill(20);
            graphics.arc(-cellSize2 / 2, -cellSize2 / 2, cellSize2 * 2, cellSize2 * 2, 0, 90);
          }
          graphics.pop();

        }
      }
      graphics.pop();
    }
  }
  img.mask(graphics);
  image(img, 0, 0);
  //image(graphics,0,0);
}