let ddd;
let pallete = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];
let graphics;
let colors;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();
	for (let i = 0; i < width * height * 15 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		random(100) > 50 ? graphics.fill(0, 0, 90, 5) : graphics.fill(0, 0, 20, 5);
		graphics.ellipse(x, y, w, h);
	}
}

function draw() {
	colors = pallete.concat();
	let bgNum = int(random(colors.length));
	let bg = colors[bgNum];
	colors.splice(bgNum, 1);
	background(bg);
	let offset = width / 15;
	let margin = offset / 5;
	let num = int(random(1, 5)) * 4;
	ddd = (width + offset * 2 - margin * (num - 1)) / num;
	for (let i = 0; i < num; i++) {
		let y = -offset + i * (ddd + margin) + ddd / 2;
		// fill(220);
		// noStroke();
		// rect(offset, y - ddd / 2, width - offset * 2, ddd, 3);
		lineRect(-offset, y, width + offset, y, ddd / 2);
		lineArc(-offset, y, width + offset, y, ddd);
		//lineArc(100, 100, 800 - 100, 800 - 100, 6);

	}
	image(graphics, 0, 0);
	// noLoop();
	frameRate(0.5);
}


function lineArc(x1, y1, x2, y2, dMax) {
	let d = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	push();
	translate(x1, y1);
	rotate(angle);
	let n = 0;
	let dd = 0;

	while (dd < d) {
		let ddPlus = min(d / int(random(10, 20)), dMax);
		if (dd + ddPlus > d) ddPlus = d - dd;
		let ax = dd + ddPlus / 2;
		if (n % 2 == 0) {
			drawSeparatedArc(ax, 0, ddPlus, ddPlus, 0, 180);
		} else {
			drawSeparatedArc(ax, 0, ddPlus, ddPlus, 0 + 180, 180 + 180);
		}
		n++;
		dd += ddPlus;
	}
	pop();
}

function drawSeparatedArc(x, y, dw, dh, startAngle, endAngle) {
	push();
	translate(x, y);
	rotate(startAngle);
	let angleMax = endAngle - startAngle;
	let angle = 0;
	let isFill = random(100) > 50 ? true : false;
	while (angle < angleMax) {
		let angleStep = angleMax / int(random(2, 8));
		if (angleStep + angle > angleMax) {
			angleStep = angleMax - angle;
		}
		if (isFill) {
			fill(random(colors) + "99");
			noStroke();
		} else {
			stroke(random(colors) + "99");
			strokeWeight(1);
			strokeCap(SQUARE);
			noFill();
		}
		let sw = 1;
		arc(0, 0, dw + sw / 2, dh + sw / 2, angle, angle + angleStep);
		angle += angleStep;
	}
	pop();
}

function lineRect(x1, y1, x2, y2, minD) {

	let d = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	push();
	translate(x1, y1);
	rotate(angle);
	let n = 0;
	let dd = 0;

	while (dd < d) {
		let ddPlus = d / int(random(random(random())) * 10000);
		if (dd + ddPlus > d) ddPlus = d - dd;
		let ax = dd + ddPlus / 2;
		let isFill = random(100) > 50 ? true : false;
		if (isFill) {
			fill(random(colors) + "99");
			noStroke();
		} else {
			stroke(random(colors) + "99");
			strokeWeight(1);
			strokeCap(SQUARE);
			noFill();
		}
		if (n % 2 == 0) {
			//arc(cx, 0, d1, d1, 0, 180);
			beginShape();
			vertex(ax - ddPlus / 2, 0);
			vertex(ax - ddPlus / 2, min(minD, ddPlus / 2));
			// vertex(ax + ddPlus / 2, min(ddd/8,ddPlus / 2));
			vertex(ax + ddPlus / 2, 0);
			endShape();
		} else {
			beginShape();
			vertex(ax - ddPlus / 2, 0);
			// vertex(ax - ddPlus / 2, -min(d/4,ddPlus / 2));
			vertex(ax + ddPlus / 2, -min(minD, ddPlus / 2));
			vertex(ax + ddPlus / 2, 0);
			endShape();
		}

		n++;
		dd += ddPlus;
	}
	pop();
}