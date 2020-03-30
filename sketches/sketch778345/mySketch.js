// noprotect
let img;
let cellMin = 5;
let cellMax = 20;

function preload() {
  let imgNum = int(random(10000));
  img = loadImage("https://loremflickr.com/800/800?random=" + imgNum);
}

function setup() {
  createCanvas(800, 800);
  blendMode(MULTIPLY);
  separateGrid(0, 0, width, img);
}

function separateGrid(x, y, d, img) {
  let sepNum = int(random(2, 6));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 10) {
        separateGrid(i, j, w,img);
      } else {
        let c = img.get(i+w/2,j+w/2);
        push();
        translate(i, j);
        image(img, 0, 0, w, w);
        noStroke();
        fill(red(c),green(c),blue(c),200);
        rect(0,0,w,w);
        pop();
      }
    }
  }
}