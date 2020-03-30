const offset = 100;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 0, 100);
  let x = offset;
  let y = offset;
  let w = width - offset * 2;
  let h = height - offset * 2;
  drawRectShadow(x, y, w, h);
  noStroke();
  rect(x, y, w, h);
  noLoop();
}

function drawRectShadow(x, y, w, h, n = 100) {
	rectMode(CENTER);
  push();
  translate(x+w/2,y+h/2);
  for(let i = n; i > 0; i--){
  noFill();
  let t = map(i,n,0,0,2.8);
  stroke(0,0,0,t*t);
  rect(0,0,w+i,h+i);
  }
  pop();  
  rectMode(CORNER);
}