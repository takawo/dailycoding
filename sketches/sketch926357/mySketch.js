let rectangles = [];
let palette = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
	separateGrid(0, 0, width);
}

function draw() {
	for (let rectangle of rectangles) {
		rectangle.display();
	}

	if (frameCount % 100 == 0) {
		rectangles = [];
		separateGrid(0, 0, width);
	}
}

class Rectangle {
	constructor(x, y, w, h) {
		this.b = new Bound(x, y, w, h);
		this.freq = int(random(5, 10));
		this.degrees = int(random(4)) * 360 / 4;
		this.id = random(10000);
	}
	display() {
		randomSeed(this.id + frameCount / this.freq);
		let g = get(this.b.x, this.b.y, this.b.w, this.b.h);
		image(g, this.b.x + 1, this.b.y + 1, this.b.w - 2, this.b.h - 2);
		noFill();
		stroke((sin(frameCount * this.freq) + 1) * 255 / 2);
		let sw = 1;
		strokeWeight(sw);
		// rect(this.b.x + sw / 2, this.b.y + sw / 2, this.b.w - sw, this.b.h - sw);
		push();
		translate(this.b.x + this.b.w / 2, this.b.y + this.b.h / 2);
		rotate(this.degrees);
		let w, h;
		if (this.degree % 180 == 0) {
			w = this.b.w;
			h = this.b.h;
		} else {
			w = this.b.h;
			h = this.b.w;
		}
		let gradient = drawingContext.createRadialGradient(0, 0, 0, 0, 0, max(w, h));
		let c1 = random(palette);
		let c2 = random(palette);
		let c3 = random(palette);
		while (c1 == c2 || c2 == c3 || c3 == c1) {
			c1 = random(palette);
			c2 = random(palette);
			c3 = random(palette);

		}
		gradient.addColorStop(0, c1);
		gradient.addColorStop(0.5, c2);
		gradient.addColorStop(1, c3);
		drawingContext.strokeStyle = gradient;
		push();
		translate(-w / 2, -h / 2);
		triangle(sw / 2, sw / 2, w - sw / 2, sw / 2, sw / 2, h - sw / 2);
		pop();
		gradient = drawingContext.createRadialGradient(0, 0, 0, 0, 0, max(w, h));

		c1 = random(palette);
		c2 = random(palette);
		c3 = random(palette);
		while (c1 == c2 || c2 == c3 || c3 == c1) {
			c1 = random(palette);
			c2 = random(palette);
			c3 = random(palette);

		}
		gradient.addColorStop(0, c1);
		gradient.addColorStop(0.5, c2);
		gradient.addColorStop(1, c3);
		drawingContext.strokeStyle = gradient;
		push();
		rotate(180);
		translate(-w / 2, -h / 2);
		triangle(sw / 2, sw / 2, w - sw / 2, sw / 2, sw / 2, h - sw / 2);
		pop();

		pop();
	}
}

class Bound {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 5) {
				separateGrid(i, j, w);
			} else {
				let rectangle = new Rectangle(int(i), int(j), int(w), int(w));
				rectangles.push(rectangle);
			}
		}
	}
}