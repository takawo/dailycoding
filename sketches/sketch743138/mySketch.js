let ratio = 0.65;
let points = [];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  for(let r = width / 2*0.85; r > 0; r -= width / 2 /20){
    let angleStep = map(r,width/2*0.85,0,.1,10);
    let startAngle = random(360);
  for (let angle = startAngle; angle < startAngle + 360; angle += angleStep) {
    let x = width / 2 + cos(angle) *  r;
    let y = height / 2 + sin(angle) * r;
    points.push(new Mover(x,y));
  }
  }
  background(220);
}

function draw() {
  for( let p of points){
    p.update();
    p.display();
  }
}

class Mover{
  constructor(_x,_y,_nx = 50,_ny = 50){
    this.pos = createVector(_x,_y);
    let nx = 1/50;
    let ny = 1/50;
    let nz = 1/50;
    this.noiseScale = createVector(nx,ny);
    this.life = 300;
    this.lifeRatio = this.life / 500;
  }
  update(){
    let n = noise(this.pos.x * this.noiseScale.x,
                  this.pos.y * this.noiseScale.y);
    let angle = map(n,0,1,-180,180);
    angle = (angle + frameCount/10)%360;
    let vel = createVector(cos(angle),sin(angle));
    this.pos.add(vel);
    this.life -= this.lifeRatio;
  }
  display(){
    stroke(0,0,0,this.life/2);
    point(this.pos.x,this.pos.y);  
  } 
}