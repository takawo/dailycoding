// this code is inspired by Arthur Shapiro's tweet. https://twitter.com/agshapiro2/status/1136438205417492480
 
let offset;
let graphics;
let isVisible = true;
let bg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	offset = width / 8;

	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(10000, bg);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.translate(width / 2, height / 2);
	graphics.rectMode(CENTER);
	graphics.stroke(0, 0, 50);
	graphics.strokeWeight(50 * 2);
	graphics.noFill();
	graphics.rect(90 * 2, 0, 90 * 2, 90 * 2);
	graphics.rect(-90 * 2, 0, 90 * 2, 90 * 2)
}

function draw() {
	background(0, 0, 95);

	let b = map(sin(frameCount * 5), -1, 1, 0, 100);
	let d = width / 2 - offset;

	push();
	translate(width / 2 - d / 2 - offset / 4, height / 2);
	fill(0, 0, 90);
	noStroke();
	ellipse(0, 0, width / 2 - offset, height / 2 - offset);
	fill(0, 0, b);
	noStroke();
	ellipse(0, 0, width / 6, height / 6);
	pop();

	push();
	fill(0, 0, 10);
	noStroke();
	translate(width / 2 + d / 2 + offset / 4, height / 2);
	ellipse(0, 0, width / 2 - offset, height / 2 - offset);
	fill(0, 0, b);
	noStroke();
	ellipse(0, 0, width / 6, height / 6);
	pop();
	if (isVisible) {
		imageMode(CENTER);
		image(graphics, mouseX, mouseY);
	}
	image(bg, 0, 0);
}

function mousePressed() {
	isVisible = !isVisible;
}

function drawNoiseBackground(_n, _graphics) {
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 3);
		let h = random(1, 3);
		_graphics.noStroke();
		_graphics.fill(0, 0, 0, 5);
		_graphics.ellipse(x, y, w, h);
	}
}