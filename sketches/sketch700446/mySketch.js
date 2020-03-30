let img;
let imgTop;
let imgBottom;
function preload(){
  img = loadImage("people.jpeg");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  imgTop = img.get(0,0,img.width,img.height/2);
  imgBottom = img.get(0,img.height/2,img.width,img.height/2);
}

function draw() {
  background(30);
  image(imgTop,100,100);
  push();
  translate(100,100+imgTop.height);
  for(let x = 0; x < 0 + img.width; x += 3){
    let c = img.get(x,img.height/2);
    let p1 = createVector(x,0);
    let p2 = createVector(x+200,200);
    let angle = atan2(p2.y-p1.y,p2.x-p1.x);
    let d = p5.Vector.dist(p1,p2);
    let angleStep = 360 / d;
    push();
    translate(p1.x,p1.y);
    rotate(angle);
    stroke(c);
    strokeWeight(3);
    noFill();
    beginShape();
    vertex(0,0);
    for(n = 0; n <= d; n+= 5){
      let y = sin(angleStep * (-frameCount+n)*3) *cos(angleStep * (-frameCount+n)) * 20;
      vertex(n,y);
    }
    vertex(d,0);
    endShape();
    pop();

  }
  pop(); 
  image(imgBottom,300,500);
  //noLoop();
}