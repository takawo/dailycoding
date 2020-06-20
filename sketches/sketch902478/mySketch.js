let glitch;
let img;
let ns = 100;

function preload() {
  img = loadImage("https://loremflickr.com/800/800");
}

function setup() {
  createCanvas(800, 800);
  glitch = new Glitch();
}

function draw() {
  image(img,0,0);
  push();
  separateGrid(0, 0, 800);
  pop();
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 5));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      let n = noise(i / ns, j / ns, frameCount / ns);
      if (n > 0.5 && d > width / 10) {
        separateGrid(i, j, w);
      } else {
        glitch.resetBytes();
        switch (int(random(3))) {
          case 0:
            glitch.loadType("image/jpg");
            break;
          case 1:
            glitch.loadType("image/png");
            break;
          case 2:
            glitch.loadType("image/webp");
            break;
        }
        glitch.loadImage(img.get(i, j, w, w));
        glitch.randomBytes(int(random(1, 15)));
        glitch.buildImage(function() {
          drawingContext.shadowColor = color(0, 100);
          drawingContext.shadowBlur = w / 2;
          image(glitch.image, i, j, w, w);
        });
      }
    }
  }
}