let eyes = [];
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	let percent = 10 / 100;
	graphics.stroke(0, 10);
	for (let i = 0; i < graphics.width * graphics.height * percent; i++) {
		graphics.point(random(graphics.width),
			random(graphics.height));
	}
	let offset = width / 10;
	separateGrid(-offset, -offset, width + offset * 2);
}

function draw() {
	background(0, 0, 95);
	for (let eye of eyes) {
		eye.render();
	}
	image(graphics, 0, 0);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 10) {
				separateGrid(i, j, w);
			} else {
				//rect(i,j,w,w);
				let o = w / 10;
				let b = new Bound(i + o, j + o, w - o * 2, w - o * 2);
				let eye = new Eye(b);
				eyes.push(eye);
			}
		}
	}
}

class Bound {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	checkBound(m) {
		if (m.pos.x - m.d / 2 < this.x) m.pos.x = this.x + m.d / 2;
		if (m.pos.x + m.d / 2 > this.x + this.w) m.pos.x = this.x + this.w - m.d / 2;
		if (m.pos.y - m.d / 2 < this.y) m.pos.y = this.y + m.d / 2;
		if (m.pos.y + m.d / 2 > this.y + this.h) m.pos.y = this.y + this.h - m.d / 2;
	}
	render() {
		fill(bg);
		stroke(0, 0, 100);
		strokeWeight(.25);
		rect(this.x, this.y, this.w, this.h);
	}
}

class Eye {
	constructor(b) {
		this.b = b;
	}
	render() {
		let cx = this.b.x + this.b.w / 2;
		let cy = this.b.y + this.b.h / 2;
		let angle = atan2(mouseY - cy, mouseX - cx);
		let d = min(dist(mouseX, mouseY, cx, cy), this.b.w / 6);
		push();
		translate(cx, cy);
		noStroke();
		fill(0, 0, 0);
		ellipse(0, 0, this.b.w * 5 / 6 + 5, this.b.h * 5 / 6 + 5);

		fill(0, 0, 100);
		ellipse(0, 0, this.b.w * 5 / 6, this.b.h * 5 / 6);

		let x = cos(angle) * d*0.75;
		let y = sin(angle) * d*0.75;
		push();
		translate(x / 2, y / 2);

		fill(0, 0, 20);
		ellipse(0, 0, this.b.w * 1 / 2, this.b.h * 1 / 2);
		fill(0, 0, 100);
		ellipse(x, y, this.b.w / 6, this.b.h / 6);
		pop();
		pop();
	}
}