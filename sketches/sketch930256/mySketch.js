let g;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	g = createGraphics(width, height);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);
}

function draw() {
	background(0, 0, 95);
	g.clear();
	let offset = width / 10;
	separateGrid(offset, offset, width - offset * 2, g);
	drawingContext.shadowColor = color(0, 0, 0, 50);
	drawingContext.shadowBlur = 15;
	drawingContext.shadowOffsetX = 5;
	drawingContext.shadowOffsetY = 5;
	image(g, 0, 0);
	// noLoop();
	frameRate(2);
}

function separateGrid(x, y, d, g) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 5) {
				separateGrid(i, j, w, g);
			} else {
				drawFukidashi(i, j, w, g);
			}
		}
	}
}

function drawFukidashi(x, y, w, g) {
	let d = w / 1.7;
	let r = d / 2 * PI;
	let a1 = random(r / 20, r / 5);
	let a2 = random(r / 8, r / 4);
	let dw = d * random(0.8, 1);
	let dh = d * random(0.65, 0.8);
	let angle = random(50, 180 - 50);
	let angle2 = angle + random(-30, 30);
	let x1 = cos(angle) * d / 2;
	let y1 = sin(angle) * d / 2 * 0.65;
	let rotate_angle = int(random(4)) * 360 / 4;
	let sw = width / 120;
	g.push();
	g.translate(x + w / 2, y + w / 2.2);
	g.rotate(rotate_angle);
	g.stroke(0);
	g.drawingContext.setLineDash([a1, a2]);
	g.strokeWeight(r / 4 + sw);
	g.ellipse(0, 0, dw, dh);
	g.stroke(0);
	g.push();
	g.translate(x1, y1);
	g.rotate(angle2);
	g.strokeWeight(sw);
	g.drawingContext.setLineDash([0]);
	g.triangle(0, -d / 8, 0, d / 8, d / 2.2, 0)
	g.pop();
	g.pop();


	g.push();
	g.translate(x + w / 2, y + w / 2.2);
	g.rotate(rotate_angle);
	g.stroke(255);
	g.drawingContext.setLineDash([a1, a2]);
	g.strokeWeight(r / 4);
	g.ellipse(0, 0, dw, dh);
	g.push();
	g.translate(x1, y1);
	g.rotate(angle2);
	g.noStroke();
	g.triangle(0, -d / 8, 0, d / 8, d / 2.2, 0)
	g.pop();
	g.pop();

}