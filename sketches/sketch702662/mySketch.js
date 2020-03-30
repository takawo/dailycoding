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
	let sep = 30;
	let ox = -r + r / sep / 4;
	for (let x = ox; x < r; x += r / sep) {
		let y = sqrt(sq(r) - sq(x));
		line(x, y, x, -y);
	}
	pop();
	noLoop();
}