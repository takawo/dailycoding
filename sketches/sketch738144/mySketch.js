let pallete = ["#DADCDA", "#DE200C", "#3A6DA8", "#A8BACC", "#0A1D4E", "#CD4645", "#C0AEB5", "#838CA9"];

let graphics;
let num = 1000;
let movers = [];
let offset;
let bg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics);
	let n = int(random(pallete.length));
	bg = pallete[n];
	pallete.splice(n, 1);

	offset = width / 10;
	for (let i = 0; i < num; i++) {
		let x = random(width);
		let y = random(height);
		movers.push(new Mover(x, y));
	}
	background(bg);
}

function draw() {
	for (let mover of movers) {
		mover.update();
		mover.display();
	}

	for (let i = movers.length - 1; i > 0; i--) {
		let mover = movers[i];
		if (mover.life == 0) {
			movers.splice(i, 1);
		}
	}
	for (let i = movers.length; i < num; i++) {
		let angle = random(360);
		let x = random(width);
		let y = random(height);
		movers.push(new Mover(x, y));
	}
}

class Mover {
	constructor(_x, _y) {
		this.pos = createVector(_x, _y);
		this.noiseScaleX = 400;
		this.noiseScaleY = 800;
		this.noiseScaleZ = random(100, 200);
		this.vel = createVector(0, 0);
		this.life = random(1);
		this.count = int(random(1, 10));
		this.c = pallete[int(random(pallete.length))];
	}
	update() {
		// let n = noise(this.pos.x / this.noiseScaleX, this.pos.y / this.noiseScaleY, frameCount / this.noiseScaleZ);
		let n = noise(this.pos.x / this.noiseScaleX, this.pos.y / this.noiseScaleY);
		let angle = map(n, 0, 1, 0, 360);
		this.vel = createVector(cos(angle), sin(angle));
		this.pos.add(this.vel);
		this.pos.x = constrain(this.pos.x, offset, width - offset);
		this.pos.y = constrain(this.pos.y, offset, height - offset);
		this.life -= random(random(random(random()))) / 10;
		this.life = constrain(this.life, 0, 1);
	}

	display() {
		strokeWeight(map(this.life, 0, 1, 0, 5));
		stroke(this.c + "66");
		point(this.pos.x, this.pos.y);
	}
}

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 0, 0.2);
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 3);
		let h = random(1, 3);
		_graphics.noStroke();
		_graphics.fill(c);
		_graphics.ellipse(x, y, w, h);
	}
}