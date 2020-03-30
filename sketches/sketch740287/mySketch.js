let n = 0;
let diameter;
let ease;
let list;
let easeOutArr;
let easeElasticArr;
let num = 100;
let nMax = 10;
let pos;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  diameter = width * 0.85;
  pos = createVector(width / 2, height / 2);

  ease = new p5.Ease();
  list = ease.listAlgos();
  easeOutArr = ease.fillArray("backOut", num);
}

function draw() {
  background(220,80,40);
  noStroke();
  let n_current = int(n / num);
  let t =easeOutArr[n % num];
  let d = n_current * diameter / nMax + t * diameter / nMax;
  if (n <= num * nMax) {
    fill(0,100,100);
    ellipse(pos.x, pos.y, d, d*1.15);
    push();
    translate(pos.x,pos.y + (d * 1.15)/2);
    push();
    rotate(90);
    noFill();
    stroke(0,0,100);
    strokeWeight(d/50);
    beginShape();
    for(let i = 0; i < d * 2; i++){
      let x = i;
      let y = sin(i/(d*50) * 360*50) * d/20;
      vertex(x,y);
    }
    endShape();
    pop();
    
    push();
    beginShape();
    for(let angle = 0; angle < 360; angle += 360/3){
      let x = cos(30 + angle) * d/10;
      let y = sin(30 + angle) * d/10;
      vertex(x,y);
    }
    endShape(CLOSE);
    pop();
    pop();
  }
  if (n == num * nMax) {
    noLoop();
  }
  n += 1;
  diameter *= 0.99998;
}