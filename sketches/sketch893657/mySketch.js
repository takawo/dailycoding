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
  background(0, 0, 90);

  let w = sqrt(width * width + height * height);

  push();
  translate(width / 2, height / 2);

  rotate(random(360));
  translate(-w / 2, -w / 2);

  let y = 0;
  while (y < w) {

    let yStep = random(w / 50, w / 5);
    let x = 0;
    let pc = -1;
    while (x < w) {
      let pallete = createPallete(random(url));
      let xStep = yStep;
      push();
      translate(x + xStep / 2, y + yStep / 2);
      rectMode(CENTER);
      drawingContext.shadowColor = color(0, 0, 10, 50);
      drawingContext.shadowBlur = min(xStep, yStep) / 5;
      noStroke();
      let num = int(random(15, 10));
      for (let i = num; i >= 0; i--) {
        let c = random(pallete);
        while (pc == c) c = random(pallete);
        fill(c);
        let ww = xStep * i / num;
        let hh = yStep * i / num;
        rotate((i - num) * 3);
        rect(0, 0, ww, hh);
        pc = c;
      }

      pop();
      x += xStep;
    }
    y += yStep;
  }

  pop();
  noLoop();
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