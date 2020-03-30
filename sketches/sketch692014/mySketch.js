let movers;
let movers_num;
let cells;
let cols, rows;
let offset, margin;
let w, h;
let hue_num;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	//blendMode(ADD);
	init();
}

function draw() {
	//background(220,1);
	for (let mover of movers) {
		mover.update();
		mover.display();
		mover.checkBound();
	}

	if (frameCount % 1000 == 0) {
	// 	saveCanvas("output-col" + cols + "_row" + rows + ".png");
		init();
	}
}

function init() {
	clear();
	cells = int(random(4, 8));
	let n = int(random(3));
	switch (n) {
		case 0:
			cols = cells;
			rows = cells;
			break;
		case 1:
			cols = cells;
			rows = int(cells * 2);
			break;
		case 2:
			cols = int(cells * 2);
			rows = cells;
			break;
	}
	offset = 40; // random(1,2) * 50;
	margin = offset / int(random(3, 6)) * 2;
	w = (width - offset * 2 - margin * (cols - 1)) / cols;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;
	hue_num = int(random(12)) * 360 / 12;

	movers = [];
	movers_num = cells * cells;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - w);
			let y = map(j, 0, rows - 1, offset, width - offset - h);
			movers.push(new Mover(x, y, w, h));
		}
	}
	background(hue_num, 90, 65);
	drawNoise(90000);
}

function mousePressed() {
	saveCanvas("output-" + cells + "_" + frameCount + ".png");
}

function drawNoise(_n) {
	for (let i = 0; i < _n; i++) {
		let x = random(0, width);
		let y = random(0, height);
		let w = random(1, 2);
		let h = random(1, 2);
		noStroke();
		fill(0, 0, 100, random(5, 25));
		ellipse(x, y, w, h);
	}
}

class Mover {
	constructor(_x, _y, _w, _h, _n = int(random(10))) {
		let cx = _x + _w / 2;
		let cy = _y + _h / 2;
		this.pos = createVector(cx, cy);
		this.prev_pos = this.pos.copy();
		this.direction = _n;
		this.counter = 0;
		this.counterMax = int(random(1, 4)) * 25;
		this.bound = new Bound(_x, _y, _w, _h);
		this.isEdge = false;

	}
	checkBound() {
		let x = constrain(this.pos.x, this.bound.x, this.bound.x + this.bound.w);
		let y = constrain(this.pos.y, this.bound.y, this.bound.y + this.bound.h);
		let halfX = this.bound.x + this.bound.w / 2;
		let halfY = this.bound.x + this.bound.w / 2;
		if ((this.pos.x != x && this.pos.y != y) || (int(x) == int(halfX) && this.pos.y != y) || (int(y) == int(halfY) && this.pos.x != x)) {
			this.isEdge = true;
			this.changeDirection();
		} else {
			this.isEdge = false;
		}
		this.pos.x = x;
		this.pos.y = y;
	}
	changeDirection() {
		this.counter = 0;
		let n = this.direction;
		while (n == this.direction) {
			n = int(random(10));
		}
		this.direction = n;
		this.counterMax = int(random(2, 6)) * 25;

		fill(0, 0, 0, 50);
		noStroke();
		ellipse(this.pos.x, this.pos.y, (this.bound.w + this.bound.h) / 20);

	}

	update() {
		this.prev_pos = this.pos.copy();
		if (this.direction != 9) {
			let vel = createVector(cos(this.direction * 360 / 8), sin(this.direction * 360 / 8));
			vel.mult((this.bound.w + this.bound.h) / 100);
			this.pos.add(vel);
			this.counter += 0.5;
		} else {
			this.counter++;
		}
		if (this.counter > this.counterMax) {
			this.changeDirection();
		}
	}

	display() {
		if (this.isEdge) {
			fill(0, 0, 0, 50);
			noStroke();
			ellipse(this.pos.x, this.pos.y, (this.bound.w + this.bound.h) / 20);
		} else {
			stroke(0, 0, 0, 50);
			strokeWeight((this.bound.w + this.bound.h) / 80);
			noFill();
			line(this.pos.x, this.pos.y, this.prev_pos.x, this.prev_pos.y);
		}
	}
}

class Bound {
	constructor(_x, _y, _w, _h) {
		this.x = _x;
		this.y = _y;
		this.w = _w;
		this.h = _h;
	}
	display() {
		rect(this.x, this.y, this.w, this.h);
	}
}