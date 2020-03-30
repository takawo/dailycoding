let points;
let tf;
let bg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 0, 15);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let radius = sqrt(sq(width / 2) + sq(height / 2));
    let angle = random(360);
    let r = 1 - (random(random(random(1))));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }  	
}

function draw() {
	background(0, 0, 95);
	points = [];
	tf = new Transformer();

	let w = sqrt(sq(width) + sq(height));
	tf.push();
	tf.translate(width / 2, height / 2);
	tf.rotate(int(random(8)) * 360 / 8);
	separateGrid(-w / 2, -w / 2, w);
	tf.pop();

	for (let p of points) {
		for (let q of points) {
			p.drawLine(q);
		}
		p.draw();
	}
	frameRate(1);
  image(bg,0,0);	
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 3));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 66 && d > width / 10) {
				separateGrid(i, j, w);
			} else {
				let n = int(random(3, 7));
				createPoint(i, j, w, n);
			}
		}
	}
}

function createPoint(x, y, d, n) {
	let offset = 0;
	d / 20;
	tf.push();
	tf.translate(x + d / 2, y + d / 2);
	tf.rotate(int(random(4)) * 360 / 4);
	let sw = d / 5;
	let dd = (d - offset * 2 - sw) / n;
	for (let j = 0; j < n; j++) {
		for (let i = 0; i < n; i++) {
			let xx = map(i, 0, n - 1, -d / 2 + sw / 2 + offset, d / 2 - sw / 2 - offset);
			let yy = map(j, 0, n - 1, -d / 2 + sw / 2 + offset, d / 2 - sw / 2 - offset);
			tf.push();
			tf.translate(xx, yy);
			if (random(100) > 33) {
				points.push(new Point(tf.x, tf.y, dd));
			}
			tf.pop();
		}
	}
	tf.pop();

}

class Point {
	constructor(x, y, d) {
		this.pos = createVector(x, y);
		this.maxDistance = d;
	}
	equals(p) {
		return this.pos.equals(p.pos);
	}
	drawLine(p) {
		if (!this.equals(p)) {
			if (p5.Vector.dist(p.pos, this.pos) < min(p.maxDistance, this.maxDistance) * 2) {
				strokeWeight(min(p.maxDistance, this.maxDistance) / 30);
				line(p.pos.x, p.pos.y, this.pos.x, this.pos.y);
			}
		}
	}
	draw() {
		strokeWeight(this.maxDistance / 4);
		point(this.pos.x, this.pos.y);
	}
}


class Transformer {
	constructor(x, y, a, s, stack) {
		this.x = x != null ? x : 0;
		this.y = y != null ? y : 0;
		this.a = a != null ? a : 0;
		this.s = s != null ? s : 1;
		this.stack = stack != null ? stack : [];
	}
	push() {
		push();
		return this.stack.push([this.x, this.y, this.a, this.s]);
	}

	pop() {
		var ref;
		pop();
		return ref = this.stack.pop(), this.x = ref[0], this.y = ref[1], this.a = ref[2], this.s = ref[3], ref;
	}

	rotate(da) {
		rotate(da);
		return this.a += da;
	}

	scale(ds) {
		scale(ds);
		return this.s *= ds;
	}

	translate(dx, dy) {
		translate(dx, dy);
		this.x += this.s * dx * cos(this.a) - this.s * dy * sin(this.a);
		return this.y += this.s * dy * cos(this.a) + this.s * dx * sin(this.a);
	}
}