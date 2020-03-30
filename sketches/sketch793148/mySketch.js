let graphics;
let pallete = ["#030B45", "#DCB15B", "#E2656F", "#CD9B98", "#1840A4", "#F5E39E"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  let percent = 15 / 100;
  let radius = sqrt(sq(width / 2) + sq(height / 2));
  for (let i = 0; i < width * height * percent; i++) {
    let angle = random(360);
    let r = 1 - (random(random(1)));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    graphics.fill(0, 0, 100, 8);
    graphics.noStroke();
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  let bgNum = int(random(pallete.length));
  background(pallete[bgNum]);
  pallete.splice(bgNum,1); 
  separateGrid(0, 0, width,pallete);
  image(graphics, 0, 0);
  frameRate(1);
}

function separateGrid(x, y, d,colors) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        let cx = i + w / 2;
        let cy = j + w / 2;
        let repeat = int(random(1, 4));
        push();
        translate(cx, cy);
        rotate(int(random(4)) * 360 / 4);
        let d = w / 2;
        drawRandomShape(d, pallete);
        pop();
      }

    }
  }
  noLoop();
}


function drawRandomShape(d, colors) {
  let n = int(random(3));
  let sw = d * 2 / 20
  strokeWeight(sw);
  strokeCap(ROUND);
  noFill();
  switch (n) {
    case 0:
      stroke(random(colors));
      arc(-d, -d, d * 2, d * 2, 0, 90);
      stroke(random(colors));
      arc(d, d, d * 2, d * 2, 180, 270);
      stroke(random(colors));
      strokeWeight(sw * 3);
      stroke(random(colors));
      point(-d, 0);
      stroke(random(colors));
      point(0, -d);  
      stroke(random(colors));
      point(0, d);
      stroke(random(colors));
      point(d, 0);  
      break;
    case 1:
      stroke(random(colors));
      arc(-d, -d, d * 4, d * 4, 0, 90);
      strokeWeight(sw * 3);
      stroke(random(colors));
      point(d, -d);
      stroke(random(colors));
      point(-d, d);
      break;
    case 2:
      stroke(random(colors));
      strokeWeight(sw * 3);
      point(0, 0);
      break;
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