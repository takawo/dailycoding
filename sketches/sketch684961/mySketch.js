const rows = 6;
const cols = 6;
const offset = 40;
const offset_cell = offset / 4;
const t = 50;
let pallete;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noLoop();
  pallete = [color(338, 66, 85, t), color(267, 100, 54, t), color(177, 68, 72, t), color(62, 100, 100, t), color(25, 98, 100, t), ];
}

function draw() {
  background(0, 0,80,100);
  blendMode(BURN);
  let w = (width - offset * 2) / cols;
  let h = (height - offset * 2) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);

      push();
      translate(x + offset_cell, y + offset_cell);
      stroke(0, 0, 100, 10);
      fill(0, 0, 0, 5);
      rect(0, 0, w - offset_cell * 2, h - offset_cell * 2);

      let layer_num = floor(random(3, 6));
      for (let i = 0; i < layer_num; i++) {
        let points = createCell(w - offset_cell * 2, h - offset_cell * 2);
        let j = floor(random(1000));
        for (let c of points) {
          fill(pallete[(i + j) % pallete.length]);
          noStroke();
          circle(c.x, c.y, 2);
          j++;
        }

        let num = 3; //floor(random(3, 5));
        let selectedPoints = [];
        while (selectedPoints.length < num) {
          let n = floor(random(points.length));
          let isContain = false;
          for (let m of selectedPoints) {
            if (n == m) isContain = true;
          }
          if (!isContain) selectedPoints.push(n);
        }
        selectedPoints.sort(sortNumber);

        noStroke();
        let color_num = floor(random(pallete.length));
        fill(pallete[color_num]);
        beginShape();
        for (let n of selectedPoints) {
          let p = points[n];
          vertex(p.x, p.y);
        }
        endShape(CLOSE);

      }
      pop();

    }
  }
}

function createCell(_w, _h) {
  let p = [];
  p.push(createVector(0, 0));
  p.push(createVector(_w, 0));
  p.push(createVector(_w, _h));
  p.push(createVector(0, _h));

  let pp = [];
  for (let i = 0; i < p.length; i += 1 / 2) {
    let current = int(i);
    let next = (current + 1) % p.length;
    let float = i % 1;
    let pn = p5.Vector.lerp(p[current], p[next], float);
    pp.push(pn);
  }
  pp.push(createVector(_w / 2, _h / 2));
  return pp;
}

function sortNumber(a, b) {
  return a - b;
}