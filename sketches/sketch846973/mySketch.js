// reference(optical illusion) : https://twitter.com/jagarikin/status/1229954803603689473

let img;
let freq = 0;
let t = 0;

function preload() {
	img = loadImage("rainbow.png");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	imageMode(CENTER);
}

function draw() {
	background(0, 0, 50);
	randomSeed(frameCount / 200);
	if(frameCount%200 == 0) t = 0;

	//   push();
	//   translate(width/3,height/2);
	//   rotate(frameCount*25);
	//   image(img,0,0,width/3,width/3);
	//   pop();  

	//   push();
	//   translate(width/3*2,height/2);
	//   rotate(frameCount*-25);
	//   image(img,0,0,width/3,width/3);
	//   pop();  

	freq = map(sin(t / 4), -1, 1, 2, 15);
	t++;
	separateGrid(0, 0, width);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				push();
				translate(i + w / 2, j + w / 2);
				rotate(random(360) + t * freq * (random() > 0.5 ? -1 : 1));
				if(mouseIsPressed == false){
				fill(0,0,20);
				noStroke();
				circle(0,0,w/20);
				}
				image(img, 0, 0, w * 0.8, w * 0.8);
				pop();
			}
		}
	}
}