let ratio = 0.98;
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    bg.fill(0, 0, random() > .5 ? 100 : 0, 5);
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }

}

function draw() {
  let layers = [];
  let pallete = ["#2F464F", "#D1B8A7", "#D89759", "#23608C", "#131113", "#689E9B", "#E84A22", "#FEFEFE"];
  let layer_num = pallete.length - 2;
  let w = sqrt(width * width + height * height);

  let colors = shuffleArr(pallete).concat();

  for (let i = 0; i < layer_num; i++) {
    let g = createGraphics(w, w);
    g.colorMode(HSB, 360, 100, 100, 100);
    g.angleMode(DEGREES);
    g.background(colors[i]);
    separateGrid(0, 0, w, g);
    layers.push(g);
  }

  background(pallete[pallete.length - 1]);
  for (let g of layers) {
    push();
    translate(width / 2, height / 2);
    rotate(45 + int(random(4)) * 360 / 4);
    imageMode(CENTER);
    image(g, 0, 0);
    pop();
  }
  imageMode(CORNER);
  image(bg, 0, 0);
  frameRate(.5);
}

function separateGrid(x, y, d, g) {
  let sepNum = int(random(1, 5));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 2) {
        separateGrid(i, j, w, g);
      } else {
        g.erase(255, 0);
        if (random(100) > 50) {
          g.ellipse(i + w / 2, j + w / 2, w * ratio, w * ratio);
        } else {
          g.rectMode(CENTER);
          g.rect(i + w / 2, j + w / 2, w * ratio, w * ratio, w * ratio / 15);
        }
				g.noErase();
				g.fill(g.get(1,1));
					g.textSize(w*ratio);
					g.textAlign(CENTER,CENTER);
					g.text("A",i+w/2,j+w/2);
      }
    }
  }
}

function shuffleArr(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}