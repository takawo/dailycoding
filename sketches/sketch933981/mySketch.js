let graphices;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let font;
let typo;
let scl = 4;

function preload() {
	font = loadFont("Lato-BoldItalic.ttf");
}


function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	// drawingContext.imageSmoothingEnabled=false;

	pixelDensity(1);
	angleMode(DEGREES);
	init();
}

function init() {
	graphices = [];
	typo = [];
	for (let i = 0; i < str.length; i++) {
		for (let j = 0; j < 4; j++) {
			let angle = random(90) + j * 90;
			let graphics = new Graphics(width / scl, height / scl, str.substr(i, 1), angle, random(100) > 50);
			graphices.push(graphics);
		}
	}
	let offset = width / 10;
	separateGrid(-offset, -offset, width + offset * 2);
}


function draw() {
	background(0, 0, 95);

	for (let t of typo) {
		t.display();
	}
	// noLoop();
	if (frameCount % 100 == 0) {
		init();
	}
}


function separateGrid(x, y, d) {
	let sepNum = int(random(1, 5));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 80 && w > width / 2) {
				separateGrid(i, j, w);
			} else {
				// rect(i, j, w, w);
				let g = random(graphices);
				typo.push(new Typo(i, j, w, g));
			}
		}
	}
}

class Typo {
	constructor(x, y, w, g) {
		this.center = createVector(x, y);
		this.w = w;
		this.g = g;
	}
	update() {

	}
	display() {
		push();
		translate(this.center.x, this.center.y);
		this.g.draw(0, 0, this.w, this.w);
		pop();
	}
}

class Graphics {
	constructor(w, h, alphabet, angle = random(360), bool) {
		this.str = alphabet;
		this.angle = angle;
		this.g = createGraphics(w, h);
		this.freq = random(1, 4);
		this.g.angleMode(DEGREES);
		this.g.textSize(this.g.width * 2 / 3);
		this.g.textFont(font);
		this.g.textAlign(CENTER, CENTER);
		this.g.push();
		this.g.translate(this.g.width / 2, this.g.height / 2);
		this.g.rotate(random(360));
		this.g.text(this.str, 0, -this.g.height / 10);
		this.g.pop();
		this.isVertical = bool;
		if (this.isVertical) {
			this.imgTop = this.g.get(0, 0, this.g.width, this.g.height / 2);
			this.imgBottom = this.g.get(0, this.g.height / 2, this.g.width, this.g.height / 2);
			this.imgMiddle = this.g.get(0, this.g.height / 2, this.g.width, 1);
		} else {
			this.imgLeft = this.g.get(0, 0, this.g.width / 2, this.g.height);
			this.imgRight = this.g.get(this.g.width / 2, 0, this.g.width / 2, this.g.height);
			this.imgMiddle = this.g.get(this.g.width / 2, 0, 1, this.g.height);
		}

	}
	draw(x, y, w, h) {
		let d = map(sin(this.angle + frameCount * this.freq), -1, 1, 0, w / 2);
		push();
		translate(x + w / 2, y + h / 2);
		rotate(this.angle);
		imageMode(CENTER);
		rotate(this.angle);
		drawingContext.shadowColor = color(0, 0, 0, 33);
		drawingContext.shadowBlur = w / 2;

		if (this.isVertical) {
			image(this.imgMiddle, 0, 0, w, d);
			image(this.imgTop, 0, -d / 2 - (w / this.imgTop.width * this.imgTop.height) / 2, w, w / this.imgTop.width * this.imgTop.height);
			image(this.imgBottom, 0, +d / 2 + (w / this.imgBottom.width * this.imgBottom.height) / 2, w, w / this.imgBottom.width * this.imgBottom.height);
		} else {
			image(this.imgMiddle, 0, 0, d, w);
			image(this.imgLeft, -d / 2 - (w / this.imgLeft.height * this.imgLeft.width) / 2, 0, w / this.imgLeft.height * this.imgLeft.width, w);
			image(this.imgRight, +d / 2 + (w / this.imgRight.height * this.imgRight.width) / 2, 0, w / this.imgLeft.height * this.imgLeft.width, w);
		}

		//     image(this.imgMiddle, 0, 0, w, d);
		//     image(this.imgTop, 0, -d / 2 - (w / this.imgTop.width * this.imgTop.height) / 2, w, w / this.imgTop.width * this.imgTop.height);
		//     image(this.imgBottom, 0, +d / 2 + (w / this.imgBottom.width * this.imgBottom.height) / 2, w, w / this.imgBottom.width * this.imgBottom.height);

		// image(imgTop, 0, -d);
		// image(imgMiddle, 0, imgTop.height - d, imgMiddle.width, d * 2);
		// image(imgBottom, 0, height / 2 + d);
		// image(this.g,0,0,w,h);
		pop();
	}
}