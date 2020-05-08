let cells, cols, rows;
let offset, margin;
let w, h;
let graphics;
let ww;
let texture;
let movers = [];


function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
}

function draw() {
	// noLoop();
	blendMode(BLEND);
	background(0, 0, 90);
	blendMode(BURN);

	push();
	translate(width / 2, height / 2);
	rotate(45);
	translate(-ww / 2, -ww / 2);
	for (let k of movers) {
		if (k != undefined) {
			for (let l of k) {
				if (l != undefined) {
					for (let m of l) {
						m.update();
						m.display();
					}
				}
			}
		}
	}
	pop();
	blendMode(BLEND);
	image(texture, 0, 0);
}

function init() {
	cells = int(random(5, 15));
	cols = cells;
	rows = cells;

	ww = sqrt(width * width + height * height);
	offset = ww / 20;
	margin = offset / 5;
	w = (ww - offset * 2 - margin * (cols - 1)) / cols;
	h = (ww - offset * 2 - margin * (rows - 1)) / rows;

	background(0, 0, 90);

	push();
	translate(width / 2, height / 2);
	rotate(45);
	let jStep = 1;
	for (let j = 0; j < rows; j += jStep) {
		let iStep = 1;
		jStep = int(random(1, 3));
		if (j + jStep > rows) {
			jStep = rows - j;
		}
		let ch = h * jStep + margin * (jStep - 1);
		movers[j] = [];
		for (let i = 0; i < cols; i += iStep) {
			movers[j][i] = [];
			let x = map(i, 0, cols - 1, offset, ww - offset - w);
			let y = map(j, 0, rows - 1, offset, ww - offset - h);
			iStep = int(random(1, 3));
			if (i + iStep > cols) {
				iStep = cols - i;
			}
			let cw = w * iStep + margin * (iStep - 1);
			// rect(x, y, cw, ch);
			for (let k = 0; k < 10; k++) {
				if (random(100) < 33) {
					movers[j][i].push(new Mover(x, y, cw, ch, k));
				}
			}
			while (movers[j][i].length < 3) {
				movers[j][i].push(new Mover(x, y, cw, ch, int(random(9))));
			}
		}
	}
	pop();

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	texture.stroke(0, 0, 0, 8);
	for (let i = 0; i < width * height * 10 / 100; i++) {
		texture.strokeWeight(random(2));
		texture.point(random(width), random(height));
	}
}


class Mover {
	constructor(_x, _y, _w, _h, _n) {
		this.bound = new Bound(_x, _y, _w, _h);
		this.collection = [];
		this.current = _n;
		if (this.current == 8) {
			this.pos = createVector(_x + _w / 2, _y + _h / 2);
		} else {
			let px = _x + _w / 2 + cos(_n / 8 * 360) * _w;
			let py = _y + _h / 2 + sin(_n / 8 * 360) * _h;
			px = constrain(px, _x, _x + _w);
			py = constrain(py, _y, _y + _h);
			this.pos = createVector(px, py);
		}
		this.prev_pos = this.pos.copy();
		this.changeTarget();
		this.ratio = random(1);
		this.speed = random(100) > 50 ? 1 / 300 : 1 / 150;
		this.collection.push(this.prev_pos.copy());
		this.isFill = random(100) > 50;
	}

	update() {
		this.prev_pos = this.pos.copy();
		this.pos = p5.Vector.lerp(this.pos, this.target, this.ratio);
		this.ratio += this.speed;
		let d = p5.Vector.dist(this.pos, this.target);
		if (this.ratio > 1 || d < .5) {
			if (this.collection.length > 3) {
				this.collection.shift();
			}
			this.collection.push(this.pos.copy());
			this.ratio = 0;
			this.pos = this.target.copy();
			this.prev_pos = this.pos.copy();
			this.changeTarget();
		}

		if (random(1000) < 1) {
			this.isFill = !this.isFill;
		}

	}
	changeTarget() {
		this.next = this.current;
		while (this.next == this.current) {
			this.next = int(random(9))
		}
		if (this.next == 8) {
			this.target = createVector(this.bound.x + this.bound.w / 2, this.bound.y + this.bound.h / 2);
		} else {
			let tx = this.bound.x + this.bound.w / 2 + cos(this.next / 8 * 360) * this.bound.w;
			let ty = this.bound.y + this.bound.h / 2 + sin(this.next / 8 * 360) * this.bound.h;
			tx = constrain(tx, this.bound.x, this.bound.x + this.bound.w);
			ty = constrain(ty, this.bound.y, this.bound.y + this.bound.h);
			this.target = createVector(tx, ty);
		}
	}
	display() {
		noStroke();
		stroke(0, 0, 100);
		let tc = abs(this.target.x + this.target.y) % 360;
		let pc = abs(this.prev_pos.x + this.prev_pos.y) % 360;
		let hue = lerp(pc, tc, this.ratio);
		if (this.isFill) {
			fill(hue, 80, 100);
			noStroke();
		} else {
			stroke(hue, 0, 0);
			strokeWeight(0.25);
			noFill();
		}
		//noFill();
		beginShape();
		for (let s of this.collection) {
			vertex(s.x, s.y);
		}
		vertex(this.pos.x, this.pos.y);
		endShape();
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
		// noFill();
		// rect(this.x, this.y, this.w, this.h);
	}
}