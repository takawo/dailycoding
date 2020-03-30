let graphics;
let img;

function setup() {
  createCanvas(800, 800, WEBGL);
  blendMode(ADD);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -1500, 1500);
  
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < 50000; i++) {
    graphics.stroke(0, 0, 100, 25);
    graphics.point(random(width), random(height));
  }
  img = createImage(width, height);
  img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);  
  
  
}

function draw() {
  background(0,0,0);

  push();
  translate(0, 0, -500); 
  rotateX(frameCount/6);
  rotateY(frameCount/8);
  rotateZ(frameCount/5);
  
  let r = 300;
  for(let r = 300; r > 0; r -= 300/5){
  for (let angle = 0; angle < 360; angle += 3) {
    let x = cos(angle) * r;
    let z = sin(angle) * r;
    let y = map(noise(x*3/800, z*7/800, r+frameCount / 100), 0, 1, -r/2, r/2);
    
    stroke(0, 0, 100);
    noFill();
    drawLine(x, -y, z, x, y, z);

    push();
    translate(x, y, z);
    noStroke();
    fill(0, 0, 100);
    //sphere(10);
    pop();
  }
  }
  pop();
  
  push();
  translate(0, 0, -100);
  texture(img);
  plane(800);
  pop();  
}

function drawLine(x1, y1, z1, x2,y2, z2){
  beginShape();
  vertex(x1,y1,z1);
  vertex(x2,y2,z2);  
  endShape();
}
