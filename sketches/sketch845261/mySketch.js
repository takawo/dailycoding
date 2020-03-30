let cells, offset, margin, d;
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallete;
let bg;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  init();

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

  pallete = createPallete(url);
}

function init() {
  cells = int(random(3, 5));
  offset = width / 10;
  margin = offset / 5;
  d = (width - offset * 2 - margin * (cells - 1)) / cells;

}

function draw() {
  background(20);
  drawShape();
  randomSeed(0);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d + margin)+d/2;
      let y = offset + j * (d + margin)+d/2;
      let rs = random(1000);
      let arr = (pallete.concat());
      randomSeed(rs);
      drawShape(x, y, d / 2,rs,arr);
    }
  }
  image(bg,0,0);
  //noLoop();
}


function drawShape(x, y, rMax,rs,colors) {
  let rSep = int(random(2,6));
  let rStep = rMax / rSep;
  for (let r = rMax; r > 0; r -= rStep) {
    let num = int(random(2, 5));
    let numArr = [];
    let numSum = 0;
    push();
    translate(x, y);
    rotate(360 * noise(r, frameCount / 300)+random(360));
    for (let i = 0; i < num; i++) {
      let n = map(pow(sin(frameCount + i * 90),3), -1, 1, 0, 1) * noise(r / 10, i, frameCount / 150);
      numArr.push(n);
      numSum += n;
    }
    let angleSum = 0;
    for (let i = 0; i < num; i++) {
    let nn = map(1-sq(numArr[i]),0,1,-1,1);
      let angle = map(numArr[i] / numSum, 0, 1, 0, 360);
      fill(colors[(rSep+i)%colors.length]);
      beginShape();
      for (let j = angleSum; j < angleSum + angle; j += 1) {
        vertex(cos(j) * r, sin(j) * r);
      }
      for (let j = angleSum + angle; j > angleSum; j -= 1) {
        vertex(cos(j) * (r - rStep / 2)*nn, sin(j) * (r - rStep / 2)*nn);
      }
      endShape(CLOSE);


      angleSum += angle;
    }
    pop();
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