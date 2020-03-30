let pallete = ["#242935", "#F38591", "#FFCA60", "#E4E1E1", "#6D91CE"];

let cell_num;
let cols,rows;
const offset = 40;
const margin = offset / 3;

let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  cell_num = int(random(3,10));
  cols = cell_num;
  rows = cell_num;
  background(0, 0, 20);
  init();
  image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 5);
    _graphics.ellipse(x, y, w, h);
  }
}

function init() {

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  let pc1, c1;
  let pc2, c2;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let w = (width - offset * 2 - margin * (cols - 1)) / cols;
      let h = (height - offset * 2 - margin * (rows - 1)) / rows;
      let x = map(i, 0, cols, offset, width - offset) + w / 2;
      let y = map(j, 0, cols, offset, width - offset) + h / 2;

      c1 = int(random(pallete.length));
      while (c1 == pc1) {
        c1 = int(random(pallete.length));
      }
      c2 = c1;
      while (c2 == c1 || c2 == pc2) {
        c2 = int(random(pallete.length));
      }
      stroke(pallete[c1]);
      strokeWeight(map(cell_num, 3, 8, 5, 1));
      fill(pallete[c2]);
      rectMode(CENTER);
      rect(x, y, w, h);
      let points = [];
      points = createPoints(w, h);
      drawPoints(x, y, w, h, points, pallete[c1]);
      pc1 = c1;
      pc2 = c2;
    }
  }
}

function drawPoints(_x, _y, _w, _h, points, _c) {
  push();
  translate(_x, _y);
  rotate(int(random(4)) * 90);
  let noiseScale = 10;
  let n = noise(_x / noiseScale, _y / noiseScale);
  let step = 1 / sq(map(n, 0, 1, 0.5, 3.3));
  let freq = random(3, 5);
  for (let i = 0; i < points.length / 2; i += step) {
    let n = i;
    let m = points.length - i;
    let n_int = floor(n) % points.length;
    let n_float = n % 1;
    let n_next = (n_int + 1) % points.length;
    let m_int = (points.length - n_int) % points.length;
    let m_next = (points.length - n_next) % points.length;
    let m_float = n_float;

    let pA = points[n_int];
    let pB = points[n_next];
    let p1 = p5.Vector.lerp(pA, pB, n_float);

    let pC = points[m_int % points.length];
    let pD = points[m_next];
    let p2 = p5.Vector.lerp(pC, pD, m_float);


    //line(p1.x, p1.y, p2.x, p2.y);

    let angle = atan2(p1.y - p2.y, p1.x - p2.x);
    let distance = dist(p1.x, p1.y, p2.x, p2.y);
    push();
    let p3 = p5.Vector.lerp(p1, p2, 0.5);

    //translate(p3.x, p3.y);
    //rotate(angle);
    stroke(_c);
    strokeWeight(map(cell_num, 3, 8, 5, 1));
    noFill();
    beginShape();
    for (let o = -distance / 2; o < distance / 2; o += 5) {
      let ox = p3.x + sin(angle) * o;
      let oy = p3.y + cos(angle) * o + sin(o * freq) * distance / 10;
      //if(ox > 0 && ox < _w && oy >0 && oy <  _h){
      //} 
      if (ox > -_w / 2 && ox < _w / 2 && oy > -_h / 2 && oy < _h / 2) {
        vertex(ox, oy);
        // stroke(0,10,100);
        // point(ox,oy);
      }

    }
    endShape();
    pop()
    // fill(0, 0, 10);
    // ellipse(p1.x, p1.y, 3, 3);
    // ellipse(p2.x, p2.y, 3, 3);
  }
  pop();
}

function isInsidePoint(x, y, points) {
  let bool = true;
  for (let p of points) {

  }
  return bool;
}


function createPoints(_w, _h) {
  let arr = [];
  let p1 = createVector(-_w / 2, -_h / 2);
  arr.push(p1);
  let p2 = createVector(_w / 2, -_h / 2);
  arr.push(p2);
  let p3 = createVector(_w / 2, _h / 2);
  arr.push(p3);
  let p4 = createVector(-_w / 2, _h / 2);
  arr.push(p4);
  return arr;
}