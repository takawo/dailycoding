let movers = [];
let minDistance = 150;
let noiseScale = 400;

function setup() {
  createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
	const num = width * height / 15000;
	
	
  for (let i = 0; i < num; i++) {
    movers[i] = new Mover(i);
  }
}

function draw() {
  blendMode(NORMAL);
  background(0, 0, 0);
  blendMode(ADD);
  for (let n of movers) {
    for (let m of movers) {
      if (n != m && !n.existPair(m.id) && !m.existPair(n.id)) {
        let distance = dist(m.pos.x, m.pos.y, n.pos.x, n.pos.y);
        if (distance < minDistance) {
          stroke(0, 0, 100);
          drawCurve(m.pos.x, m.pos.y, n.pos.x, n.pos.y, distance);
          n.pair.push(m.id);
          m.pair.push(n.id);
        }
      }
    }
    n.update();
    n.display();
    n.checkEdges()
		
		
  }
}

function drawCurve(x1, y1, x4, y4, d) {
  let angle = atan2(y1 - y4, x1 - x4);
  //print(floor(d/vel),floor(angle));
  let _n2 = noise(x1 / noiseScale, y1 / noiseScale, frameCount / noiseScale);
  n2 = map(_n2, 0, 1, 0, 360);
  let _n3 = noise(x4 / noiseScale, y4 / noiseScale, frameCount / noiseScale);
  n3 = map(_n3, 0, 1, 0, 360);
	
	let vel = map((_n2 + _n3) / 2,0,1,0,5);
	

  let angle2 = angle + n2;
  let angle3 = angle + n3;
  let x2 = x1 + cos(angle2) * d / vel;
  let y2 = y1 + sin(angle2) * d / vel;
  let x3 = x4 + cos(angle3) * d / vel;
  let y3 = y4 + sin(angle3) * d / vel;
  noFill();
  let t = map(d, 0, minDistance, 100, 0);
  stroke(0, 0, 100, t);
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);
}



class Mover {
  constructor(n) {
    this.pair = [];
    this.id = n;
    let x = random(0, width);
    let y = random(0, height);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
  }
  existPair(id) {
    let bool = false;
    for (let _ids of this.pair) {
      if (_ids == id) {
        bool = true;
      }
    }
    return bool;
  }
  checkEdges() {
    if (this.pos.x < -minDistance) this.pos.x += width + minDistance;
    if (this.pos.x > width + minDistance) this.pos.x -= width + minDistance;
    if (this.pos.y < -minDistance) this.pos.y += height + minDistance;
    if (this.pos.y > height + minDistance) this.pos.y -= height + minDistance;

  }
  update() {
    let a = map(noise(this.pos.x / noiseScale, this.pos.y / noiseScale, frameCount / noiseScale), 0, 1, 0, 360);
    let v = 0.5; //noise(sin(this.id) * a/noiseScale) * 10;
    this.vel.x = cos(a) * v;
    this.vel.y = sin(a) * v;
    //print(this.vel);
    this.pos.add(this.vel);
    this.pair = [];
  }
  display() {
    fill(0, 0, 100);
    noStroke();
    circle(this.pos.x, this.pos.y, 5);
  }
}