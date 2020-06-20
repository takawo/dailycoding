let imgs = [];
let glitch, typeCounter = 0;
let cells = 5;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  glitch = new Glitch();
}

function draw() {
  background(0, 0, 95);

  let offset = width / 20;
  let margin = offset / 5;
  let cellSize = int((width - offset * 2 - margin * (cells - 1)) / cells);

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let n = i + j * cells;
      let x = offset + i * (cellSize + margin);
      let y = offset + j * (cellSize + margin);
      loadImage("https://loremflickr.com/" + cellSize + "/" + cellSize + "?random=" + n, function(im) {
        glitch.resetBytes();
        glitch.loadType("image/jpeg");
        glitch.loadImage(im);
        glitch.replaceHex('ffdb00430001', 'ffdb004300ff');
        // glitch.limitBytes(0);
        glitch.buildImage(function() {
          image(glitch.image, x, y, cellSize, cellSize);
          switch (int(random(4))) {
            case 0:
              image(im.get(0, 0, cellSize / 2, cellSize), x, y);
              break;
            case 1:
              image(im.get(0, 0, cellSize, cellSize / 2), x, y);
              break;
            case 2:
              image(im.get(0, cellSize / 2, cellSize, cellSize / 2), x, y + cellSize / 2);
              break;
            case 3:
              image(im.get(cellSize / 2, 0, cellSize / 2, cellSize), x + cellSize / 2, y);
              break;
          }
        });
      })


    }
  }

  noLoop();
}