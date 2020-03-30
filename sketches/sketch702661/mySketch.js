function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	frameRate(1);
}

function draw() {
	background(220);

	let cx = width / 2;
	let cy = height / 2;

	let r = width / 2 * 0.8;
	push();
	translate(cx, cy);
	rotate(45);
	let angleStep = 180 / 40;
	for (let angle = 0; angle < 180; angle += angleStep) {
		let x1 = cos(angle) * r;
		let y1 = sin(angle) * r;
		let x2 = cos(-angle) * r;
		let y2 = sin(-angle) * r;
		line(x1, y1, x2, y2);
	}
	pop();
	noLoop();
}