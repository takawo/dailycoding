let movingArcSystem;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  let cx = width / 2;
  let cy = height / 2;
  let r = width / 2 * 0.85;
  let sep = 5;
  movingArcSystem = new MovingArcSystem(cx,cy,r,sep);
}

function draw() {
  background(200,10);
  for(let mA of movingArcSystem.movingArcs){
    mA.display();
  }
}
class MovingArcSystem {
  constructor(_cx, _cy, _r, _sep) {
    this.movingArcs = [];
    let rStep = _r / (_sep + 1);
    for (let i = 0; i < _sep; i++) {
      let rMax = map(i, 0, _sep - 1, _r, rStep * 2);
      let rMin = rMax - rStep;
      let mA = new MovingArc(_cx,_cy, rMax, rMin, _sep);
      this.movingArcs.push(mA);
    }
  }
  display() {
    for (let mA of this.movingArcs) {
      mA.display();
    }
  }

}

class MovingArc {
  constructor(_cx, _cy, _rMax, _rMin, _sep) {
    this.center = createVector(_cx, _cy);
    this.rMax = _rMax;
    this.rMin = _rMin;
    this.sep = _sep;
    this.angleOriginA = int(random(this.sep)) * 360 / this.sep;
    this.angleOriginB = this.angleOriginA + int(random(this.sep)) * 360 /
      this.sep;
    this.angleLatitudeA = map(int(random(-this.sep, this.sep)), -this.sep + 1, this.sep - 1, 360 / this.sep / 2, 360 / this.sep);
    this.angleLatitudeB = map(int(random(-this.sep, this.sep)), -this.sep + 1, this.sep - 1, 360 / this.sep / 2, 360 / this.sep);
    this.freqA = int(random(3, 8)) / 5;
    this.freqB = int(random(3, 8)) / 5;
    this.freqC = map(int(random(10)), 0, 9, -1.5, 1.5);
  }
  display() {

    let angleA = this.angleOriginA + this.angleLatitudeA * sin(frameCount * this.freqA);
    let angleB = this.angleOriginB + this.angleLatitudeB * cos(frameCount * this.freqB);

    if (angleA > angleB) {
      let temp = angleA;
      angleA = angleB;
      angleB = temp;
    }

    fill(0, 0, 10);
    noStroke();
    push();
    translate(this.center.x, this.center.y);
    rotate(frameCount * this.freqC);

    beginShape();
    for (let angle = angleA; angle < angleB; angle++) {
      let x = this.rMax * cos(angle);
      let y = this.rMax * sin(angle);
      vertex(x, y);
    }
    for (let angle = angleB; angle > angleA; angle--) {
      let x = this.rMin * cos(angle);
      let y = this.rMin * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();

  }
}