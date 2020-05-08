let imgs = [];
let img_num = 50;
let rs;

function preload() {
	for (let i = 0; i < img_num; i++) {
		let img = loadImage("https://loremflickr.com/400/400/?random=" + (i * 10));
		imgs.push(img);
	}
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	rs = int(random(10000));
}

function draw() {
	// background(0, 0, 90);
	randomSeed(rs);
	let offset = width / 10;
	let margin = 0;
	offset / 5;
	if (frameCount % 360 == 270 || frameCount % 360 == 90) {
		rs = int(random(10000));
	}

	let cells = int(random(3, 12));
	let d = (width + offset * 2 - margin * (cells - 1)) / cells;

	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = i * (d + margin) + d / 2;
			let y = j * (d + margin) + d / 2;
			push();
			let img = random(imgs);
			let freqX = 1;
			random(1, 3) * (random(100) > 50 ? -1 : 1);
			let freqY = 1;
			random(1, 3) * (random(100) > 50 ? -1 : 1);
			translate(x, y);
			imageMode(CENTER);
			if (rs % 2 == 0) {
				shearX(90 * pow(sin(frameCount * freqX), 3));

			} else {

				shearY(90 * pow(sin(frameCount * freqX), 3));
			}
			image(img, 0, 0, d, d);
			pop()
		}
	}
}