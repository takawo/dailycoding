let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);

  graphics = createGraphics(width/100, height/100);
  graphics.textAlign(CENTER,CENTER);
  graphics.textSize(graphics.width/2);
  graphics.text("?",graphics.width/2,graphics.height/2);
  background(200,80,15);

}

function draw() {
  
	background(200,80,15,30);
  
	for(let i = 1; i > 0; i -= 1/1000){
    imageMode(CENTER);
    push();
    translate(width/2,height/2);
    push();
    let r = map(i,0,1,width/8,width/2);
    let angle = i * 100 - frameCount;
    let x = cos(angle+ sqrt(i)*180) * r;
    let y = sin(angle+ sqrt(i)*360) * r;
    translate(x,y);
    scale(sqrt(i)*10);
    image(graphics,0,0);
    pop();
    pop();
  }
}