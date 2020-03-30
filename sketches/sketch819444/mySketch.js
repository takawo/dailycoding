let current;
let target;
let step = 100;
let t = 0;

let path = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  current = createVector();
  target = createTarget(current, step);
  path.push(current.copy());  
}

function draw() {
  background(0);
  orbitControl();
  current = p5.Vector.lerp(current, target, t);
  strokeWeight(25);
  stroke(255);
  noFill();
  point(current.x, current.y, current.z);
  if(path.length > 1500){
    path.shift();
  }
  strokeWeight(.5);
  stroke(255);
  noFill();
  beginShape();
  for(let p of path){
    vertex(p.x,p.y,p.z);  
  }
    vertex(current.x,current.y,current.z);  
  endShape();
  
  
  t += 0.005;
  if (t > 1 || p5.Vector.dist(current,target) < 0.1) {
    path.push(current.copy());
    t = 0;
    target = createTarget(current, step);
  }
  
  let r = map(sin(frameCount/3),-1,1,100,400)
  let nsA = 400;
  let nsB = 500;
  let angleA = noise(current.x/nsA,current.y/nsA,frameCount/nsA)*360;
  let angleB = noise(current.y/nsB,current.z/nsB,frameCount/nsB)*360-180; 
  let v = createVector(
    current.x + cos(angleA) * cos(angleB) * r,
    current.y + sin(angleA) * cos(angleB) * r,
    current.z + sin(angleB) * r
  );
    
  camera(v.x,v.y,v.z,current.x,current.y,current.z,0,1,0);  
  
}

function createTarget(_point, _step) {
  let p = _point.copy().add(createVector(
    int(random(3)) - 1,
    int(random(3)) - 1,
    int(random(3)) - 1
  ).mult(_step));
  return p;
}