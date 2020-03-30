let wallSystems = [];
let cells, cols, rows;
let offset, margin, w, h;
let pallete = ["#7A9E9F", "#EEF5DB", "#4F6367", "#FE5F55", "#B8D8D8"];
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  init();
}

function init() {

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, bg);

  cells =int(random(3,8));
  cols = cells;
  rows = cells;

  offset = int(random(1, 5)) * 20;
  margin = offset / int(random(2, 5));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  for (let j = -1; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x;
      if (j % 2 == 0) {
        x = map(i, 0, cols, -offset, width + offset);
      } else {
        x = map(i, 0, cols, offset, width + offset * 2);
      }
      let y = map(j, 0, rows, offset, height + offset);
      let wallSystem = new WallSystem(x, y, w, h);
      wallSystems.push(wallSystem);
    }
  }
}

function draw() {
  background(0,0,85);
  for (let wallSystem of wallSystems) {
    wallSystem.update();
    wallSystem.display();
  }
  image(bg, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 5);
    _graphics.ellipse(x, y, w, h);
  }
}

class WallSystem {
  constructor(_x, _y, _w, _h) {
    this.bound = new Bound(_x, _y, _w, _h);
    this.ballSystem = new BallSystem(_x, _y, _w, _h);
    let cx = _x + _w / 2;
    let cy = _y + _h * 2 / 3;

    let wallR_x = cx + cos(radians(45)) * _w / 2 / 2;
    let wallR_y = cy + sin(radians(45)) * _h / 2 / 2;
    let wallL_x = cx + cos(radians(45 + 90)) * _w / 2 / 2;
    let wallL_y = cy + sin(radians(45 + 90)) * _h / 2 / 2;
    let optionR = {
      angle: radians(-45)
    };
    let optionL = {
      angle: radians(-45 - 90)
    };
    let r = sqrt(sq(_w / 2) + sq(_h / 2));
    this.wallR = matter.makeBarrier(wallR_x, wallR_y, r * 1.3, 10, optionR);
    this.wallL = matter.makeBarrier(wallL_x, wallL_y, r * 1.3, 10, optionL);
  }
  update() {
    this.ballSystem.update();
  }
  display() {
    noFill();
    stroke(0, 0, 30);
    // this.wallR.show();
    // this.wallL.show();
    this.ballSystem.display();
    // this.bound.display();
  }
}

class BallSystem {
  constructor(_x, _y, _w, _h) {
    this.w = _w;
    this.h = _h;
    this.balls = [];
    this.colorNum = [];
    this.pos = createVector(_x + _w / 2, _y);
  }
  update() {
    if (this.balls.length < (500 / (cells * cells)) && random(100) < 5) {
      let n = (1-sqrt(random(1)))*20;
      let d = n * w / 60;
      let option = {
        restitution: map(d, 5, 50, 0.75, 0.1)
      };
      let ball = matter.makeBall(this.pos.x + random(-this.w / 4, this.w / 4), this.pos.y, d, option);
      this.balls.push(ball);
    }    
  }  
  display() {
    for (let ball of this.balls) {
      fill(pallete[ball.body.id % pallete.length]);
      noStroke();
      ball.show();
    }
  }
}

class Bound {
  constructor(_x, _y, _w, _h) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
  }
  display() {
    noFill();
    stroke(0, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}