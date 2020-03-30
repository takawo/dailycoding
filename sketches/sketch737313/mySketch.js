let graphicsArr = [];
let emojiArr = [];
let rs;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  emojiArr = createEmojiArr();
  for (let i = 0; i < emojiArr.length; i++) {
    let emoji = emojiArr[i];
    let graphics = createGraphics(32, 32);
    graphics.textSize(graphics.width);
    graphics.textAlign(CENTER, CENTER);
    graphics.text(emoji, graphics.width / 2, graphics.height / 2);
    graphicsArr.push(graphics);
  }
  rs = random(10000);
  background(0,0,0);
}

function draw() {
  //background(0,0,0,10);
  randomSeed(rs);  
  let rMax = sqrt(sq(width / 2) + sq(height / 2));
  let j = 0;
  for (let r = rMax; r > 0; r -= rMax / 20) {
    push();
    translate(width / 2, height / 2);
    rotate(random(12) * 360 / 12 + (j%2==0? -1:1) * frameCount/random(8,16));
    let index = int(random(emojiArr.length));
    let i = 0;
    let loop = int(random(2,8));
    let step = int(random(10, 50));
    let angleStep = 360 / step;    
    for (let angle = 0; angle < 360; angle += angleStep) {
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      push();
      translate(x, y);
      rotate(angle+90);
      imageMode(CENTER);
      scale(map(r,0,rMax,1,2));
      image(graphicsArr[(index + i%loop)%graphicsArr.length], 0, 0);
      pop();
      i++;
    }
    j++;
    pop();
  }
	if (frameCount % 300 == 0) {
		rs = random(10000);
	}	
}


function createEmojiArr() {
  let arr = [];
  let emoji;
  for (let i = 128512; i < 128592; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  for (let i = 127744; i < 128318; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  return arr;
}