let cells, offset, margin, d;
let graphics;
let images = [];
let imageCells = [];
const step = .6;

function preload() {
	cells = int(random(2, 6));
	for (let i = 0; i < cells * cells; i++) {
		let num = int(random(10000));
		let img = loadImage("https://loremflickr.com/800/800/?random=" + num);
		images.push(img);
	}
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	offset = width / 10;
	margin = offset / 5;
	d = (width - offset * 2 - margin * (cells - 1)) / cells;
	background(0, 0, 15);
	
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = offset + i * (d + margin) + d / 2;
			let y = offset + j * (d + margin) + d / 2;
			let imageCell = new ImageCell(x, y, d, d, images[j * cells + i]);
			imageCells.push(imageCell);
		}
	}
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();
	for (let i = 0; i < width * height * 15 / 100; i++) {
		if (random(100) > 50) {
			graphics.fill(0, 0, 0, 10);
		} else {
			graphics.fill(0, 0, 100, 10);
		}
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		graphics.ellipse(x, y, w, h);
	}
}

function draw() {
	//background(220);
	for (let imageCell of imageCells) {
		imageCell.update();
		imageCell.draw();
	}
	if (frameCount * step > d) {
		imageMode(CORNER);
		image(graphics, 0, 0);
		noLoop();
	}
}

class ImageCell {
	constructor(x, y, w, h, image) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = image;
		this.mask = createGraphics(this.w, this.h);
		this.offset = 0;
		this.freq = int(random(1, 6)) / 10;
		this.direction = random(100) < 50 ? -1 : 1;
		this.step = step;
	}
	update() {
		this.mask.clear();
		this.mask.push();
		this.mask.translate(this.w / 2, this.h / 2);
		this.mask.rotate(-90);
		this.mask.noFill();
		this.mask.stroke(255);
		this.mask.strokeWeight(2);
		this.mask.beginShape();
		for (let angle = 0; angle < 360; angle += 1) {
			let r = (1 - sq(noise((this.x + this.w / 2) / 150 + sin(tan(frameCount / 50) + angle / 2) * 3,
				(this.y + this.h / 2) / 150 + cos(-frameCount / 10 + angle / 2) * 2,
				(frameCount) / 25))) * this.w / 2;
			this.mask.vertex(cos(angle) * r, sin(angle) * r);
		}
		this.mask.endShape(CLOSE);
		this.mask.pop();
	}
	crop(image, x, y, w, h) {
		var cropped = createImage(w, h);
		cropped.copy(image, x, y, x + w, y + h, 0, 0, x + w, y + h)
		return cropped;
	}
	draw() {
		imageMode(CENTER);
		let img2 = this.crop(this.img, this.offset, this.offset, this.img.width - this.offset, this.img.height - this.offset);
		img2.mask(this.mask);
		push();
		translate(this.x, this.y);
		rotate(frameCount * this.freq * this.direction);
		//image(this.mask, 0, 0, frameCount * 3, frameCount * 3);
		image(img2, 0, 0, frameCount * this.step, frameCount * this.step);
		pop();
	}
}


function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 100, 7);
	for (let i = 0; i < width * height * constrain(_n / 100, 0, 1); i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(c);
		_graphics.ellipse(x, y, w, h);
	}
}