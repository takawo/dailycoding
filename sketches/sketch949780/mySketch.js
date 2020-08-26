let g, g2, g3;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	g = createGraphics(width, height);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);
	g2 = createGraphics(width, height);
	g2.colorMode(HSB, 360, 100, 100, 100);
	g2.angleMode(DEGREES);
	g3 = createGraphics(width, height);
	g3.colorMode(HSB, 360, 100, 100, 100);
	g3.angleMode(DEGREES);
}

function draw() {
	background(0, 0, 99);
	randomSeed(2);
	g.clear();
	g2.clear();
	g3.clear();
	for (let angle = 0; angle < 360; angle += 25) {
		let x = width / 2 + cos(angle + frameCount) * ((width / 4) + random(width / 30, -width / 10));
		let y = height / 2 + sin(angle + frameCount) * ((height / 3) + random(height / 30, -height / 10));
		let w = random(60, 130) * 1.66;
		let h = random(60, 130) * 1.66;
		g.push();
		g.translate(x, y);
		// rotate(angle);
		g.fill(0, 100, 100);
		g.noStroke();
		g.ellipse(0, 0, w, h);
		if (angle % 75 == 0) {
			let n = noise(angle, frameCount / 100) * 360;
			g2.noStroke();
			g2.fill(0, 0, 100);
			g2.ellipse(x2 = x + cos(angle + n) * w / 5, y2 = y + sin(angle + n) * h / 5, min(w / 2, h / 2));
			g3.noStroke();
			g3.fill(210, 99, 99);
			g3.ellipse(x2 + cos(angle + n) * w / 12, y2 + sin(angle + n) * w / 12, w / 3.5);

		}
		g.pop();
	}
	drawingContext.shadowColor = color(0, 0, 0, 33);
	drawingContext.shadowBlur = width / 20;
	drawingContext.shadowOffsetY = width / 40;
	image(g, 0, 0);
	drawingContext.shadowColor = color(0, 0, 0, 33);
	drawingContext.shadowBlur = width / 20;
	drawingContext.shadowOffsetY = 0;
	image(g2, 0, 0);
	image(g3, 0, 0);
}