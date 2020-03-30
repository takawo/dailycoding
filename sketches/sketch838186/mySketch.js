let img;

function preload() {
	img = loadImage("eyes.png");
}

let num = 8;
let angleStep = 360 / num;
let rMax;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	rMax = width / 2 * 0.85;
}

function draw() {
	background(0, 0, 15);
	push();
	translate(width / 2, height / 2);
	let points = [];
	noFill();
	stroke(0, 0, 100);
	beginShape();
	let i = 0;
	for (let angle = 0; angle < 360; angle += angleStep) {
		let r = noise(angle / 100, frameCount / 300) * rMax;
		let x = cos(angle) * r * 1.5;
		let y = sin(angle) * r * 1.2;
		if (i < 3) {
			points.push(createVector(x, y));
		}
		curveVertex(x, y);
		i++;
	}
	for (let p of points) {
		curveVertex(p.x, p.y);
	}
	endShape();
  drawEyes(0, 0,rMax, this);
	pop();
}


function drawEyes(x, y, rr, g) {
	let baseEyeAngle = rr;

  g.imageMode(CENTER);
  g.push();
  g.translate(x, y);
  let nAngle = map(noise(x / 800, y / 800, frameCount / 800), 0, 1, -90, 90);
  g.translate(cos(baseEyeAngle + nAngle) * rr / 5, sin(baseEyeAngle + nAngle) * rr / 5);
  g.scale(-1, 1);
  g.image(img, 0, 0,img.width/5,img.height/5);
  g.pop();
}