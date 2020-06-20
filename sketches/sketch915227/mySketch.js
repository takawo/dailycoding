let pallete = ["#E0C090", "#875512", "#8F2F28", "#594E56", "#6D470F", "#212330", "#5D3321", "#0B1E59"];
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();
	for (let i = 0; i < graphics.width * graphics.height * 15 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		graphics.fill(0, 0, 0, 1);
		graphics.ellipse(x, y, w, h);
	}
	// noLoop();
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 90);
	image(graphics, 0, 0);
	blendMode(BURN);

	push();
	translate(width / 2, height / 2);
	rotate(int(random(12)) * 360 / 12);
	let w = sqrt(width * width + height * height);
	translate(-w / 2, -w / 2);
	let rows = int(random(3, 10));
	let offset = w / 10;
	let margin = 0;
	let d = (w + offset * 2 - margin * (rows - 1)) / rows;
	for (let i = 0; i < rows; i++) {
		let x1 = -offset
		let x2 = w + offset;
		let y1 = -offset + i * (d + margin);
		let y2 = y1;
		lineArc(x1, y1, x2, y2, d / 2);
	}
	pop();
	frameRate(1);
}

function lineArc(x1, y1, x2, y2, dMax) {
	let distance = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	push();
	translate(x1, y1);
	rotate(angle);
	// line(0, 0, distance, 0);
	let x = 0;
	let n = int(random(4));
	let step;
	while (x < distance) {
		step = random(dMax);
		if (x + step > distance) step = distance - x;

		let xx, yy, startAngle, endAngle;
		switch (n % 4) {
			case 0:
				xx = x;
				yy = 0;
				startAngle = 270;
				endAngle = 360;
				break;
			case 1:
				xx = x + step;
				yy = 0;
				startAngle = 90;
				endAngle = 180;
				break;
			case 2:
				xx = x;
				yy = 0;
				startAngle = 0;
				endAngle = 90;
				break;
			case 3:
				xx = x + step;
				yy = 0;
				startAngle = 180;
				endAngle = 270;
				break;
		}
		var gradient = drawingContext.createRadialGradient(xx, yy, 0, xx, yy, dMax);
		let t = 150;
		let c1 = color(random(pallete) + hex(t, 2));
		let c2 = color(random(pallete) + hex(t, 2));
		let c3 = color(random(pallete) + hex(t, 2));
		while (c1 == c2 || c2 == c3 || c3 == c1) {
			c1 = color(random(pallete) + hex(t, 2));
			c2 = color(random(pallete) + hex(t, 2));
			c3 = color(random(pallete) + hex(t, 2));
		}


		gradient.addColorStop(0.0, c1);
		gradient.addColorStop(1.0, c2);
		// drawingContext.fillStyle = gradient;
		drawingContext.shadowColor = c3;
		drawingContext.shadowBlur = random(step /4);
		drawingContext.shadowOffsetX = cos(45) * step / 4;
		drawingContext.shadowOffsetY = sin(45) * step / 4;
		noStroke();
		fill(0, 0, 100);
		switch (int(random(4))) {
			case 0:
				arc(xx, yy, step * 2, step * 2, startAngle, endAngle, PIE);

				break;
			case 1:
				triangle(xx, yy,
					xx + cos(startAngle) * step, yy + sin(startAngle) * step,
					xx + cos(endAngle) * step, yy + sin(endAngle) * step);
				break;
			case 2:
				rectMode(CORNERS);
				let x2 = xx + cos((startAngle + endAngle) / 2) * sqrt(sq(step) * 2);
				let y2 = yy + sin((startAngle + endAngle) / 2) * sqrt(sq(step) * 2);
				rect(xx, yy, x2, y2);
				break;
			case 3:
				let cx = xx + cos((startAngle + endAngle) / 2) * sqrt(sq(step) * 2) / 2;
				let cy = yy + sin((startAngle + endAngle) / 2) * sqrt(sq(step) * 2) / 2;
				ellipse(cx, cy, step, step);
				break;
		}

		x += step;
		n++;
	}
	pop();
}