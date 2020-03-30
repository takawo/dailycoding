let objSystems = [];
let pallete = ["#2F2D2E", "#EE9C00", "#E8008C", "#46BDBB", "#55D6BE"];
let bgColor;

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  init();
}

function draw() {
	ambientLight(0,0,100);
  background(bgColor);
  randomSeed(100);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 1500, -1500);
  orbitControl();

  for (let objSystem of objSystems) {
    objSystem.update();
    objSystem.display();
  }
}

function init() {
  let bg = int(random(pallete.length));
  bgColor = pallete[bg];
  pallete.splice(bg, 1);

  let offset = width / 10;
  let r = width / 6 - offset;
  for (let x = -width / 3; x <= width / 3; x += width / 3) {
    let step = int(random(3, 5)) * 12;

    let center = createVector(x, 0, 0);
    let objSystem = new ObjSystem(center);
    let objs = [];
    let stepN = int((1 - sqrt(random(1)))*5) * (random(100) > 50 ? -1 : 1);
    for (let y = -height; y < height; y += step) {
      let angle = y * .2;
      let n = width / 60;

      let x1 = cos(angle) * r;
      let y1 = y;
      let z1 = sin(angle) * r;
      let c1 = int(random(pallete.length));

      let x2 = cos(angle + 180) * r;
      let z2 = sin(angle + 180) * r;
      let y2 = y - step * stepN;
      let c2 = c1;
      while (c2 == c1) {
        c2 = int(random(pallete.length));
      }

      let obj1 = new Obj(x1, y1, z1, pallete[c1], n);
      let obj2 = new Obj(x2, y2, z2, pallete[c2], n);
      let o = new ObjConnect(obj1, obj2);
      objs.push(o);
    }
    objSystem.objs = objs;
    objSystems.push(objSystem);
  }
}

class ObjSystem {
  constructor(_center) {
    this.center = _center.copy();
    this.ry = random(360);
    this.ryStep = random(.5, 1) * (random(100) > 50 ? -1 : 1);
    this.objs = [];
  }
  update() {
    this.ry += this.ryStep;
    for (let obj of this.objs) {
      obj.update();

    }
  }
  display() {
    push();
    translate(this.center.x, this.center.y, this.center.z);
    rotateY(this.ry);
    for (let obj of this.objs) {
      obj.display();
    }
    pop();
  }

}

class ObjConnect {
  constructor(_obj1, _obj2) {
    this.arr = [];
    this.arr.push(_obj1);
    this.arr.push(_obj2);
  }
  update() {
    for (let obj of this.arr) {
      obj.update();
    }
  }
  display() {
    stroke(0, 0, 100);
    strokeWeight(width/300);
    beginShape();
    for (let obj of this.arr) {
      vertex(obj.pos.x, obj.pos.y, obj.pos.z);
    }
    endShape();

    for (let obj of this.arr) {
      obj.display();
    }
  }

}

class Obj {
  constructor(_x, _y, _z, _c, _n) {
    this.pos = createVector(_x, _y, _z);
    this.rx = random(360);
    this.rxStep = random(-3, 3);
    this.ry = random(360);
    this.ryStep = random(-3, 3);
    this.rz = random(360);
    this.rzStep = random(-3, 3);
    this.type = random(100) > 50 ? "box" : "sphere";
    let _w = random(_n / 4, _n);
    let _h = random(_n / 4, _n);
    let _d = random(_n / 4, _n);
    if (this.type == "box") {
      this.size = createVector(_w, _h, _d);
    } else if (this.type == "sphere") {
      let dn = (_w + _h + _d) / 3;
      this.size = createVector(dn, dn, dn);
    }
    this.c = _c;
  }
  update() {
    this.rx += this.rxStep;
    this.ry += this.ryStep;
    this.rz += this.rzStep;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateX(this.rx);
    rotateY(this.ry);
    rotateZ(this.rz);
    fill(this.c);
    noStroke();
    if (this.type == "box") {
      box(this.size.x, this.size.y, this.size.z);
    } else if (this.type == "sphere") {
      sphere(this.size.x);
    }
    pop();
  }
}