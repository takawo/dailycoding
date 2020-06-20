let g;
let density = 2;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	pixelDensity(density);
	g = createGraphics(width, height);
	g.blendMode(ADD);
}

function draw() {
	background(0, 0, 0);
	g.clear();
	randomSeed(frameCount / 100);
	for (let i = 0; i < 150; i++) {
		let x = random(width);
		let y = random(height);
		let d = random(200);
		let angle = map(noise(x / 400, y / 400, frameCount / 800), 0, 1, -180, 180);
		let r = 5;
		let v = createVector(cos(angle) * r, sin(angle) * r);
		x += v.x;
		y += v.y;
		g.push();
		g.translate(-width * 2, -height * 2);
		g.drawingContext.shadowColor = color(random(360), 100, 100, 50);
		g.drawingContext.shadowBlur = d;
		g.drawingContext.shadowOffsetX = width * density * 2;
		g.drawingContext.shadowOffsetY = height * density * 2;
		g.noStroke();
		g.ellipse(x, y, d, d);
		g.pop();
	}
	image(g, 0, 0);
	// noLoop();
}