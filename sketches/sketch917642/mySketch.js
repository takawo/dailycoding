let g;
let density = 2;
let movers = [];
let movers_num = 125;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	pixelDensity(density);
	g = createGraphics(width, height);
	g.blendMode(ADD);
	g.background(0);
	for (let i = 0; i < movers_num; i++) {
		let m = new Mover(g);
		movers.push(m);
	}
}

function draw() {
	background(0, 0, 0);
	g.blendMode(BLEND);
	g.background(0, 20);
	g.blendMode(ADD);
	g.push();
	g.translate(-width * 2, -height * 2);
	g.drawingContext.shadowOffsetX = width * density * 2;
	g.drawingContext.shadowOffsetY = height * density * 2;
	for (let m of movers) {
		m.update();
		m.display();
	}
	g.pop();
	image(g, 0, 0);
	// noLoop();
	if (frameCount % 500 == 0) {
		movers.length = 0;
		for (let i = 0; i < movers_num; i++) {
			let m = new Mover(g);
			movers.push(m);
		}
	}

}

class Mover {
	constructor(g) {
		this.g = g;
		let x = random(g.width);
		let y = random(g.height);
		this.pos = createVector(x, y);
		this.d = random(10, 40);
		this.ns = 400;
		this.h = random(360);
	}
	update() {
		let n = noise(this.pos.x / this.ns,
			this.pos.y / this.ns,
			frameCount / this.ns);
		let angle = map(n, 0, 1, -180, 180);
		let len = 5;
		this.pos.add(p5.Vector.fromAngle(angle).mult(len));

		if (this.pos.x > this.g.width) this.pos.x = 0;
		if (this.pos.x < 0) this.pos.x = width;
		if (this.pos.y > this.g.height) this.pos.y = 0;
		if (this.pos.y < 0) this.pos.y = height;
	}
	display() {
		this.g.drawingContext.shadowColor = color(this.h, 100, 100, 50);
		this.g.drawingContext.shadowBlur = this.d * 2;
		this.g.ellipse(this.pos.x, this.pos.y, this.d, this.d);
	}
}