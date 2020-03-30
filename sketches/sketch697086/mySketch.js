let cells, cols, rows;
let offset, margin;
let w, h;
let bg;
let f = 0;
let rs;

let pallete = ["#247BA0", "#70C1B3", "#B2DBBF", "#F3FFBD", "#FF1654"];
let cPrev = -1;
let cCurrent;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	smooth();
	rs = random(10000);

	init();
}

function init() {
	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(250000, bg);

	cells = 5;
	int(random(3, 8));
	cols = cells;
	rows = cells;

	offset = (width / cols) * 1 / int(random(1, 5));
	margin = offset / int(random(1, 5));

	w = (width - (offset * 2 + margin * (cols - 1))) / cols;
	h = (height - (offset * 2 + margin * (rows - 1))) / rows;
}


function draw() {
	blendMode(NORMAL);
	background(0, 0, 10);
	blendMode(ADD);

	f = frameCount;

	randomSeed(rs);
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - w);
			let y = map(j, 0, rows - 1, offset, height - offset - h);
			const r = w / 2;
			drawSeparatedCircle(x + w / 2, y + h / 2, r);
		}
	}
	image(bg, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(0, 0, 80, 3);
		_graphics.ellipse(x, y, w, h);
	}
}

function drawSeparatedCircle(_x, _y, _r) {
	stroke(0, 0, 0, 50);
	noFill();
	let _rAngle = frameCount * 3;
	let _n = random(3, 5);
	let _dir = random(100) > 50 ? -1 : 1;
	push();
	translate(_x, _y);
	rotate(random(360) - f * _dir * 0.1);
	drawSeparatedCircleHalf(_rAngle, _r, _n, "top");
	drawSeparatedCircleHalf(_rAngle, _r, _n, "bottom");
	pop();
}

function drawSeparatedCircleHalf(_rAngle, _r, _n, _str) {
	let step;
	let prevAngle = atan2(0, -_r);
	let direction = random(100) > 50 ? -1 : 1;
	if (_str == "top") {
		prevAngle -= 360;
	}
	for (let x = -_r; x < _r; x += step) {
		step = random(1, 3) * _r / int(random(3, 10)) * 2;
		let nextX = x + step;

		cCurrent = int(random(pallete.length));
		while (cCurrent == cPrev) {
			cCurrent = int(random(pallete.length));
		}
		fill(pallete[cCurrent]);
		stroke(0, 0, 100);
		strokeWeight(1);
		beginShape();
		for (let x0 = x; x0 <= nextX; x0 += 1) {
			let angle = x0 + _rAngle;
			let y0 = cos(f * direction) * sin(f + angle) * _r / _n;
			let d = dist(x0, y0, 0, 0);
			let altAngle = atan2(y0, x0);
			if (d > _r) {
				let altX = cos(altAngle) * _r;
				let altY = sin(altAngle) * _r;
				vertex(altX, altY);
			} else {
				vertex(x0, y0);
			}
		}
		let nextY = sqrt(sq(_r) - sq(nextX));
		if (isNaN(nextY)) {
			nextY = 0;
		}
		let currentAngle;
		if (_str == "bottom") {
			currentAngle = atan2(nextY, nextX);
			for (let angle = currentAngle; angle < prevAngle; angle += 1) {
				let x = cos(angle) * _r;
				let y = sin(angle) * _r;
				vertex(x, y);
			}
		} else
		if (_str == "top") {
			currentAngle = atan2(-nextY, nextX);
			for (let angle = currentAngle; angle > prevAngle; angle -= 1) {
				let x = cos(angle) * _r;
				let y = sin(angle) * _r;
				vertex(x, y);
			}
		}
		endShape(CLOSE);
		prevAngle = currentAngle;
		cPrev = cCurrent;
	}
}