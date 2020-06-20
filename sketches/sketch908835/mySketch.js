let birthVoice;
let fft;
let button;
let texture;

function preload() {
	birthVoice = loadSound("baby.wav");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	texture.stroke(0, 0, 100, 8);

	for (let i = 0; i < width * height * 10 / 100; i++) {
		texture.strokeWeight(random(3));
		texture.point(random(width), random(height));
	}

}

function draw() {
	background(0, 0, 15);

	let arr = birthVoice.getPeaks();

	let offset = width / 10;
	let x = -offset;
	let y = -offset;
	let xStep, yStep;
	while (y < height + offset) {
		yStep = random(random()) * height / 5;
		if (y + yStep > height + offset) yStep = height + offset - y;
		x = -offset;
		while (x < width + offset) {
			xStep = random(random()) * width / 2;
			if (x + xStep > width + offset) xStep = width + offset - x;
			drawSpectrum(x, y, xStep, yStep, arr);
			x += xStep;
		}
		y += yStep;
	}
	image(texture, 0, 0);
	noLoop();
}

function drawSpectrum(x, y, w, h, arr) {
	// rect(x,y,w,h);
	push();
	translate(x, y + h / 2);
	for (let i = 0; i < arr.length; i++) {
		let xx = map(i, 0, arr.length - 1, 0, w);
		let yy = map(abs(arr[i]), 0, 1, 0, h);
		stroke(0, 0, 100, 30);
		line(xx, -yy, xx, yy);
	}
	pop();
}