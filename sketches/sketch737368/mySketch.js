let graphicsArr = [];
let emojiArr = [];
let rs;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  emojiArr = createEmojiArr();
  for (let i = 0; i < emojiArr.length; i++) {
    let emoji = emojiArr[i];
    let graphics = createGraphics(16, 16);
    graphics.textSize(graphics.width);
    graphics.textAlign(CENTER, CENTER);
    graphics.text(emoji, graphics.width / 2, graphics.height / 2);
    graphicsArr.push(graphics);
  }
  rs = random(10000);
  background(0, 0, 0);
}

function draw() {
  //background(0,0,0,10);
  randomSeed(rs);
  let rMax = sqrt(sq(width / 2) + sq(height / 2))*0.5;
  let j = 0;
    let step = int(random(3,7));
  for (let r = rMax; r > 0; r -= rMax / 30) {
    push();
    translate(width / 2, height / 2);
		switch(step){
			case 3:
				    rotate(30);
				break;
			case 4:
				    rotate(45);
				break;
			case 5:
				    rotate(360/5/2);
				break;
			case 6:
				    rotate(360/6/2);
				break;
		}
    //rotate(random(12) * 360 / 12 + (j % 2 == 0 ? -1 : 1) * frameCount / random(8, 16));
    let index = int(random(emojiArr.length));
    let i = 0;
    let loop = int(random(2, 8));
    int(random(10, 50));
    let angleStep = 360 / step;
    for (let angle = 0; angle < 360; angle += angleStep) {
      let x1 = cos(angle) * r;
      let y1 = sin(angle) * r;
      let x2 = cos(angle+angleStep) * r;
      let y2 = sin(angle+angleStep) * r;
      let lerpStep = map(r,0,rMax,1/10,1/20);
      for (let n = 0; n < 1; n += lerpStep) {
        let x = lerp(x1, x2, n);
        let y = lerp(y1, y2, n);
        let lerpAngle = atan2(y,x);
        push();
        translate(x, y);
        rotate(lerpAngle + 90);
        imageMode(CENTER);
        scale(map(r, 0, rMax, 0.5,1));
        image(graphicsArr[(index + i % loop) % graphicsArr.length], 0, 0);
				i++;
        pop();
      }
    }
    j++;
    pop();
  }
  if (frameCount % 100 == 0) {
    rs = random(10000);
    background(0,0,0);
  }
  //noLoop();
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