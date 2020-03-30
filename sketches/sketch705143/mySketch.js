let cells, cols, rows;
let offset, margin;
let w, h;
let graphics;

let moverSystems = [];
let url = "https://coolors.co/app/ef476f-ffd166-06d6a0-118ab2-073b4c";
let pallete = [];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 0);
	angleMode(DEGREES);
	init();
}

function init() {

	cells = int(random(2, 10));
	cols = cells;
	rows = cells;

	offset = width / cells / int(random(3, 8));
	margin = offset / int(random(1, 3));

	w = (width - offset * 2 - margin * (cols - 1)) / cols;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;

	pallete = createPallete(url);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(50000, graphics);

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - w);
			let y = map(j, 0, rows - 1, offset, height - offset - h);
			let r = sqrt(sq(w / 2) + sq(h / 2));
			let bound = new Bound(x, y, w, h);

			for (let m = 0; m < 4; m++) {
				let color = pallete[int(random(pallete.length))];
				let targetColor = color;
				while (color == targetColor) {
					targetColor = pallete[int(random(pallete.length))];
				}

				let moverSystem = new MoverSystem(color, targetColor);
				for (let n = 0; n < 3; n++) {
					let angle = int(random(8)) * 45;
					let mover = new Mover(angle, r, bound);
					moverSystem.movers.push(mover);
				}
				moverSystems.push(moverSystem);
			}
		}
	}
}

function draw() {
	blendMode(NORMAL);
	background(0, 0, 0, 10);
	//blendMode(DIFFERENCE);
	for (let moverSystem of moverSystems) {
		moverSystem.update();
		fill(moverSystem.color);
		noStroke();
		beginShape();
		for (let mover of moverSystem.movers) {
			mover.update();
			mover.display();
			vertex(mover.pos.x, mover.pos.y);
		}
		endShape(CLOSE);
	}

	if (frameCount % 150 == 0) {
		background(0, 0, 0);
		moverSystems = [];
		init();
	}
	image(graphics, 0, 0);
}

class Mover {
	constructor(_angle, _r, _bound) {
		this.angle = _angle;
		this.r = _r;
		this.bound = _bound;
		this.center = createVector(this.bound.x + this.bound.w / 2, this.bound.y + this.bound.h / 2);
		let direction = random(100) < 50 ? -1 : 1;
		this.angleTarget = this.angle + direction * int(random(8)) * 45;
		this.angleStep = direction * int(random(1, 5)) / 5;
		this.pos = createVector();
		this.time = 0;
	}
	update() {
		this.angle = lerp(this.angle, this.angleTarget, this.time);
		this.time += 0.001;
		if (this.time > 0.15) {
			this.time = 0;
			let direction = random(100) < 50 ? -1 : 1;
			this.angleTarget = this.angle + direction * int(random(8)) * 45;
		}
	}

	display() {
		let x = this.center.x + cos(this.angle) * this.r;
		x = constrain(x, this.bound.x, this.bound.x + this.bound.w);
		let y = this.center.y + sin(this.angle) * this.r;
		y = constrain(y, this.bound.y, this.bound.y + this.bound.h);
		this.pos = createVector(x, y);

		//ellipse(x, y, 10, 10);
	}
}

class Bound {
	constructor(_x, _y, _w, _h) {
		this.x = _x;
		this.y = _y;
		this.w = _w;
		this.h = _h;
	}
}

class MoverSystem {
	constructor(_c, _tc) {
		this.movers = [];
		this.color = _c;
		this.targetColor = _tc;
	}
	update() {
		let time = this.movers[0].time;
		this.color = lerpColor(this.color, this.targetColor, time);
		if (time == 0) {
			this.targetColor = pallete[int(random(pallete.length))];
		}
	}
}

function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');

	for (let i = 0; i < arr.length; i++) {
		let red = unhex(arr[i].substr(0, 2));
		let green = unhex(arr[i].substr(2, 2));
		let blue = unhex(arr[i].substr(4, 2));
		colorMode(RGB, 255, 255, 255);
		let c = color(red, green, blue);
		let h = hue(c);
		let s = saturation(c);
		let b = brightness(c);
		let t = 100 * 3 / 4;
		colorMode(HSB, 360, 100, 100, 100);
		c = color(h, s, b, t);
		arr[i] = c;
	}
	return arr;
}

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 100, 3);
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(c);
		_graphics.ellipse(x, y, w, h);
	}
}