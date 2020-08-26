let graphics;
let url = "https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557";
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	palette = createPalette(url);

	graphics = createGraphics(width, height);
	graphics.angleMode(DEGREES);
	graphics.noStroke();
	graphics.fill(0, 2 / 100 * 255);
	for (let i = 0; i < width * height * 10 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		let angle = random(360);
		graphics.push();
		graphics.translate(x, y);
		graphics.rotate(angle);;
		graphics.ellipse(0, 0, w, h);
		graphics.pop();
	}
}

function draw() {
	background(0, 0, 95);


	push();

	let w = sqrt(width * width + height * height);
	let rows = int(random(5, 10));
	let offset = width / 10;
	let margin = offset / 3;
	let rowSize = (w + offset * 2 - margin * (rows - 1)) / rows;

	translate(width / 2, height / 2);
	rotate(random(360));
	translate(-w / 2, -w / 2);
	for (let i = 0; i < rows; i++) {
		let y = -offset + i * (margin + rowSize) + rowSize / 2;
		drawQuadricLine(-offset, y, w + offset, y, rowSize * 3);

	}
	pop();
	image(graphics, 0, 0);
	frameRate(1);
}

function mousePressed() {
	redraw();
}

function drawQuadricLine(x1, y1, x2, y2, d) {

	let distance = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);

	let p1;
	let p2;
	let p3;
	let p4;

	push();
	translate(x1, y1);
	rotate(angle);
	let x = 0;
	let y = 0;
	let step = random(d / 2, d);
	let angle2 = random(180, 270);
	let r = random(d / 2, d);
	p1 = createVector(
		x + cos(angle2) * r,
		y + sin(angle2) * r);
	angle2 = random(90, 180);
	p4 = createVector(
		x + cos(angle2) * r,
		y + sin(angle2) * r);
	while (x < distance) {
		r = step / 2;
		angle2 = random(270, 360);
		p2 = createVector(
			x + step + cos(angle2) * r,
			y + sin(angle2) * r);
		angle2 = random(0, 90);
		p3 = createVector(
			x + step + cos(angle2) * r,
			y + sin(angle2) * r);
		let center = createVector((p1.x + p2.x + p3.x + p4.x) / 4, (p1.y + p2.y + p3.y + p4.y) / 4);
		let sep = int(random(3, 10));
		let c, pc;
		c = -1;
		pc = c;
		for (let i = 1; i > 0; i -= 1 / sep) {
			c = random(palette);
			while (pc == c) c = random(palette);
			fill(c);
			pc = c;
			let pp1 = p5.Vector.lerp(center, p1, i);
			let pp2 = p5.Vector.lerp(center, p2, i);
			let pp3 = p5.Vector.lerp(center, p3, i);
			let pp4 = p5.Vector.lerp(center, p4, i);
			drawingContext.shadowColor = c;
			noStroke();
			drawingContext.shadowBlur = step / 10;
			drawingContext.shadowOffsetX = -5;
			drawingContext.shadowOffsetY = 5;


			quad(pp1.x, pp1.y, pp2.x, pp2.y, pp3.x, pp3.y, pp4.x, pp4.y);

		}
		p1 = p2.copy();
		p4 = p3.copy();
		step = random(d / 2, d);
		r = random(d / 2, d);
		if (x + step > distance) {
			step = distance - x;
		}
		x += step;
	}

	pop();
}


function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = color('#' + arr[i]);
	}
	return arr;
}