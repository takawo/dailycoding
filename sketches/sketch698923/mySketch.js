let cells, cols, rows;
let offset, margin;
let w, h;
let objects = [];
let walls = [];
let gravity = -1;
let pallete = ["#FFB4A2", "#E5989B", "#FFCDB2", "#B5838D", "#6D6875"];

let graphics;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  matter.init();
  matter.mouseInteraction(canvas);
  matter.changeGravity(0, 0.6);
  init();
  background(220, 20, 20);
}

function draw() {
  background(220, 20, 20);
  let num = map(cells, 0, 3, 8, 20, 10);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (random(100) > 95 && objects.length < cols * rows * num) {
        let x = map(i, 0, cols - 1, offset, width - offset - w);
        let y = map(j, 0, rows - 1, offset, height - offset - h);
        let ow = random(w / 4, w / 10);
        let oh = random(h / 4, h / 10);
        let od = (ow + oh) / 2;
        let ox = x + w / 2;
        let oy = y + h * 1 / 3;
        let obj;
        let oc = pallete[int(random(pallete.length))];
        obj = new Obj(ox, oy, ow, oh, oc);
        objects.push(obj);
      }
    }
  }

  for (let obj of objects) {
    obj.update();
    obj.show();
  }

  // for (let _walls of walls) {
  //   for (let wall of _walls) {
  //     fill(220, 20, 23);
  //     wall.show();
  //   }
  // }
  image(graphics,0,0);
}

function mousePressed() {
  let nx = int(map(constrain(mouseX, offset, width - offset - w), offset, width - offset - w, 0, cols - 1));
  let ny = int(map(constrain(mouseY, offset, width - offset - w), offset, height - offset - h, 0, rows - 1));

  let wall_num = nx + ny * cols;
  if (walls.length > 0) {
    let n = int(random(walls.length));
    for (let wall of walls[wall_num]) {
      matter.forget(wall);
    }
    walls[wall_num].length = 0;
    //walls.splice(wall_num, 1);
  }
}

function init() {
  cells = int(random(2, 8));
  cols = cells;
  rows = cells;

  offset = width / cols * 1 / int(random(2, 6));
  margin = offset / int(random(2, 4));

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      //rect(x, y, w, h);
      makeWalls(x, y, w, h);
    }
  }
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 3);
    _graphics.ellipse(x, y, w, h);
  }
}

function makeWalls(_x, _y, _w, _h) {
  let depth = 10;
  let wall = [];
  // let ceiling = matter.makeBarrier(_x + _w / 2, _y - depth / 2, _w, depth);
  // walls.push(ceiling);
  let floor = matter.makeBarrier(_x + _w / 2, _y + _h + depth / 2, _w + depth * 2, depth);
  wall.push(floor);
  let leftWall = matter.makeBarrier(_x - depth / 2, _y + _h / 2, depth, _h);
  wall.push(leftWall);
  let rightWall = matter.makeBarrier(_x + _w + depth / 2, _y + _h / 2, depth, _h);
  wall.push(rightWall);
  walls.push(wall);
}

class Obj {
  constructor(_x, _y, _w, _h, _c) {
    this.c = _c;
    this.obj;
    let option = {

    };
    let _d = (_w + _h) / 2;
    if (random(100) > 50) {
      this.obj = matter.makeBall(_x, _y, _d, option);
    } else {
      this.obj = matter.makeBlock(_x, _y, _w, _h, option);
    }
  }
  update() {
    if (this.obj.isOffCanvas(100)) {
      matter.forget(this.obj);
    }
  }
  show() {
    fill(this.c);
    // stroke(0,0,100,50);
    // strokeWeight(0.5);
    noStroke();
    this.obj.show();
  }
}