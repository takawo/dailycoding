//reference: @junkiyoshi's awesome circular mover!
//https://twitter.com/junkiyoshi/status/1281920654070018048

let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let palette = createPalette(url);
let movers = [];
let movers_num = 50;
let textureGraphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	for (let i = 0; i < movers_num; i++) {
		let x = random(width);
		let y = random(height);
		mover = new Mover(x, y, 0, random(palette));
		movers.push(mover);
	}
	textureGraphics = createGraphics(width, height);
	textureGraphics.colorMode(HSB, 360, 100, 100, 100);
	textureGraphics.angleMode(DEGREES);

	let percent = 10 / 100;
	for (let i = 0; i < width * height * percent; i++) {
		let x = random(width);
		let y = random(height);
		let dw = random(3);
		let dh = random(3);
		textureGraphics.fill(0, 0, 100, 5);
		textureGraphics.noStroke();
		textureGraphics.ellipse(x, y, dw, dh);
	}
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 20);
	// blendMode(ADD);
	for (let mover of movers) {
		mover.update();
		mover.display();
	}
	image(textureGraphics, 0, 0);
}

class Mover {
	constructor(x, y, r, c) {
		this.init(x, y, r, c);
	}
	init(x, y, r, c) {
		this.color = color(c);
		this.center = createVector(x, y);
		this.rDirection = random(100) > 50 ? -1 : 1;
		this.r = r;
		this.angle = random(360);
		this.points = [];
		this.step = random(10, 30);
		this.rStep = random(0.01, 0.03) / 2;
		this.angleStep = random(0.5, 2);
		this.pointMax = 500;
		random(500, 1500);
	}
	update() {
		this.checkEdge(this.points);
		for (let i = 0; i < this.step; i++) {
			this.r += this.rStep * this.rDirection;
			this.angle += this.angleStep;
			let x = this.center.x + cos(this.angle) * this.r;
			let y = this.center.y + sin(this.angle) * this.r;
			this.points.push(createVector(x, y));
			if (this.points.length > this.pointMax) {
				this.points.shift();
			}
			if (random(100) < 0.1) {
				let angle = this.angle;
				let len = random(max(this.r * 2, 200), min(this.r * 4, 400));
				let nx = this.center.x + cos(angle) * len;
				let ny = this.center.y + sin(angle) * len;
				// this.angle = atan2(ny - this.center.y,nx - this.center.x);
				for (let j = 0; j < 1; j += 0.01) {
					let px = lerp(x, nx, j);
					let py = lerp(y, ny, j);
					// print(px,py);
					this.points.push(createVector(px, py));
					this.points.shift();
				}
				this.center = createVector(nx, ny);
				// this.r = 0;
				this.rDirection *= -1;
			}
		}
	}
	checkEdge(points) {
		for (let p of points) {
			if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
				return;
			}
		}
		this.init(random(width), random(height), 0, random(palette));
	}
	display() {
		drawingContext.shadowColor = this.color;
		drawingContext.shadowBlur = 5;
		drawingContext.shadowOffsetX = 3;
		drawingContext.shadowOffsetY = 3;
		stroke(this.color);
		noFill();
		beginShape();
		for (let p of this.points) {
			vertex(p.x, p.y);
		}
		endShape();
	}
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}