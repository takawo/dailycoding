let url = "https://coolors.co/ffadad-ffd6a5-fdffb6-caffbf-9bf6ff-a0c4ff-bdb2ff-ffc6ff-fffffc";
let palette = createPalette(url);
let graphics, graphics2;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();
	for (let i = 0; i < width * height * 5 / 100; i++) {
		let x = random(width);
		let y = random(random()) * height;
		let w = random(5);
		let h = random(5);
		graphics.fill(0, 0, 100, 8);
		graphics.ellipse(x, y, w, h);
	}

	graphics2 = createGraphics(width, height);
	graphics2.colorMode(HSB, 360, 100, 100, 100);
	graphics2.noStroke();

	for (let i = 0; i < width * height * 5 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		graphics2.fill(0, 0, 0, 3);
		graphics2.ellipse(x, y, w, h);
	}


}

function draw() {
	background(220, 80, 30);
	image(graphics, 0, 0);
	randomSeed(0);

	for (let i = 0; i < 50; i++) {
		let x = random(width);
		let y = random(height);
		let d = map(i, 0, 50, 150, 350);
		drawTanzaku(x, y, d);
	}
	image(graphics2, 0, 0);
	// noLoop();
}

function drawTanzaku(x, y, d) {
	let offset = d / 15;
	let r = d / 10;
	let ratio = 1;
	let rot = random(-15, 15) / 3;
	let angle = rot * 5 + frameCount / 35;
	let isFlipX = random(100) > 50;
	let isFlipY = random(100) > 50;

	push();
	translate(x, y);
	scale(isFlipX ? -1 : 1, isFlipY ? -1 : 1);
	rotate(rot);

	shearX(random(-40, 40) / 10);
	shearY(random(-40, 40) / 10);
	let p1 = createVector(offset - d / 6, -d / 2 * ratio);
	let p2 = createVector(offset + d / 6, -d / 2 * ratio);
	let c1 = p5.Vector.lerp(p1, p2, 0.5);
	let angle2 = isFlipX ? 180 : 0;
	let c2 = createVector(c1.x + cos(-rot - 90 + angle2) * width * 2, c1.y + sin(-rot - 90 + angle2) * height * 2);
	let p3 = createVector(-offset + d / 6, +d / 2 * ratio);
	let p4 = createVector(-offset - d / 6, +d / 2 * ratio);

	let a1 = p5.Vector.fromAngle(radians(45) + angle).mult(r).add(p1);
	let a2 = p5.Vector.fromAngle(radians(45) + angle).mult(r).add(p2);
	let a3 = p5.Vector.fromAngle(radians(45 - 90) + angle).mult(r).add(p3);
	let a4 = p5.Vector.fromAngle(radians(45 - 90) + angle).mult(r).add(p4);
	stroke(0, 0, 100, 50);
	line(c1.x, c1.y, c2.x, c2.y);
	fill(random(palette));
	noStroke();

	drawingContext.shadowColor = color(0, 0, 0, 100 / 4);
	drawingContext.shadowBlur = d / 2;
	beginShape();
	vertex(p1.x, p1.y);
	vertex(p2.x, p2.y);
	bezierVertex(a2.x, a2.y, a3.x, a3.y, p3.x, p3.y);
	vertex(p4.x, p4.y);
	bezierVertex(a4.x, a4.y, a1.x, a1.y, p1.x, p1.y);
	endShape(CLOSE);


	// noStroke();
	// quad(p1.x,p1.y,
	//      p2.x,p2.y,
	//      p3.x,p3.y,
	//      p4.x,p4.y);

	// line(p1.x, p1.y, a1.x, a1.y);
	// ellipse(a1.x, a1.y, 10, 10);
	// line(p2.x, p2.y, a2.x, a2.y);
	// ellipse(a2.x, a2.y, 10, 10);
	// line(p3.x, p3.y, a3.x, a3.y);
	// ellipse(a3.x, a3.y, 10, 10);
	// line(p4.x, p4.y, a4.x, a4.y);
	// ellipse(a4.x, a4.y, 10, 10);


	pop();

}


function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}