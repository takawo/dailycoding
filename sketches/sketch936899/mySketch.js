let palette;
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";


let offset;
let rows, margin, w, h;
let canvas;

function setup() {
	canvas = createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	palette = createPalette(url);
	offset = width / 10;
	margin = offset / 5;
	rows = int(random(2, 10));
	w = width - offset * 2;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;
	background(0, 0, 95);

	// canvas.elt.style.filter="blur(2px)contrast(1)";

}

function draw() {
	background(0, 0, 95);
	for (let i = 0; i < rows; i++) {

		let x = offset;
		let y = offset + i * (margin + h) + h / 2;
		let dir = i % 2 == 0 ? -1 : 1;
		push();
		strokeWeight(5);
		strokeCap(SQUARE);
		strokeJoin(ROUND);
		randomSeed(i);

		colors = palette.concat();
		let gradient = drawingContext.createLinearGradient(x, y, x + w, y);
		gradient.addColorStop(0, colors[0 + i % colors.length]);
		gradient.addColorStop(0.5, colors[(1 + i) % colors.length]);
		gradient.addColorStop(1, colors[(2 + i) % colors.length]);
		drawingContext.strokeStyle = gradient;
		// stroke(0, 0, 0);
		randomSeed(i * 100);
		let lineA = 30;
		let lineB = 50 - lineA;

		drawingContext.shadowColor = color(0, 0, 0, 15);
		drawingContext.shadowBlur = 5;
		drawingContext.shadowOffsetX = 7;
		drawingContext.shadowOffsetY = 7;
		drawingContext.setLineDash([lineA, lineB]);
		drawingContext.lineDashOffset = dir * frameCount % (lineA + lineB);

		noFill();
		drawLineShapes(x, y, x + w, y, h * 1 / 2);
		pop();
	}
	// noLoop();
}

function drawLineShapes(x1, y1, x2, y2, maxH) {
	let distance = dist(x1, y1, x2, y2);
	let n = 0;
	let step = setStep(distance, maxH);
	let angle = atan2(y2 - y1, x2 - x1);
	let direction = random(100) > 50 ? -1 : 1;
	push();
	translate(x1, y1);
	rotate(angle);
	beginShape();
	while (n < distance) {
		drawRandomShape(n, 0, step, direction);
		direction *= -1;
		n += step;
		step = setStep(distance, maxH);
		if (step + n > distance) step = distance - n;
	}
	endShape();
	pop();
}

function setStep(distance, maxH) {
	return min(distance / int(random(2, 10)), maxH);
}

function drawRandomShape(x, y, step, direction) {
	// rect(x, y, step, step * direction);
	let shapeNum = int(random(5));
	switch (shapeNum) {
		case 0:
			vertex(x, y);
			vertex(x, y + step * direction / 2);
			vertex(x + step, y + step * direction / 2);
			vertex(x + step, y);
			break;
		case 1:
			vertex(x, y);
			vertex(x, y + step * direction / 2);
			// vertex(x+step,y+step*direction/2);
			vertex(x + step, y);
			break;
		case 2:
			vertex(x, y);
			// vertex(x,y+step*direction/2);
			vertex(x + step, y + step * direction / 2);
			vertex(x + step, y);
			break;
		case 3:
			if (direction > 0) {
				if (random(100) > 50) {
					for (let angle = 90; angle > 0; angle--) {
						vertex(x + cos(angle) * step,
							y + sin(angle) * step);
					}
				} else {
					for (let angle = 180; angle > 90; angle--) {
						vertex(x + step + cos(angle) * step,
							y + sin(angle) * step);
					}
				}
			} else {
				if (random(100) > 50) {
					for (let angle = 270; angle < 360; angle++) {
						vertex(x + cos(angle) * step,
							y + sin(angle) * step);
					}
				} else {
					for (let angle = 180; angle < 270; angle++) {
						vertex(x + step + cos(angle) * step,
							y + sin(angle) * step);
					}
				}
			}
			break;
		case 4:
			let cx = x + step / 2;
			let cy = y;
			if (direction > 0) {
				for (let angle = 180; angle > 0; angle--) {
					let px = cx + cos(angle) * step / 2;
					let py = cy + sin(angle) * step / 2;
					vertex(px, py);
				}
			} else {
				for (let angle = 180; angle < 360; angle++) {
					let px = cx + cos(angle) * step / 2;
					let py = cy + sin(angle) * step / 2;
					vertex(px, py);
				}
			}
			break;
	}
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