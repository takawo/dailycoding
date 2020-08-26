let url = "https://coolors.co/2a2b2a-706c61-f8f4e3-e5446d-ff8966";
let palette = ["#ff8966", "#f8f4e3", "#e5446d", "#706c61", "#2a2b2a"];
let cells;
let margin, offset, cellSize, cellSize2;
let texture;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	for (let i = 0; i < width * height * 1 / 100; i++) {
		let x = random(width);
		let y = random(height);
		texture.push();
		texture.translate(x, y);
		let r = random(width / 5);
		let angle = 90 + random(-15,15)*2;
		texture.stroke(random(100) > 50 ? 10:240,random(2)/100*255);
		texture.line(cos(angle) * r, sin(angle) * r,
			cos(angle + 180) * r, sin(angle + 180) * r);

		texture.pop();
	}


	frameRate(0.5);
}

function draw() {
	background(0, 0, 90);

	cells = int(random(3, 10));
	offset = width / 20;
	margin = 0;
	cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;
	cellSize2 = sqrt(sq(cellSize) + sq(cellSize)) / 2;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = offset + i * (cellSize + margin) + cellSize / 2;
			let y = offset + j * (cellSize + margin) + cellSize / 2;
			push();
			translate(x, y);
			rotate(int(random(4)) * 360 / 4);
			switch (int(random(4))) {
				case 0:
					translate(-cellSize / 2, -cellSize / 2);
					drawSepareteArc(0, 0, cellSize, 0, 90, int(random(3, 10)));
					break;
				case 1:
					push();
					translate(0, -cellSize / 2);
					drawSepareteArc(0, 0, cellSize / 2, 0, 180, int(random(3, 10) / 1.5));
					pop();
					push();
					translate(0, +cellSize / 2);
					drawSepareteArc(0, 0, cellSize / 2, 180 + 0, 180 + 180, int(random(3, 10) / 1.5));
					pop();
					break;
				case 2:
					push();
					rotate(random(360));
					drawSepareteArc(0, 0, cellSize / 2, 0, 360, int(random(3, 10)));
					pop();
					break;
				case 3:
					push();
					translate(-cellSize / 2, -cellSize / 2);
					drawSepareteArc(0, 0, cellSize2, 0, 90, int(random(3, 10)));
					pop();
					push();
					translate(cellSize / 2, cellSize / 2);
					drawSepareteArc(0, 0, cellSize2, 180 + 0, 180 + 90, int(random(3, 10)));
					pop();
					break;
			}
			pop();

		}
	}
	image(texture, 0, 0);
}

function drawSepareteArc(x, y, d, startAngle, endAngle, step) {
	let col = random(palette);
	let prev_col = col;
	let i = 0;
	let ratio = random(1, 2);
	for (let e = 0; e < d; e += d / step) {
		let f = constrain(e + d / step * ratio, 0, d);
		let dStep = i + 1;
		noStroke();
		let angleStep = (endAngle - startAngle) / dStep;
		for (let angle = startAngle; angle < endAngle; angle += angleStep) {
			while (prev_col == col) {
				col = random(palette);
				drawingContext.shadowColor = color(0, 0, 0, 100 / 4);
				drawingContext.shadowBlur = f / 5;
				fill(col);
			}
			prev_col = col;
			beginShape();
			for (let a = angle; a <= angle + angleStep; a += 0.1) {
				vertex(cos(a) * e, sin(a) * e);
			}
			for (let b = angle + angleStep; b >= angle; b -= 0.1) {
				vertex(cos(b) * f, sin(b) * f);
			}
			endShape(CLOSE);
		}
		i++;
	}
}