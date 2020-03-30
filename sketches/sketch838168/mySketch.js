

let count = 0;
let w;
let capture;
let angle = 0;
let graphics;
let pallete = ["#568777","#B6BDB0","#4C594B","#FB9E27","#2B9192","#DC3509","#0C120E","#EEEEEE"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  pixelDensity(1);
  //capture.hide();
  angleMode(DEGREES);
  w = sqrt(width * width + height * height);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB,360,100,100,100);
  graphics.noStroke();
  for(let i = 0; i < width * height * 10/100; i++){
    graphics.fill(0,0,random(100) > 50 ? 20: 80,5);
  	let x = random(width);
  	let y = random(height);
  	let w = random(3);
  	let h = random(3);
  	graphics.ellipse(x,y,w,h);
  }
}

function draw() {
  randomSeed(0);
  push();
  translate(width/2,height/2);
  rotate(frameCount/2+45);
  separateGrid(-w/2-1, -w/2-1, w+2, w+2, 8,pallete.concat());
  pop();
  count += 0.05;
  image(graphics,0,0);
}

function separateGrid(x, y, w, h, depth,colors) {
  let colorArr = [];
  for(let i = 0; i < 3; i++){
    let i = int(random(colors.length));
    colorArr.push(colors[i]);
    colors.splice(i,1);
  }
  let direction = random(100) > 50 ? -1:1;
  if (depth > 0) {
		let n  =map(sin(x/100 +frameCount/3) * cos(y /100 +frameCount/2),-1,1,0,1);
    let n2 = noise(x / 1000, y / 1000, (direction*frameCount) / 800);
    
    let m = n2 * 360;
    strokeWeight(min(w, h) / 20);
    strokeWeight(1);
    fill(colorArr[0]);
    noStroke();
    rect(x, y, w+1, h+1);
    push();
    translate(x+w/2,y+h/2);
    let d = min(w,h)-4;
    noStroke();
    fill(colorArr[1]);
    arc(0,0,d,d,m,m+n2*360,PIE);
    fill(colorArr[2]);
    arc(0,0,d,d,m+n2*360,m,PIE);
    pop();
    if (depth % 2 == 1) {
      separateGrid(x, y, w * n, h, depth - 1,pallete.concat());
      separateGrid(x + w * n, y, w - w * n, h, depth - 1,pallete.concat());
    } else {
      separateGrid(x, y, w, h * n, depth - 1,pallete.concat());
      separateGrid(x, y + h * n, w, h - h * n, depth - 1,pallete.concat());
    }
  }
}