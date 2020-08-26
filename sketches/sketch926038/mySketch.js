let points;

function setup() {
	createCanvas(800, 800);
	drawingContext.imageSmoothingEnabled = false;

	background(255);
}

function draw() {
	let scl = int(map(sin(frameCount / 10), -1, 1, 30, 5));
	drawingContext.shadowColor = color(0);
	drawingContext.shadowBlur = scl / 4;
	points = [
		createVector(0, 0),
		createVector(width - scl, 0),
		createVector(width - scl, height - scl),
		createVector(0, height - scl),
	];
	push();
	scale(scl);
	for (let i = 0; i < points.length; i++) {
		let current = points[i];
		let next = points[(i + 1) % points.length];
		for (let j = 0; j < width; j++) {
			let p = p5.Vector.lerp(current, next, j / width).mult(1 / scl);
			if (tan(p.x * 7 + p.y * 7 + frameCount / 5) > 0) {
				stroke(0);
			} else {
				stroke(255);
			}
			point(p.x, p.y);
		}
	}
	pop();
	copy(-scl, -scl, width + scl * 2, height + scl * 2, 0, 0, width, height);
}