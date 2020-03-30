function setup() {
	createCanvas(400, 400);
	colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 0);
	blendMode(SCREEN);

	fill(0, 0, 0);
	noStroke();

	drawingContext.shadowColor = color(0, 100, 100);
	drawingContext.shadowBlur = 50;

	ellipse(200, 210, 50);
	ellipse(100, 180, 50);
	ellipse(250, 150, 80);

	drawingContext.shadowColor = color(220, 80, 100);
	ellipse(280, 160, 60);
	ellipse(130, 200, 80);
}