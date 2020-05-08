let i = 0;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	smooth();
}

function draw() {
	background(0, 0, 90);
	randomSeed(100);
	separateGrid(0, 0, width);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) > 10 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				// rect(i, j, w, w);
				let x = i + w / 2;
				let y = j + w / 2;
				let dMax = w;
				circularCircle(x, y, dMax);
			}
		}
	}
}

function circularCircle(x, y, dMax) {
	push();
	translate(x, y);
	let n = int(random(2, 5))
	for (let d = dMax / n; d < dMax; d += dMax / n) {
		push();
		rotate(random(360) + map(d, 0, dMax, 3, .1) * frameCount * (i % 2 == 0 ? -1 : 1));
		drawingContext.shadowColor = color(0, 0, 0, 50);
		drawingContext.shadowBlur = 5;
		strokeWeight(1);
		let sep = int(random(3, 8));
		let angleStep = 360 / sep - 20;
		for (let angle = 0; angle < 360; angle += 360 / sep) {
			noFill();
			arc(0, 0, d, d, angle, angle + angleStep);
		}
		pop();
		i++;
	}
	pop();
}