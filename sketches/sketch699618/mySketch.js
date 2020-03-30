let movers = [];
let tf;
let pallete = ["#E76F51", "#F4A261", "#E9C46A", "#2A9D8F", "#264653"];
let c1 = -1;
let c2 = -1;
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	rectMode(CENTER);
	background(220);
	init();
}

function init() {

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics);

	tf = new Transformer();
	let offset = width / 10;
	let w = width - offset * 2;
	let h = height - offset * 2;
	tf.push();
	tf.translate(offset, offset);
	recursiveRect(0, 0, w, h, int(random(3, 8)));
	tf.pop();
}

function draw() {
	background(0, 0, 10);
	for (let mover of movers) {
		mover.update();
		mover.display();
	}
	image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(0, 0, 100, 3);
		_graphics.ellipse(x, y, w, h);
	}
}


function recursiveRect(_x, _y, _w, _h, _depth) {
	let rotate_num = int(sqrt(random()) * 4);
	tf.push();
	tf.translate(_x + _w / 2, _y + _h / 2);
	//rectMode(CENTER);
	let w, h;
	if (rotate_num % 2 == 1) {
		w = _h;
		h = _w;
	} else {
		w = _w;
		h = _h;
	}
	tf.rotate(rotate_num * 90);
	tf.push();
	tf.translate(w / 4, 0);
	c1 = int(random(pallete.length));
	while (c1 == c2) {
		c1 = int(random(pallete.length));
	}
	movers.push(new Mover(tf, new Bound(w / 2, h), tf.a, c1));

	tf.pop();
	tf.push();
	tf.translate(-w / 4, 0);
	c2 = c1;
	while (c2 == c1) {
		c2 = int(random(pallete.length));
	}
	movers.push(new Mover(tf, new Bound(w / 2, h), tf.a, c2));

	tf.pop();
	noFill();

	if (_depth > 0 && (w / 2 > width / 100 && h > height / 100)) {
		movers.splice(movers.length - 2, 2);
		recursiveRect(-w / 2, -h / 2, w / 2, h, _depth - 1);
		recursiveRect(0, -h / 2, w / 2, h, _depth - 1);
	}
	tf.pop();
}

class Bound {
	constructor(_w, _h) {
		this.w = _w;
		this.h = _h;
	}
}

class Mover {
	constructor(_tf, _bound, _angle, _c1) {
		this.c1 = _c1;
		this.c2 = this.c1;
		while (this.c2 == this.c1) {
			this.c2 = int(random(pallete.length));
		}
		this.origin = createVector(_tf.x, _tf.y);
		this.pos = createVector(_tf.x, _tf.y);
		this.origin_angle = _angle;
		this.bound = _bound;
		this.d = sqrt(sq(this.bound.w / 2) + sq(this.bound.h / 2)) / 6;
		this.d = min(this.d, this.bound.w / 4, this.bound.h / 4);
		if (this.origin_angle % 180 == 90) {
			let temp = this.bound.w;
			this.bound.w = this.bound.h;
			this.bound.h = temp;
		}
		let angle = int(random(12)) * 360 / 12; // this.origin_angle;
		let len = random(.3, 1);
		this.vel = createVector(cos(angle) * len, sin(angle) * len);
	}
	update() {
		this.pos.add(this.vel);
		if (this.pos.x - this.d < this.origin.x - this.bound.w / 2 || this.pos.x + this.d > this.origin.x + this.bound.w / 2) {
			this.vel.x *= -1;
		}
		if (this.pos.y - this.d < this.origin.y - this.bound.h / 2 || this.pos.y + this.d > this.origin.y + this.bound.h / 2) {
			this.vel.y *= -1;
		}
	}
	display() {
		push();
		translate(this.origin.x, this.origin.y);
		fill(pallete[this.c2]);
		noStroke();
		rect(0, 0, this.bound.w, this.bound.h);
		pop();
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.origin_angle);
		//rect(0,0,this.bound.w,this.bound.h);
		fill(pallete[this.c1]);
		noStroke();
		ellipse(0, 0, this.d * 2, this.d * 2);
		pop();
	}
}