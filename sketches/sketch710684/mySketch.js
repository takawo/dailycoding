let rs;
function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
	rs = random(10000);
}

function draw() {
  background(220);
  
	randomSeed(rs);
  
  let cx = width/2;
  let cy = height/2;
  let offset = width / 10;
  let w = width - offset * 2;
  let h = height - offset * 2;

  let freqA = random(0,1.5) * (random(100) > 50 ? -1:1);
  let freqB = random(0,1.5) * (random(100) > 50 ? -1:1);
  let offsetA = random(360);
  let offsetB= random(360);

	let stepA = random(5);
	let stepB = 5 - stepA;
  push();
  translate(cx,cy);
  for(let x = -w/2; x < w/2; x += 2){
    let y1 = sin(offsetA + (x+frameCount*stepA) * freqA) * w/2/2;
    let y2 = sin(offsetA + (x-frameCount*stepB) * freqB) * w/2/2;
    line(x,y1,x,y2);    
  }
  pop();
}