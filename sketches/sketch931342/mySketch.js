//reference: @junkiyoshi's awesome circular mover!
//https://twitter.com/junkiyoshi/status/1281920654070018048
let url = "https://coolors.co/d00000-ffba08-3f88c5-032b43-136f63";
let palette = createPalette(url);
let bgColor;
let textureGraphics;

let movers;
let mover_num = 100;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();

	textureGraphics = createGraphics(width, height);
	textureGraphics.colorMode(HSB, 360, 100, 100, 100);
	textureGraphics.angleMode(DEGREES);

	let percent = 5 / 100;
	for (let i = 0; i < width * height * percent; i++) {
		let x = random(width);
		let y = random(height);
		let dw = random(3);
		let dh = random(3);
		textureGraphics.fill(0, 0, 100, 8);
		textureGraphics.noStroke();
		textureGraphics.ellipse(x, y, dw, dh);
	}
}

function init() {
	movers = [];
	palette = createPalette(url);
	bgColor = color(palette.splice(int(random(palette.length)), 1)[0]);
	for (let i = 0; i < mover_num; i++) {
		let x = random(width);
		let y = random(height);
		let r = random(50);
		let c = color(random(palette));
		let mover = new Mover(x, y, r, c);
		movers.push(mover);
	}
}

function draw() {
	background(bgColor);
	for (let mover of movers) {
		mover.update();
		mover.display();
	}
	if (frameCount % 200 == 0) {
		init();
	}
	image(textureGraphics, 0, 0);
}

class Mover {
	constructor(x, y, r, c) {
		this.init(x, y, r, c);
	}
	init(x, y, r, c) {
		this.r = r;
		this.rStep = 0.05;
		this.rDirection = random(100) > 50 ? -1 : 1;
		this.points = [];
		let angle = random(360);
		this.angleStep = random(5, 10) / 2 * (random(100) > 50 ? -1 : 1);
		this.center = createVector(x + cos(angle) * this.r,
			y + sin(angle) * this.r);
		this.angle = atan2(this.center.y - y, this.center.x - x);
		this.color = c;
		this.pointsLimit = 200;
	}
	update() {
		if (this.r < 0 || this.r > 80) {
			this.rDirection *= -1;
			this.angleDirection *= -1;
		}
		if (this.points.length > this.pointsLimit) {
			this.points.shift();
		}
		if (random(100) < 1 && this.points.length > 0) {
			this.pivot();
		}
		this.angle += this.angleStep;
		this.r += this.rDirection * this.rStep;
		this.checkEdge(this.points);
	}
	pivot() {
		let p = this.points[this.points.length - 1];
		let angle = atan2(p.y - this.center.y, p.x - this.center.x);
		this.center = createVector(p.x + cos(angle) * this.r,
			p.y + sin(angle) * this.r);
		this.angle += 179;
		this.angleStep *= -1;

	}
	display() {
		let x = this.center.x + cos(this.angle) * this.r;
		let y = this.center.y + sin(this.angle) * this.r;
		this.points.push(createVector(x, y));
		push();
		noFill();
		stroke(this.color);
		let shadowColor = this.color;
		// shadowColor.setAlpha(255);
		// strokeWeight(2);
		drawingContext.shadowColor = color(0, 0, 100, 33);
		drawingContext.shadowBlur = 15;
		drawingContext.shadowOffsetX = 5;
		drawingContext.shadowOffsetY = 5;

		beginShape();
		for (let p of this.points) {
			vertex(p.x, p.y);
		}
		endShape();
		pop();
	}
	checkEdge(points) {
		for (let p of points) {
			if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
				return;
			}
		}
		this.init(random(width), random(height), random(50), random(palette));
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