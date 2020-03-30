let pallete = ["#8C5245", "#BF8F73", "#F2AC57", "#273940", "#1F3140"];
const cols = 4;
const rows = 4;
const offset = 40;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 90);

  for (let i = 0; i < 100000; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(1, 3);
    let h = random(1, 3);
    fill(0, 0, 0, 1);
    noStroke();
    ellipse(x, y, w, h);
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, width - offset);
      let w = (width - offset * 2) / cols;
      let h = (height - offset * 2) / rows;
      drawContinuousArc(x, y, w / 2, h / 2);
    }
  }
  blendMode(ADD);
  for (let i = 0; i < 100000; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(1, 3);
    let h = random(1, 3);
    fill(0, 0, 100, 1);
    noStroke();
    ellipse(x, y, w, h);
  }
  noLoop();
}

function drawContinuousArc(_x, _y, _w, _h) {
  push();
  translate(_x + _w, _y + _h);
	let sAngle = random(360);
  let rMax = sqrt(sq(_w / 2) + sq(_h / 2));
  let pn = 0;
  let angleMax = floor(random(1, 5)) * 360;
  let angleStep = constrain(angleMax / floor(random(5, 20)), 15, 90);
  let angle = 0;
  let i = 0;
  while (angle < angleMax) {
    let nextAngle = random(1, 3) * angleStep;
    let r = max(map(angle, 0, angleMax, rMax, 0), rMax / 10);
    let n = floor(map(sin(angle + i * 30), -1, 1, 0, pallete.length));
    while (pn == n) {
      n = floor(random(pallete.length));
    }
    push();
    if (angle < 360) {
      fill(0, 0, 0, 50);
      let shadow_offset = map(angle, 0, 360, _w / 10, 1);
      noStroke();
      arc(shadow_offset, shadow_offset, r * 2, r * 2, sAngle + angle, sAngle + angle + nextAngle, PIE);

    }
    noStroke();
    fill(pallete[n]);
    arc(0, 0, r * 2, r * 2, sAngle+ angle, sAngle+ angle + nextAngle, PIE);
    pop();
    angle += nextAngle;
    i++;
  }
  pop();
}