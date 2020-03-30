let offset, margin, d;
let cells;
let pallete = ["#302933", "#A97F8D", "#CFB2AA", "#6746A6", "#FC4C33", "#D3CCE9"];
let colors;
let graphics;

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();
	for (let i = 0; i < width * height * 15 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		random(100) > 50 ? graphics.fill(0, 0, 100, 5) : graphics.fill(0, 0, 0, 5);
		graphics.ellipse(x, y, w, h);
	}

}

function draw() {
	colors = pallete.concat();
	let bgNum = int(random(colors.length));
	let bg = colors[bgNum];
	colors.splice(bgNum, 1);
	background(bg);


	cells = int(random(3, 8));
	offset = width / 10;
	margin = offset / 5;
	d = (width - offset * 2 - margin * (cells - 1)) / cells;


	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = offset + i * (d + margin);
			let y = offset + j * (d + margin);
			if (random(100) > 50) {
				lineArc(x, y, x + d, y + d);
				lineArc(x, y, x + d, y + d);
			} else {
				lineArc(x + d, y, x, y + d);
				lineArc(x + d, y, x, y + d);
			}
		}
	}
	image(graphics, 0, 0);
	frameRate(0.5);
}


function lineArc(x1, y1, x2, y2) {
	let d = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	push();
	translate(x1, y1);
	rotate(angle);
	let n = 0;
	let dd = 0;

	while (dd < d) {
		let ddPlus = d / int(random(3, 20));
		if (dd + ddPlus > d) ddPlus = d - dd;
		let ax = dd + ddPlus / 2;
		if (n % 2 == 0) {
			drawSeparatedArc(ax, 0, ddPlus, ddPlus, 0, 180);
		} else {
			drawSeparatedArc(ax, 0, ddPlus, ddPlus, 0 + 180, 180 + 180);
		}
		n++;
		dd += ddPlus;
	}
	pop();
}

function drawSeparatedArc(x,y,dw,dh,startAngle,endAngle){
	push();
	translate(x,y);
	rotate(startAngle);
	let angleMax = endAngle - startAngle;
	
	pop();
}