let movers = [];
let num = 15;
let maxNum = 30;
let bg;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  for (let i = 0; i < num; i++) {
    let angle = 360 / num * i;
    let m = new Mover(random(width), random(height), angle);
    movers.push(m);
  }
  
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 15);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let radius = sqrt(sq(width / 2) + sq(height / 2));
    let angle = random(360);
    let r = 1 - (random(random(random(1))));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }  	  
}

function draw() {
  background(0,0,20);
  let n = 0;
  let removes = [];
  for (let m of movers) {
    if (m.isDead()) {
      removes.push(n);
    }
    m.update();
    m.draw();
    n++;
  }
  if (movers.length < maxNum) {
    let angle = random(360);
    let m = new Mover(random(width), random(height), angle);
    movers.push(m);
  }
  for (let j = removes.length - 1; j > 0; j--) {
    movers.splice(removes[j], 1);
  }
  image(bg,0,0);
}


class Mover {
  constructor(x, y, angle = 0) {
    this.pos = createVector(x, y);
    this.angleA = angle != null ? angle : 0;
    this.r = random(1,5);
    this.trail = [];
    this.trailMaxLength = random(30,60);
    this.noiseScale = random(100,200);
    this.life = random(50,200);
  }
  isDead() {
    return this.life < 0;
  }
  update() {
    let n = noise(this.pos.x / this.noiseScale,
      this.pos.y / this.noiseScale,
      // frameCount / this.noiseScale
    );
    n = map(n, 0, 1, -3, 3);
    this.angleA += n;
    let vel = createVector(this.r * cos(this.angleA),
      this.r * sin(this.angleA));
    this.pos.add(vel);
    this.trail.push(createVector(this.pos.x, this.pos.y));
    if (this.trail.length > this.trailMaxLength) {
      this.trail.shift();
    }
    this.life--;
    if (this.life < this.trailMaxLength) {
      this.trailMaxLength-=1;
    if (this.trail.length > this.trailMaxLength && this.trail.length > 1) {
      this.trail.shift();
    }
    }
    
  }
  draw() {
    noFill();
    stroke(0, 0, 95);
    beginShape();
    for (let p of this.trail) {
      vertex(p.x, p.y);
    }
    endShape();
    fill(0, 0, 95);
    noStroke();
    let d =  pow(map(this.trail.length,1,this.trailMaxLength,0,1),3)*10;
    ellipse(this.pos.x, this.pos.y, d, d);
    ellipse(this.trail[0].x, this.trail[0].y, d, d);
  }
}