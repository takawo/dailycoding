let pallete;
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  pallete = createPallete(url);
}

function draw() {
  clear();
  push();
  blendMode(SCREEN);
  separateGrid(0, 0, width);
  pop();
  frameRate(0.5);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if ((random(100) < 90 && d > width / 10 )|| d > width*0.9) {
        separateGrid(i, j, w);
      } else {
        let c1 = random(pallete);
        let c2 = random(pallete);
        while (c1 == c2) {
          c1 = random(pallete);
        }
        fill(c1);
        noStroke();
        drawingContext.shadowColor = c2;
        drawingContext.shadowBlur = w;
        rect(i + w / 10, j + w / 10, w - w / 10 * 2, w - w / 10 * 2, w);
      }
    }
  }
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