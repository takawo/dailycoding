let nx1;
let ny1;
let nsA;
let nx2;
let ny2;
let nsB;
let points = [];
function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  nx1 = random(1500);
  ny1 = random(1500);
  nsA = random(100, 200);
  nx2 = random(1500);
  ny2 = random(1500);
  nsB = random(100, 200);
}

function draw() {
  background(0, 0, 10);

  let r = 1000;
  let angleA = map(noise(nx1, ny1, frameCount / nsA), 0, 1, 0, 360)
  let angleB = map(noise(nx2, ny2, frameCount / nsB), 0, 1, -180, 180);
  let step = 50;
  let point = createVector(
    cos(angleA) * cos(angleB),
    sin(angleA) * cos(angleB),
    sin(angleB)
  ).mult(r);
  
  points.push(point);
 
  if(points.length > 100){
    points.shift();
  }
  
  for(let i = 0; i < points.length-1; i++){
    let angleE = angleA+i*5;
    let angleF = angleB-i*5;
    let s = createVector(
      cos(angleE) * cos(angleF),
      cos(angleE) * sin(angleF),
      sin(angleF)
      ).mult(step);
  //fill(angleE%360,80,100);
  //noStroke();
  beginShape();
    let p = points[i].copy().add(s);
    vertex(
      p.x,p.y-step,p.z
    );
    vertex(
      p.x,p.y+step,p.z
    );
    p = points[i+1].copy().sub(s);
    vertex(
      p.x,p.y+step,p.z
    );
    vertex(
      p.x,p.y-step,p.z
    );
  endShape(CLOSE);
  }
  // for(let i = points.length-1; i >0 ; i--){
  //   let p = points[i];
  //   vertex(
  //     p.x,p.y-2,p.z
  //   );
  // }
  
  let angleC = angleB+frameCount;
  let angleD = angleA-frameCount;
  let q = point.copy().add(
      cos(angleC) * cos(angleD),
      cos(angleC) * sin(angleD),
      sin(angleD),
    ).mult((sin(frameCount),1/2,1/5) * r/10);
  camera(0,0,0,q.x,q.y,q.z,0,1,0);
}