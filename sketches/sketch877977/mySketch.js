let cols = 25 - 1;
let rows = 25 - 1;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 90);
	let offset = 0;
	let margin = 0;
	let cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
	let cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = offset + i * (cellW + margin);
			let y = offset + j * (cellH + margin);
			drawPattern(x, y, cellW, cellH, i, j);
		}
	}
	noLoop();
}

function drawPattern(x, y, w, h, i, j) {
	let n = i + j * cols;
	if (j % 2 == 0) n++;
	let baseColor;
	let reverseColor;
	if (n % 2 == 0) {
		baseColor = color(0, 0, 100);
		reverseColor = color(0, 0, 0);
	} else {
		baseColor = color(0, 0, 0);
		reverseColor = color(0, 0, 100);
	}
	rectMode(CENTER);
	fill(baseColor);
	noStroke();
	rect(x + w / 2, y + w / 2, w, h);
	push();
	translate(x + w / 2, y + h / 2);
	fill(reverseColor);
	noStroke();
	let wr = 30;
	if ((i + 1) % 10 == 0) {
		rect(-w / 4, -w / 4, w / 4, w / 4, w / wr);
		rect(w / 4, -w / 4, w / 4, w / 4, w / wr);
	} else if ((i + 1) % 5 == 0 && (i + 1) % 10 != 0) {
		rect(-w / 4, +w / 4, w / 4, w / 4, w / wr);
		rect(w / 4, +w / 4, w / 4, w / 4, w / wr);
	}
	if ((i + 1) % 10 < 5 && (i + 1) % 10 != 0) {
		rect(-w / 4, -w / 4, w / 4, w / 4, w / wr);
		rect(w / 4, +w / 4, w / 4, w / 4, w / wr);

	} else if ((i + 1) % 10 > 5 && (i + 1) % 10) {
		rect(-w / 4, +w / 4, w / 4, w / 4, w / wr);
		rect(w / 4, -w / 4, w / 4, w / 4, w / wr);

	}
	pop();
}