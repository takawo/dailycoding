function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);
}

function draw() {
	background(128);
	let d = 250;
	let r = d / 2 * PI;
	push();
	translate(width / 2, height / 2.5);
	stroke(255);
	let a1 = random(r / 20, r / 10);
	let a2 = random(r / 8, r / 4);
	drawingContext.setLineDash([a1, a2]);
	strokeWeight(r / 4);
	ellipse(0, 0, d, d * 0.65);
	stroke(0);
	strokeWeight(1);
	let angle = random(40, 180 - 40);
	let angle2 = angle + random(-45, 45);
	let x = cos(angle) * d / 2;
	let y = sin(angle) * d / 2 * 0.65;
	let x2 = x + cos(angle2) * d / 2;
	let y2 = y + sin(angle2) * d / 2;
	push();
	translate(x, y);
	rotate(angle2);
	noStroke();
	triangle(0, -d / 8, 0, d / 8, d / 2, 0)
	pop();
	pop();
	frameRate(1);
}