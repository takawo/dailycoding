let frames = [];
let cells, cols, rows;
let margin, offset;
let w, h;

let bg;

let pallete;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 95);
  init();
}

function init() {
  pallete = [color(235, 34, 28), color(284, 6, 61), color(0, 54, 100), color(27, 9, 39), color(43, 14, 94)];

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.background(int(random(12)) * 360 / 12, 20, 100);
  drawNoiseBackground(50000, bg);
  image(bg, 0, 0);

  cells = int(random(1, 4)) * int(random(1, 4));
  cols = cells;
  rows = cells;

  offset = int(random(3)) * 30;
  margin = offset / int(random(1, 3));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      frames.push(new Frame(x, y, w, h));
    }
  }
}


function draw() {
  for (let frame of frames) {
    frame.draw();
  }
  noLoop();
}


function drawNoiseBackground(_n, _graphics) {
	for (let i = 0; i < _n; i++) {
		let x = random(0, width);
		let y = random(0, height);
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(0, 0, 50, 5);
		_graphics.ellipse(x, y, w, h);
	}
}


class Frame {
  constructor(_x, _y, _w, _h) {
    let angle_num = int(random(4));
    this.angle = angle_num * 90;
    let w, h;
    this.bound = new Bound(_x, _y, _w, _h);
    this.points = this.bound.makePoints();
    this.quads = this.createQuads(this.points);
  }
  draw() {
    let shadowOffset = w / 30;
      fill(0,0,0,5);
    noStroke();
      beginShape();
      for (let p of this.quads) {
        vertex(p.x + shadowOffset*0.5, p.y + shadowOffset*1);
      }
      endShape(CLOSE);
    for (let i = shadowOffset*2; i > 0; i--) {
      let t = map(i, 50, 0, 0, .7);
      stroke(0, 0, 0, t);
      strokeWeight(i * 2);
      strokeJoin(ROUND);
      strokeCap(SQUARE);
      noFill();
      beginShape();
      for (let p of this.quads) {
        vertex(p.x + shadowOffset*0.5, p.y + shadowOffset*1);
      }
      endShape(CLOSE);
    }
    let c1 = pallete[int(random(pallete.length))];
    let ca = color(hue(c1), saturation(c1), brightness(c1));
    let direction = random(100) > 50 ? -1 : 1;
    let h = (hue(c1) + int(random(2, 4)) * 25 * direction) % 360;
    let s = constrain(saturation(c1) + int(random(1, 5)) * 10 * direction, 0, 100);
    let b = constrain(brightness(c1) + int(random(1, 5)) * 10 * direction, 0, 100);
    let cb = color(h, s, b);
    let p1 = this.quads[0];
    let p2 = this.quads[1];
    let p3 = this.quads[3];
    let p4 = this.quads[2];
    for (let i = 0; i < 1; i += 1 / 500) {
      let pt = p5.Vector.lerp(p1, p2, i);
      let ps = p5.Vector.lerp(p3, p4, i);
      let c = lerpColor(ca, cb, i);
      stroke(c);
      line(pt.x, pt.y, ps.x, ps.y);
    }
  }
  createQuads(_pointsArr) {
    let step = int(random(1, _pointsArr.length / 2));
    let n1 = int(random(_pointsArr.length));
    let n2 = (n1 + step) % _pointsArr.length;
    let m1 = (n1 + (_pointsArr.length / 2)) % _pointsArr.length;
    let m2 = (m1 + step) % _pointsArr.length;
    return [_pointsArr[n1], _pointsArr[n2], _pointsArr[m1], _pointsArr[m2]];
  }
}

class Bound {
  constructor(_x, _y, _w, _h) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
  }
  draw() {
    rect(this.x, this.y, this.w, this.h);
  }
  makePoints() {
    let arr = [];
    let step = 360 / 8;
    for (let angle = 0; angle < 360; angle += step) {
      let x1 = constrain(this.x + this.w / 2 + cos(angle) * this.w, this.x, this.x + this.w);
      let y1 = constrain(this.y + this.h / 2 + sin(angle) * this.h, this.y, this.y + this.h);
      let x2 = constrain(this.x + this.w / 2 + cos(angle + step) * this.w, this.x, this.x + this.w);
      let y2 = constrain(this.y + this.h / 2 + sin(angle + step) * this.h, this.y, this.y + this.h);
      for (let i = 0; i < 1; i += 1 / 5) {
        arr.push(p5.Vector.lerp(createVector(x1, y1), createVector(x2, y2), i));
      }
    }
    return arr;
  }
}