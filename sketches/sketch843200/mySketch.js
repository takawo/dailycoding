let graphics1;
let graphics2;
let graphics3;
let x1 = 0;
let x11 = 0;
let x2 = 0;
let x22 = 0;
let x3 = 0;
let x33 = 0;
let ratioW = 0.85;
let ratioH = 2.53;
let speed = 2.5;
function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
	
  graphics1 = createGraphics(width * 3, height);
  graphics1.colorMode(HSB, 360, 100, 100, 100);
  graphics1.angleMode(DEGREES);
  graphics1.background(0, 0, 10);
  
	graphics2 = createGraphics(width * 3, height);
  graphics2.colorMode(HSB, 360, 100, 100, 100);
  graphics2.angleMode(DEGREES);
  graphics2.background(0, 0, 30);
  
	graphics3 = createGraphics(width * 3, height);
  graphics3.colorMode(HSB, 360, 100, 100, 100);
  graphics3.angleMode(DEGREES);
  graphics3.background(0, 0, 50);

  let num = 10;

  let offset = 0;graphics1.width / 20;
  let margin = offset / 5;
  let d = (graphics1.width - offset * 2 - margin * (num - 1)) / num;

  for (let i = 0; i < num; i++) {
    let x = offset + i * (d + margin) + d / 2;
    graphics1.erase(255, 0);
    graphics1.push();
    graphics1.translate(x, graphics1.height / 2);
    graphics1.rotate(random(-15,15));
    graphics1.ellipse(0,0, d*ratioW, d *ratioH);
    graphics1.pop();
  }

  for (let i = 0; i < num; i++) {
    let x = offset + i * (d + margin) + d / 2;
    graphics2.erase(255, 0);
    graphics2.push();
    graphics2.translate(x, graphics2.height / 2);
    graphics2.rotate(random(-15,15));
    graphics2.ellipse(0,0, d*ratioW, d *ratioH);
    graphics2.pop();
  }

  for (let i = 0; i < num; i++) {
    let x = offset + i * (d + margin) + d / 2;
    graphics3.erase(255, 0);
    graphics3.push();
    graphics3.translate(x, graphics2.height / 2);
    graphics3.rotate(random(-15,15));
    graphics3.ellipse(0,0, d*ratioW, d *ratioH);
    graphics3.pop();
  }

	x1 = random(width);
	x2 = random(width);
	x3 = random(width);
  x11 = x1-graphics1.width;
  x22 = x2-graphics2.width;
  x33 = x3-graphics3.width;
}

function draw() {
  background(220);

  image(graphics3, x33, 0);
  image(graphics3, x3, 0);
  background(0,0,100,10);
  image(graphics2, x22, 0);
  image(graphics2, x2, 0);
  background(0,0,100,10);  
  image(graphics1, x11, 0);
  image(graphics1, x1, 0);
  background(0,0,100,10);  
  
  x1 +=speed;
  x11 +=speed;
  if(x1 > width){
    x1 = x11 - graphics1.width;    
  }
  if(x11 > width){
    x11 = x1 - graphics1.width;    
  }
  
  x2 +=speed/2;
  x22 +=speed/2;
  if(x2 > width){
    x2 = x22 - graphics2.width;    
  }
  if(x22 > width){
    x22 = x2 - graphics2.width;    
  }
  x3 +=speed/4;
  x33 +=speed/4;
  
  if(x3 > width){
    x3 = x33 - graphics3.width;    
  }
  if(x33 > width){
    x33 = x3 - graphics3.width;    
  }
}