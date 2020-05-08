let img;
let w = 800;
let ns = 100;

function preload() {
  img = loadImage("https://loremflickr.com/" + w + "/" + w);
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  image(img,0,0);
  imageMode(CENTER);
  separateGrid(img, 0, 0, width);
  noLoop();
}


function separateGrid(img, x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      let n = noise(i / ns, j / ns, frameCount / ns);
      if (d> width / 5) {
        separateGrid(img, i, j, w);
      } else {
        let g = img.get(i, j, w, w);
        image(g, i + w / 2, j + w / 2);
        for (let ww = w; ww > 0; ww -= 1) {
          push();
          translate(i+w/2,j+w/2);
          // rotate(ww);
          image(g, 0,0, ww, ww);
          pop();
        }
      }
    }
  }
}