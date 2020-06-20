// color pallete
//https://coolors.co/03045e-0077b6-00b4d8-90e0ef-caf0f8

let pallete = ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"];
let texture;
let waves;
let rs;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  waves = [sin, cos];
  rs = random(10000);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);
  texture.stroke(0, 0, 100, 3);

  for (let i = 0; i < width * height * 1 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let angle = -90 + random(5) * (random(100) > 50 ? -1 : 1);
    let len = random(width / 20, width / 10);
    texture.push();
    texture.translate(x, y);
    texture.rotate(angle);
    texture.line(len / 2, 0, -len / 2, 0);
    texture.pop();
  }
}

function draw() {
  background(0, 0, 20);
  randomSeed(rs);
  let offset = width / 10;
  let prev_col = -1;
  for (let y = -offset; y < height + offset; y += height / 25) {
    let col = random(pallete);
    while (prev_col == col) {
      col = random(pallete);
    }
    prev_col = col;
    let waves_num = int(random(3, 7));
    let waves_arr = [];
    let freq_arr = [];
    let dir_arr = [];
    let r = height / 10;

    drawingContext.shadowColor = color(col + hex(150, 2));
    drawingContext.shadowBlur = height / 20;

    for (let i = 0; i < waves_num; i++) {
      waves_arr.push(random(waves));
      freq_arr.push(random(1));
      dir_arr.push(random(100) > 50 ? -1 : 1);
    }
    noStroke();
    fill(col);
    push();
    beginShape();
    for (let x = -offset; x < width + offset; x += 1) {
      let yy = 1;
      for (let i = 0; i < waves_arr.length; i++) {
        yy *= waves_arr[i](freq_arr[i] * x + frameCount * dir_arr[i]);
      }
      yy *= r;
      yy += y;
      vertex(x, yy);
    }
    vertex(width + offset, height + offset);
    vertex(0, height + offset);
    endShape(CLOSE);
    pop();
  }
  // image(texture, 0, 0);
}