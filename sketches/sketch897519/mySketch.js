//reference: @okazz_'s awesome sketch.
//https://www.openprocessing.org/sketch/895105
let url = [
  "https://coolors.co/f4f1de-e07a5f-3d405b-81b29a-f2cc8f",
  "https://coolors.co/086788-07a0c3-f0c808-fff1d0-dd1c1a",
  "https://coolors.co/ffffff-84dcc6-a5ffd6-ffa69e-ff686b",
  "https://coolors.co/2b2d42-8d99ae-edf2f4-ef233c-d90429",
  "https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c",
  "https://coolors.co/cfdbd5-e8eddf-f5cb5c-242423-333533",
  "https://coolors.co/083d77-ebebd3-f4d35e-ee964b-f95738",
  "https://coolors.co/f72585-7209b7-3a0ca3-4361ee-4cc9f0",
  "https://coolors.co/3d5a80-98c1d9-e0fbfc-ee6c4d-293241",
  "https://coolors.co/ffbe0b-fb5607-ff006e-8338ec-3a86ff"
];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 95);

  let cells = int(random(3, 8));
  let offset = width / 15;
  let margin = offset / 5;

  let d = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d + margin) + d / 2;
      let y = offset + j * (d + margin) + d / 2;
      let palette = createPallete(random(url));

      drawFlower(x, y, d / 2, shuffle(palette.concat()));
    }

  }


  noLoop();
}

function drawFlower(x, y, s, colors) {
  let ang = random(360);
  let seg = int(random(3, 10)) * 2;
  let len = s * 0.66;
  let aa = 360 / seg;
  let rnd = int(random(2));


  // curveDetail(1);
  curveTightness(1.3);
  noStroke();
  push();
  translate(x, y);
  drawingContext.shadowColor = color(colors[colors.length - 1]);
  drawingContext.shadowBlur = s / 4;
  let n = 0;
  for (let i = 0; i < 360; i += aa) {
    let theta = aa * 0.45;
    if (n % 2 == 0) {
      fill(colors[0]);
    } else {
      fill(colors[1]);
    }
    rotate(aa);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(len * cos(theta), len * sin(theta));
    curveVertex(len * 1.5, 0);
    curveVertex(len * cos(-theta), len * sin(-theta));
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    n++;
  }

  let ss = s * 0.3;
  fill(colors[2]);
  ellipse(0, 0, ss, ss);
  fill(colors[3]);
  ellipse(0, 0, ss * 0.7, ss * 0.7);
  pop();
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