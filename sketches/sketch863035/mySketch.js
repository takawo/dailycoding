let pallete = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.angleMode(DEGREES);
	graphics.noStroke();
	graphics.fill(0, 2 / 100 * 255);
	for (let i = 0; i < width * height * 10 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		let angle = random(360);
		graphics.push();
		graphics.translate(x, y);
		graphics.rotate(angle);;
		graphics.ellipse(0, 0, w, h);
		graphics.pop();
	}
}

function draw() {

	background(0, 0, 95);

	push();
	noStroke();

	let rows = int(random(4, 8));
	let offset = width / 10;
	let margin = offset / 3;
	let rowSize = (height + offset * 2 - margin * (rows - 1)) / rows;
	for (let i = 0; i < rows; i++) {
		let y = -offset + i * (margin + rowSize) + rowSize / 2;
		drawQuadricLine(-offset, y, width + offset, y, rowSize*2);
		drawQuadricLine(-offset, y+rowSize, width + offset, y+rowSize, rowSize*2);
	}
	pop();
	image(graphics, 0, 0);
	noLoop();
}

function mousePressed() {
	redraw();
}

function drawQuadricLine(x1, y1, x2, y2, d) {

	let distance = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);

	let p1;
	let p2;
	let p3;
	let p4;
    let c = random(pallete);
    let pc = c;
  
	push();
	translate(x1, y1);
	rotate(angle);
	let x = 0;
	let y = 0;
	let step = random(d / 2, d);
	let angle2 = random(180, 270);
	let r = random(d / 2, d);
	p1 = createVector(
		x + cos(angle2) * r,
		y + sin(angle2) * r);
	angle2 = random(90, 180);
	p4 = createVector(
		x + cos(angle2) * r,
		y + sin(angle2) * r);
	while (x < distance) {
      while(c == pc){
      c = random(pallete);
      }
		r = step / 2;
		angle2 = random(270, 360);
		p2 = createVector(
			x + step + cos(angle2) * r,
			y + sin(angle2) * r);
		angle2 = random(0, 90);
		p3 = createVector(
			x + step + cos(angle2) * r,
			y + sin(angle2) * r);
        fill(c);
 	drawingContext.shadowColor = color(pc);
	drawingContext.shadowBlur = step/2;
	// drawingContext.shadowOffsetX = -5;
	// drawingContext.shadowOffsetY = 5;
       pc = c;      
		quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
		p1 = p2.copy();
		p4 = p3.copy();
		step = random(d / 2, d);
		r = random(d / 2, d);
		if (x + step > distance) {
			step = distance - x;
		}
		x += step;
	}

	pop();
}