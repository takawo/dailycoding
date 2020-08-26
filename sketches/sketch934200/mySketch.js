let font;
let graphices;
// let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let str = "下人の行方は、誰も知らない";
let cells, offset, margin, d;
let typos;

function preload() {
	// img = loadImage("https://loremflickr.com/800/800");
	// font = loadFont("Lato-BoldItalic.ttf");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphices = [];
	typos = [];
	for (let i = 0; i < str.length; i++) {
		let graphics = createGraphics(width, height);
		graphics.angleMode(DEGREES);
		// graphics.textFont(font);
		graphics.textSize(width);
		graphics.textStyle(BOLD);
		graphics.textLeading(0);
		graphics.textAlign(CENTER, CENTER);
		graphics.push();
		graphics.translate(width / 2, height / 2);
		// graphics.rotate(frameCount);
		graphics.text(str.substr(i, 1), 0, -width * 0.15);
		graphics.pop();
		graphices.push(graphics);
	}
	cells = int(random(1, 5));
	offset = width / 10;
	margin = offset / 5;
	d = (width - offset * 2 - margin * (cells - 1)) / cells;
	let n = 0;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = offset + i * (d + margin);
			let y = offset + j * (d + margin);
			let typo = new Typo(x, y, d, graphices[n % graphices.length]);
			typos.push(typo);
			n++;
		}
	}
}

function draw() {
	background(0, 0, 90);

	for (let typo of typos) {
		typo.display();
	}
}

function drawSeparateImage(_x, _y, img, d, sep, isHorizontal) {
	push();
	translate(_x, _y);
	// drawingContext.shadowColor = color(0,0,0);
	// drawingContext.shadowBlur = d/2;
	let scl = img.width / d;
	sepArr = getArr(_x, _y, sep);
	if (isHorizontal) {
		let x = 0;
		for (let i = 0; i < sep; i++) {
			let trimImg = img.get(int(i / sep * img.width), 0, int(img.width / sep), img.height);
			let w = int(img.width * sepArr[i]);
			noFill();
			stroke(128);
			if (mouseIsPressed) {
				rect(x, 0, w / scl, trimImg.height / scl);
			}
			image(trimImg, x, 0, w / scl, trimImg.height / scl);
			x += w / scl;
		}
	} else {
		let y = 0;
		for (let i = 0; i < sep; i++) {
			let trimImg = img.get(0, int(i / sep * img.height), img.width, int(img.height / sep));
			let h = int(img.height * sepArr[i]);
			noFill();
			stroke(128);
			if (mouseIsPressed) {
				rect(0, y, trimImg.width / scl, h / scl);
			}
			image(trimImg, 0, y, trimImg.width / scl, h / scl);
			y += h / scl;
		}
	}
	pop();
}

class Typo {
	constructor(x, y, d, g) {
		this.pos = createVector(x, y);
		this.d = d;
		this.g = g;
		this.isHorizontal = random(100) > 50;
		this.sep = 3;
		int(random(2, 5))
	}
	update() {

	}
	display() {
		drawingContext.shadowColor = color(0, 0, 0, 50);
		drawingContext.shadowBlur = this.d / 10;
		drawSeparateImage(this.pos.x, this.pos.y, this.g, this.d, this.sep, this.isHorizontal);
	}
}

function getArr(x, y, sep) {
	let arr = [];
	let arrSum = 0;
	for (let i = 0; i < sep; i++) {
		// let n = noise(x,y,i*100+frameCount / 50);
		let n = sin(x * y * cells + i * frameCount);
		arr.push(n);
		arrSum += n;
	}
	for (let i = 0; i < sep; i++) {
		arr[i] /= arrSum;
	}
	return arr;
}