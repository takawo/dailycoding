let g;
let eyes;
let graphics;
let offset;

function setup() {
	createCanvas(800, 800);
	eyes = [];
	offset = width / 10;
	let gWidth = width + offset * 2;
	g = createGraphics(gWidth / 2, gWidth);
	g.colorMode(HSB, 360, 100, 100, 100);
	separateGrid(0, 0, g.height, g);
}

function draw() {
	background(220);
	randomSeed(0);
	g.clear();

	for (let eye of eyes) {
		eye.update();
		eye.render();
	}

	push();
	translate(-offset, -offset);
	image(g, 0, 0);
	pop();
	push();
	translate(width + offset, -offset);
	scale(-1, 1);
	image(g, 0, 0);
	pop();
	//noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 2) * 2);
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				//rect(i,j,w,w);
				let o = w / 10;
				let b = new Bound(i + o, j + o, w - o * 2, w - o * 2);
				let eye = new Eye(b, g);
				eye.update();
				eye.render();
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
		this.n = 0;
		this.ns = 100;
		this.count = 0;
		this.gate = false;
	}

	update() {
		this.n = noise(this.b.x / this.ns, this.b.y / this.ns, frameCount / this.ns * 5);
		//print(this.n);
		if (this.n > 0.7) {
			this.gate = true;
			this.count = 0;

		}
	}

	render() {
		let cx = this.b.x + this.b.w / 2;
		let cy = this.b.y + this.b.h / 2;
		let angle = atan2(mouseY - cy, mouseX - cx);
		let d = min(dist(mouseX, mouseY, cx, cy), this.b.w / 6);
		g.push();
		g.translate(cx, cy);

		if (this.gate == true) {
			g.stroke(0, 0, 0);
			g.strokeWeight(this.b.w / 8);
			g.line(-this.b.w * 1 / 3, 0, this.b.w * 1 / 3, 0);
			this.count++;

		} else {

			g.noStroke();
			g.fill(0, 0, 0);
			g.ellipse(0, 0, this.b.w * 5 / 6 + 5, this.b.h * 5 / 6 + 5);

			g.fill(0, 0, 100);
			g.ellipse(0, 0, this.b.w * 5 / 6, this.b.h * 5 / 6);

			let x = cos(angle) * d * 0.75;
			let y = sin(angle) * d * 0.75;
			g.push();
			g.translate(x / 2, y / 2);

			g.fill(0, 0, 20);
			g.ellipse(0, 0, this.b.w * 1 / 2, this.b.h * 1 / 2);
			g.fill(0, 0, 100);
			g.ellipse(x, y, this.b.w / 6, this.b.h / 6);
			g.pop();

		}
		g.pop();
		if (this.count > 8) {
			this.count = 0;
			this.gate = false;
		}
	}
}