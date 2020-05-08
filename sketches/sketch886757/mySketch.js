let pallete = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];
// let graphices = [];
let movers = [];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	for (let i = 0; i < pallete.length; i++) {
		// graphices.push(createGraphics(width, height));
		for (let j = 0; j < 30; j++) {
			let m = new Mover(random(width), random(height), i);
			movers.push(m);
		}
	}
	background(0, 0, 90);
}

function draw() {
	for (let m of movers) {
		m.update();
		m.display();
	}
	if (frameCount % 500 == 0) {
		background(0, 0, 90);
	}
}

class Mover {
	constructor(x, y, n) {
		this.pos = createVector(x, y);
		this.id = n;
		this.ns = n * 100 + 100;
	}
	update() {
		noiseSeed(this.id * 100);
		noiseDetail(this.id * 100);
		let n = noise(this.pos.x / this.ns, this.pos.y / this.ns, frameCount / this.ns);
		let angle = n * 360;
		this.pos.add(createVector(cos(angle), sin(angle)).mult(1.5));
		if (this.pos.x > width) this.pos.x = 0;
		if (this.pos.x < 0) this.pos.x = width;
		if (this.pos.y > height) this.pos.y = 0;
		if (this.pos.y < 0) this.pos.y = height;
	}
	display() {
		fill(pallete[this.id]);
		noStroke();
		drawingContext.shadowColor = color(pallete[this.id]);
		drawingContext.shadowBlur = 10;
		ellipse(this.pos.x, this.pos.y, 3, 3);
	}
}