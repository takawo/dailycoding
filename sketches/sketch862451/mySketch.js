let movers = [];
let mover_num = 350;
let pallete = ["#DADCDA", "#DE200C", "#3A6DA8", "#A8BACC", "#0A1D4E", "#CD4645", "#C0AEB5", "#838CA9"];
let ns;
let offset;

function setup() {
	createCanvas(800, 800);
	pixelDensity(1);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	background(0, 0, 0);

	ns = random(1000);
	offset = width / 10;

	for (let i = 0; i < mover_num; i++) {
		let x = random(offset, width - offset);
		let y = random(offset, height - offset);
		movers.push(new Mover(x, y));
	}
	// image(img, 0, 0, width, height);
}

function draw() {
	if (frameCount % 1000 == 0) {
		ns = random(10000);
		background(0, 0, 0);
	}
	noiseSeed(ns);

	for (let i = 0; i < 5; i++) {
		for (let m of movers) {
			m.update();
			m.display();
		}
	}

}

class Mover {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.prev_pos = this.pos.copy();
		this.vel = createVector(0, 0);
		this.noiseScale = 400;
		this.len = 1;
		this.strokeColor = random(pallete);
		this.strokeBlurColor = this.strokeColor
	}
	update() {
		let n = int(noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale) * 9);
		let angle = n * 360 / 8;
		this.vel = createVector(cos(angle) * this.len, sin(angle) * this.len);
		this.pos.add(this.vel);
		let isBorder = false;
		if (this.pos.x < offset || this.pos.x > width - offset || this.pos.y < offset || this.pos.y > height - offset) {
			isBorder = true;
		}

		if (random(100) < 1 || isBorder) {
			this.pos.x = random(offset, width - offset);
			this.pos.y = random(offset, height - offset);
			this.prev_pos = this.pos.copy();
			this.strokeColor = random(pallete);
			this.strokeBlurColor = this.strokeColor
		}
	}
	display() {
		drawingContext.shadowColor = this.strokeBlurColor;
		drawingContext.shadowBlur = 5;
		stroke(this.strokeColor);
		line(this.pos.x, this.pos.y, this.prev_pos.x, this.prev_pos.y);
		this.prev_pos = this.pos.copy();
	}
}