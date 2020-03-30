let moverSystemSystemsArr = [];

let url = "https://coolors.co/app/f9f8d6-f9cac7-9db5b2-f9729f-f9319c";
let pallete = [];

let cells, cols, rows;
let offset, margin;
let w, h;
let ratio = .65;
let tNum = 128;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
  background(220, 80, 20);
}

function init() {
  pallete = createPallete(url);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);


  cells = int(random(2, 10));
  cols = cells;
  rows = cells;

  offset = (width / cells) / int(random(3, 5));
  margin = offset / int(random(1, 3));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;


  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cx = map(i, 0, cols - 1, offset, width - offset - w) + w / 2;
      let cy = map(j, 0, rows - 1, offset, height - offset - h) + h / 2;
      let rMax = w  * ratio;
      let center = createVector(cx, cy);

      let moverSystemSystems = new MoverSystemSystems();
      let moverSystemsNum = int(random(3,6));

      for (let l = 0; l < moverSystemsNum; l++) {
        let moverSystem = new MoverSystem();
        let moverNum = int(map(random(), 0, 1, 2, 5));
        for (let k = 0; k < moverNum; k++) {
          let angle = int(random(8)) * 45;
          let len = rMax;
          let x = cos(angle) * len;
          let y = sin(angle) * len;
          let vec = createVector(x, y);
          let mover = new Mover(center, vec);
          moverSystem.movers.push(mover);
        }
        moverSystemSystems.moverSystems.push(moverSystem);
      }
      moverSystemSystemsArr.push(moverSystemSystems);
    }
  }
}

function draw() {
  blendMode(NORMAL);
  background(220, 80, 20,100);
  blendMode(ADD);
  for (let moverSystemSystems of moverSystemSystemsArr) {
    moverSystemSystems.update();
    moverSystemSystems.display();
  }

  blendMode(NORMAL);
  image(graphics, 0, 0);
}

class MoverSystemSystems {
  constructor() {
    this.moverSystems = [];
  }
  update() {
    for (let moverSystem of this.moverSystems) {
      moverSystem.update();
    }
  }
  display() {
    for (let moverSystem of this.moverSystems) {
      moverSystem.display();
    }
  }
}




class MoverSystem {
  constructor() {
    this.c = pallete[int(random(pallete.length))];
    this.movers = [];
  }
  update() {
    for (let mover of this.movers) {
      mover.update();
    }
  }
  display() {
    if (this.movers.length == 2) {
      strokeWeight(0.5);
      stroke(this.c+hex(tNum,2));
      noFill();
    } else {
      fill(this.c+hex(tNum,2));
      noStroke();
    }
    beginShape();
    for (let mover of this.movers) {
      //mover.display();
      vertex(mover.center.x + mover.current.x, mover.center.y + mover.current.y);
    }
    endShape(CLOSE);
    if (this.movers.length == 2) {
       fill(this.c+hex(tNum,2));
      noStroke();
      for (let mover of this.movers) {
        let d = mover.step / 10;
        ellipse(mover.center.x + mover.current.x, mover.center.y + mover.current.y, d, d);
      }
    }
  }
}



class Mover {
  constructor(_center, _vec) {
    this.center = _center;
    this.pos = createVector(_vec.x, _vec.y);
    let angle = atan2(this.pos.y, this.pos.x);
    this.step = dist(this.pos.x, this.pos.y, 0, 0);
    this.len = this.step;
    this.num = 3;
    let targetLen = this.len * int(random(0, this.num + 1)) / this.num;
    let targetAngle = angle + 90 * (random(100) > 50 ? -1 : 1);
    let tx = cos(targetAngle) * targetLen;
    let ty = sin(targetAngle) * targetLen;
    this.target = createVector(tx, ty);
    this.current = this.pos.copy();
    this.time = 0;
    this.timeStep = 1/100; int(random(1, 5 + 1)) / 500;
  }
  update() {
    let angleA = atan2(this.pos.y, this.pos.x);
    let angleB = atan2(this.target.y, this.target.x);
    let lenA = dist(this.pos.x, this.pos.y, 0, 0);
    let lenB = dist(this.target.x, this.target.y, 0, 0);

    let angle = lerp(angleA, angleB, this.time);
    let len = lerp(lenA, lenB, this.time);

		let x = cos(angle) * len;
    let y = sin(angle) * len;

    this.current = createVector(x, y);
    this.time += this.timeStep;
    if (this.time > 1) {
      this.pos = this.target.copy();
      let targetLen = this.len * int(random(0, this.num + 1)) / this.num;
      let targetAngle = angle + 90 * (random(100) > 50 ? -1 : 1);
      let tx = cos(targetAngle) * targetLen;
      let ty = sin(targetAngle) * targetLen;
      this.target = createVector(tx, ty);
      this.time = 0;
    this.timeStep = 1/100; int(random(1, 5 + 1)) / 500;
    }
  }
  display() {
    push();
    translate(this.center.x, this.center.y);
    ellipse(this.current.x, this.current.y, 50, 50);
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

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 10);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}