let offset, margin, d;
let cells;
let url = "https://coolors.co/2d3142-4f5d75-bfc0c0-ffffff-ef8354";
let pallete;
let colors;
let graphics;

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
	pallete = createPallete(url);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();
	for (let i = 0; i < width * height * 15 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		random(100) > 50 ? graphics.fill(0, 0, 100, 5) : graphics.fill(0, 0, 0, 5);
		graphics.ellipse(x, y, w, h);
	}

}

function draw() {
	colors = pallete.concat();
	let bgNum = int(random(colors.length));
	let bg = colors[bgNum];
	colors.splice(bgNum, 1);
	background(bg);

	separateGrid(0, 0, width);

	image(graphics, 0, 0);
	frameRate(0.5);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 2) {
				separateGrid(i, j, w);
			} else {
				// /rect(i, j, w, w);
				if (random(100) > 50) {
					if (random(100) > 50) {

						lineRect(i + w, j, i, j + w);
					} else {
						lineArc(i + w, j, i, j + w);
					}
				} else {
					if (random(100) > 50) {

						lineRect(i, j, i + w, j + w);
					} else {
						lineArc(i, j, i + w, j + w);
					}
				}

			}
		}
	}
}

function lineArc(x1, y1, x2, y2) {
	let d = dist(x1, y1, x2, y2);
	let dMax = d / 4;
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
			fill(random(colors));
			noStroke();
		} else {
			stroke(random(colors));
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

function lineRect(x1, y1, x2, y2) {
	let d = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	push();
	translate(x1, y1);
	rotate(angle);
	let n = 0;
	let dd = 0;

	while (dd < d) {
		let ddPlus = d / int(random(3, 20));
		if (dd + ddPlus > d) ddPlus = d - dd;
		let ax = dd + ddPlus / 2;
		let isFill = random(100) > 50 ? true : false;
		let c = random(colors);
		strokeCap(SQUARE);
		if (isFill) {
			fill(c);
			stroke(c);
		} else {
			strokeWeight(1);
			stroke(c);
			noFill();
		}
		// if (n % 2 == 0) {
		//   arc(ax, 0, ddPlus, ddPlus, 0, 180);
		// } else {
		//   arc(ax, 0, ddPlus, ddPlus, 0 + 180, 180 + 180);
		// }
		if (n % 2 == 0) {
			//arc(cx, 0, d1, d1, 0, 180);
			beginShape();
			vertex(ax - ddPlus / 2, 0);
			if (random(100) > 50) vertex(ax - ddPlus / 2, ddPlus / 2);
			if (random(100) > 50) vertex(ax + ddPlus / 2, ddPlus / 2);
			vertex(ax + ddPlus / 2, 0);
			endShape();
		} else {
			beginShape();
			vertex(ax - ddPlus / 2, 0);
			if (random(100) > 50) vertex(ax - ddPlus / 2, -ddPlus / 2);
			if (random(100) > 50) vertex(ax + ddPlus / 2, -ddPlus / 2);
			vertex(ax + ddPlus / 2, 0);
			endShape();
		}
		n++;
		dd += ddPlus;
	}
	pop();
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
		let t = 100;
		colorMode(HSB, 360, 100, 100, 100);
		c = color(h, s, b, t);
		arr[i] = c;
	}
	return arr;
}