let url = "https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590";
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	palette = createPalette(url);
}

function draw() {
	background(220);

	push();
	translate(width / 2, height / 2);
	rotate(45);
	let w = sqrt(sq(width) + sq(height));
	translate(-w / 2, -w / 2);
	// noStroke();

	let num = 10;
	let d = w / num;
	let lineLength = d / 3;
	drawingContext.setLineDash([lineLength]);
	strokeWeight(d / 50);
	strokeCap(SQUARE);
	strokeJoin(ROUND);
	// drawingContext.shadowColor = color(0, 0, 0, 50);
	// drawingContext.shadowBlur = d / 100;
	noFill();
	// drawingContext.shadowOffsetX = cos(frameCount * 3) * d / 10;
	// drawingContext.shadowOffsetY = sin(frameCount * 3) * d / 10;

	for (let j = 0; j < num; j++) {
		for (let i = 0; i < num; i++) {
			let r = d;
			let s = r * 0.95;
			let x = i * (r * sin(60)) * 2;
			let y = j * (r + r * cos(60));
			push();
			translate(x, y);
			rotate(-30);
			let sep = 10;
			for (let i = sep; i > 0; i--) {
				let n = int(noise(x, y, (i * 10 + frameCount) / 50) * palette.length + 1);
				// fill(palette[int(x + n + i) % palette.length]);
				drawingContext.lineDashOffset = (map(i, sep, 0, lineLength * 2, 0) + frameCount) % (lineLength * 2);

				let t = s * i / sep;
				beginShape();
				for (let angle = 0; angle < 360; angle += 360 / 3) {
					vertex(cos(angle) * t, sin(angle) * t);
				}
				endShape(CLOSE);
			}
			pop();
			let x2 = x + cos(30) * r;
			let y2 = y + sin(30) * r;
			push();
			translate(x2, y2);
			rotate(-30 + 180);
			for (let i = sep; i > 0; i--) {
				let t = s * i / sep;

				let n = int(noise(x2, y2, (i * 10 + frameCount) / 50) * palette.length + 1);
				// fill(palette[int(x2 + n + i) % palette.length]);
				drawingContext.lineDashOffset = (map(i, sep, 0, lineLength * 2, 0) + frameCount) % (lineLength * 2);

				beginShape();
				for (let angle = 0; angle < 360; angle += 360 / 3) {
					vertex(cos(angle) * t, sin(angle) * t);
				}
				endShape(CLOSE);
			}
			pop();
		}
	}
	pop();
	// noLoop();
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