function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  let cx = width / 2;
  let cy = height / 2;
  let r = width / 6;
  let r2 = width / 4;
  let angle = 0;

  push();
  translate(cx, cy);
  let p1 = createVector(cos(angle) * r, sin(angle) * r);
  let p2 = createVector(cos(angle + 180) * r, sin(angle + 180) * r);
  // noFill();
  // ellipse(p1.x,p1.y,r2*2,r2*2);
  // ellipse(p2.x,p2.y,r2*2,r2*2);


  for (let angle2 = -90; angle2 < 90; angle2 += 1) {
    let x1 = p1.x + cos(angle2) * r2;
    let y1 = p1.y + sin(angle2) * r2;
    let x2 = p2.x + cos(angle2 + 180) * r2;
    let y2 = p2.y + sin(angle2) * r2;
    
    let angle3 = atan2(y2-y1,x2-x1);
    let distance = dist(x1,y1,x2,y2);
    
    noFill();
    push();
    translate(x1,y1);
    rotate(angle3);
    beginShape();
    for(let x = 0; x < distance; x++){
    let y = sin(x/distance * 360*3) * r2/10;
      vertex(x,y);
    }
    endShape();
    pop();
  }
  pop();
}