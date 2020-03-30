const pallete = ["#D40424", "#101D29", "#223040", "#f9f9f9", "#E9F0F7"];
const cols = 6;
const rows = 6;
let offset = 40;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 80);

	const w = (width - offset * 2) / cols;
	const h = (height - offset * 2) / rows;

	for (let i = 0; i < 100000; i++) {
		let xd = random(width);
		let yd = random(height);
		let wd = random(1, 3);
		let hd = random(1, 3);
		noStroke();
		fill(0, 0, 50, 5);
		ellipse(xd, yd, wd, hd);
	}

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols, offset, width - offset);
			let y = map(j, 0, rows, offset, height - offset);
			drawRecursiveRect(x, y, w - offset / 4, h - offset / 4, 0);

			for (let i = 0; i < 1000; i++) {
				let xd = random(x, x + w - offset / 2);
				let yd = random(y, y + h - offset / 2);
				let wd = random(1, 3);
				let hd = random(1, 3);
				noStroke();
				fill(0, 0, 100, 5);
				ellipse(xd, yd, wd, hd);
			}
		}
	}
	noLoop();
}


function drawRecursiveRect(_x, _y, _w, _h, _d) {
	noStroke();
	fill(getRandomColor(pallete));
	let n = floor(random(0, 4));
	let angle = n * 90;
	let radius = _w / 3;
	if (radius > 0) {
		if (n % 2 == 0) {
			rect(_x, _y, _w, _h, 0, radius, 0, radius);
		} else {
			rect(_x, _y, _w, _h, radius, 0, radius, 0);
		}
	}
	push();
	translate(_x + _w / 2, _y + _h / 2);
	rotate(angle);
	noStroke();
	fill(getRandomColor(pallete));
	rect(-_w / 2, -_h / 2, _w * 0.666, _h * 0.666);
	noStroke();
	fill(getRandomColor(pallete));
	rect(_w / 2, _h / 2, -_w * 0.333, -_h * 0.333);
	if (_d < 3) {
		drawRecursiveRect(-_w / 2, -_h / 2, _w * 0.666, _h * 0.666, _d + 1);
		drawRecursiveRect(_w / 2, _h / 2, -_w * 0.333, -_h * 0.333, _d + 1);
	}
	pop();
}

function getRandomColor(_pallete) {
	let n = floor(random(_pallete.length));
	return _pallete[n];
}