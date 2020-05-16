//reference:fuzzyastrocat's awesome sketch;
// https://www.openprocessing.org/sketch/731802

p5.disableFriendlyErrors = false;

let img;
let pixelStep = 6;
let particles = [];

function preload() {
  img = loadImage("https://loremflickr.com/400/400/lifeline",function(){
  for (let x = 0; x < img.width; x += pixelStep) {
    for (let y = 0; y < img.height; y += pixelStep) {
			particles.push(new Particle(x+(800-img.width)/2,y+(800-img.height)/2,img.get(x,y)));
    }
  }  
  });
}

function setup() {
  createCanvas(800,800);
    // colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(20);
  
  // push();
  // imageMode(CENTER);
  // translate(width/2,height/2);
  // image(img, 0, 0);
  // pop();
  
  for (let particle of particles) {
    particle.display();
    particle.update();
  }

}

class Particle {
  constructor(x, y, c) {
    this.pos = createVector(x, y);
    this.color = c;
    this.vel = createVector();
    this.target = this.pos.copy();
  }
  update() {
    this.pos.add(this.vel);
    this.vel.div(1.05);
    this.vel.add(p5.Vector.sub(this.target, this.pos).div(map(sin(frameCount),-1,1,5,25)));
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    this.vel.x += (this.pos.x - mouseX) / d;
    this.vel.y += (this.pos.y - mouseY) / d;

  }
  
  display() {
    fill(this.color);
    noStroke();
    rect(this.pos.x, this.pos.y, pixelStep, pixelStep);
  }
}