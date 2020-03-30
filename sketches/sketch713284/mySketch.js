let angleOriginA;
let angleOriginB;
let angleLatitudeA;
let angleLatitudeB;
let freqA,freqB;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let sep = 10;
  angleOriginA = int(random(sep)) * 360 / sep;
  angleOriginB = int(random(sep)) * 360 / sep;
  angleLatitudeA = random(360/sep/2,360/sep);
  angleLatitudeB = random(360/sep/2,360/sep);

  freqA = int(random(3,8))/5;
  freqB = int(random(3,8))/5;
}

function draw() {
  background(220);

  let cx = width / 2;
  let cy = height / 2;
  let ratio = 0.85;
  let r = width / 2 * ratio;

  let angleA = angleOriginA + angleLatitudeA * sin(angleOriginB + frameCount * freqA);
  let angleB = angleOriginB + angleLatitudeB * cos(angleOriginA + frameCount * freqB);
  
  if(angleA > angleB){
    let temp = angleA;
    angleA = angleB;
    angleB = temp;
  }
  
  fill(0,0,10);
  noStroke();
  push();
  translate(cx, cy);
  rotate(frameCount * - .5);
  
  beginShape();
  for(let angle = angleA; angle < angleB; angle++){
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x,y);
  }
  for(let angle = angleB; angle > angleA; angle--){
    let x = r/2 * cos(angle);
    let y = r/2 * sin(angle);
    vertex(x,y);
  }
  endShape(CLOSE);
  pop();
}