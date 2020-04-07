function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 0, 90);
  separateGrid(0, 0, width, height);
  frameRate(1);
}

function separateGrid(x, y, w, h) {
  drawingContext.shadowColor = color(0,0,0,20);
  drawingContext.shadowBlur = 10;
  // noStroke();
  rect(x, y, w, h);
  let nw = random() * w;
  let nh = random() * h;
  if(min(nw,nh) > 10){
  separateGrid(x,y,nw,nh);
  separateGrid(x+nw,y,w-nw,nh);
  separateGrid(x,y+nh,nw,w-nh);
  separateGrid(x+nw,y+nh,w-nw,h-nh);
  }
}