//inspired by @414c45's  awesome artwork.
//https://twitter.com/414c45/status/1115548244359176192

const r = 300;
let num = 100;

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
}

function draw() {
	background(220);

	let cx = width / 2;
	let cy = height / 2;
	push();
	translate(cx, cy);
	//ellipse(0,0,r*2,r*2);
	for (let angle = 0; angle < 360; angle += 360 / num) {
		let d = int(sqrt(random(random())) * 10) * 8;
		let x = cos(angle) * (r + d / 2);
		let y = sin(angle) * (r + d / 2);
		ellipse(x, y, d);
	}
	for (let angle = 0; angle < 360; angle += 360 / num) {
		let d = int(sqrt(random(random())) * 10) * 8;
		let x = cos(angle) * (r - d / 2);
		let y = sin(angle) * (r - d / 2);
		ellipse(x, y, d);
	}
	pop();


	noLoop();
}