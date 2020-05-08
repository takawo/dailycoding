let p;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let b = new Bound(100, 100, width - 200, height - 200);
  p = new Particle(width / 2, height / 2, 0, 0, b);
  background(0, 0, 95);
}

function draw() {
  background(0, 0, 95, 5);
  p.update();
  p.display();
}

class Particle {
  constructor(x, y, angle, radius,bound) {
    this.center = createVector(x, y);
    this.pos = p5.Vector.fromAngle(angle).mult(radius);
    this.r = 2;
    this.bound = bound;
  }
  update() {
    let angle = this.pos.heading();
    angle += map(sq(noise(frameCount / 100)), 0, 1, -15, 15);
    angle = constrain(angle, -30, 30);
    this.pos.add(p5.Vector.fromAngle(angle).mult(3));
    let x1 = this.bound.x - this.center.x;
    let y1 = this.bound.y - this.center.x;
  }
  display() {
    push();
    translate(this.center.x, this.center.y);
    for (let angle = 0; angle < 360; angle += 360 / 6) {
      push();
      rotate(angle);
      ellipse(this.pos.x, this.pos.y, 3);
      pop();
    }
    pop();
  }
}

class Bound {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}