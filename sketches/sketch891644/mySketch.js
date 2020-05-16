function setup() {
	createCanvas(800, 800);
}

function draw() {
	background(220);

	let y = -100;
	drawingContext.shadowColor = color(0, 50 / 100 * 255);
	drawingContext.shadowBlur = 55;
	noStroke();
	// fill(0);
	// stroke(20);
	// strokeWeight(1);
	strokeJoin(ROUND);
	while (y < height + 100) {
		beginShape(QUAD_STRIP);
		let x = -100;
		while (x < width + 100) {
			vertex(x + random(50), y + noise(x / 100, y / 200) * 150);
			vertex(x + random(50), y + noise(x / 100, y / 200) * -150);
			x += 100;
		}
		y += 5;
		endShape();
	}

	noLoop();
}