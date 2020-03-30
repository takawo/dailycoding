let cells;
let cols, rows;
let offset;
let margin;
let w, h;
let sep_num = 100;
let bg;

let pallete = ["#36B1BF", "#4AD9D9", "#FFCB05", "#E9FFDF", "#F23C50"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	blendMode(ADD);
	background(0, 0, 0);
	init();
	
	//saveCanvas("output.png");
}

function init() {
	cells = max(int(random(1, 4)) * int(random(1, 4)), 2);
	cols = cells;
	rows = cells;
	offset = int(random(3)) * 20 + 20;
	margin = offset / int(random(2, 4));

	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	bg.background(int(random(12)) * 360 / 12, 80, 10);
	drawNoiseBackground(50000, bg);
	image(bg, 0, 0);

	w = (width - (offset * 2 + margin * (cols - 1))) / cols;
	h = (height - (offset * 2 + margin * (rows - 1))) / rows;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - w);
			let y = map(j, 0, rows - 1, offset, height - offset - h);
			//rect(x,y,w,h);

			let num = 1;
			for (let i = 0; i < num; i++) {
				drawLinesInRect(x, y, w, h, num);
			}
		}
	}
}

function drawNoiseBackground(_n, _graphics) {
	for (let i = 0; i < _n; i++) {
		let x = random(0, width);
		let y = random(0, height);
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(0, 0, 100, 5);
		_graphics.ellipse(x, y, w, h);
	}
}


function drawLinesInRect(_x, _y, _w, _h, _t) {
	let sep_num = int(random(2, 5)) * int(random(5, 8));
	let isDraw = random(100) > 50;


	push();
	translate(_x + _w / 2, _y + _h / 2);
	rotate(int(random(4)) * 90);
	translate(-_w / 2, -_h / 2);
	let stepY = _h / sep_num / random(1, 4);
	for (let y = 0; y <= _h; y += stepY) {
		let currentX = 0;
		let isDraw = true;
		while (currentX < _w) {
			let step = random(random(random(random(random(1)))));
			let stepX = map(step, 0, 1, 0, width / 3);
			let nextX = constrain(currentX + stepX, 0, _w);
			let currentY = constrain(y - stepY, 0, _h);
			let nextY = constrain(y + stepY, 0, _h);
			if (isDraw || (!isDraw) && nextX != currentX + stepX) {
				// line(x, y, nextX, y);
				rectMode(CORNERS);
				noStroke();
				let c = pallete[int(random(pallete.length))];
				fill(c + "" + hex(int(256 / _t / 2.5), 2));
				rect(currentX, currentY, nextX, nextY);
				drawPointsOnRect(currentX, currentY, nextX - currentX, nextY - currentY, c);
			}
			isDraw = !isDraw;
			currentX += stepX;
		}
		stepY = _h / sep_num / random(1, 4);
	}
	pop();
}

function drawPointsOnRect(_x, _y, _w, _h, _c) {
	let points_num = (_w * _h) / 10;
	push();
	translate(_x, _y);
	for (let i = 0; i < points_num; i++) {
		let x = random(_w);
		let y = random(_h);
		let w = int(1, 5);
		let h = int(1, 5);
		fill(_c + "" + hex(int(256 / 2), 2));
		noStroke();
		ellipse(x, y, w, h);
	}
	pop();
}