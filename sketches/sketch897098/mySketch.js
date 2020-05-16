let url = "https://coolors.co/app/e2302d-510048-000028-e25b53-044472";
let pallete = [];
let bg, texture;

let prev_col = -1;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	pallete = createPallete(url);

	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	bg.angleMode(DEGREES);

	bg.stroke(0, 0, 0, 5);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	texture.stroke(0, 0, 90, 5);

	for (let i = 0; i < width * height * 10 / 100; i++) {
		bg.strokeWeight(random(3));
		bg.point(random(width), random(height));
		texture.strokeWeight(random(3));
		texture.point(random(width), random(height));
	}
}

function draw() {
	background(0, 0, 90);
	image(bg, 0, 0);
	let offset = width / 20;
	let margin = offset / 10;
	let rows = int(random(2, 10)) * 2;
	for (let i = 0; i < rows; i++) {
		let w = width - offset * 2;
		let h = (height - offset * 2 - margin * (rows - 1)) / rows;
		let x = offset;
		let y = offset + i * (h + margin);
		// rect(x,y,w,h);
		let sep = int(random(2, 8));
		let step = int(random(2, 8));
		let dev = int(random(2, 8));
		for (let j = 0; j < dev; j++) {
			if (i % 2 == 0) {
				lineRectDownstair(x, y + h, x + w, y + h, h * (dev - j) / dev, sep, step);
			} else {
				lineRectDownstair(x + w, y, x, y, h * (dev - j) / dev, sep, step);
			}
		}
	}
	blendMode(LIGHTEST);
	image(texture, 0, 0);
	noLoop();
}

function lineRectDownstair(x1, y1, x2, y2, dMax, sep, step) {
	push();
	translate(x1, y1);
	let angle = atan2(y2 - y1, x2 - x1);
	let distance = int(dist(x1, y1, x2, y2));
	rotate(angle);
	let xStep = distance / sep;
	for (let i = 0; i < sep; i++) {
		let x = i * xStep;
		// rect(x, -dMax, xStep, dMax);

		push();
		translate(x, -dMax);
		let w = xStep / step;
		for (let j = 0; j < step; j++) {
			let nx = j * w;
			let ny = dMax * j / step;
			let nh = dMax - ny;
			let nw = w;
			let col = random(pallete);
			while (prev_col == col) col = random(pallete);
			drawingContext.shadowColor = color(0, 0, 100, 30);
			drawingContext.shadowBlur = min(width, height) / 80;
			// drawingContext.shadowOffsetY = min(width, height) / 80 / 2;
			noStroke();
			fill(col);
			prev_col = col;
			rect(nx, ny, nw, nh, 2);
		}
		pop();
	}
	pop();
}

function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}