let pallete = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];

let texture;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	texture.stroke(0, 0, 0, 8);
	for (let i = 0; i < width * height * 15 / 100; i++) {
		texture.strokeWeight(random(2));
		texture.point(random(width), random(height));
	}
}

function draw() {
	background(0, 0, 90);
	image(texture, 0, 0);
	let ww = sqrt(width * width + height * height);
	push();
	translate(width / 2, height / 2);
	rotate(45);
	translate(-ww / 2, -ww / 2);
	drawingContext.shadowColor = color(0, 0, 0, 50);
	drawingContext.shadowBlur = 5;
	separateGrid(0, 0, ww);
	pop();
	noLoop();
}


function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) > 10 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				// rect(i, j, w, w);
				drawMyMood(i, j, w, w, n = random(4, 7), n - 2);
			}
		}
	}
}


function drawMyMood(x, y, w, h, d, dd) {
	let offset = min(w, h) / 5;
	let rotate_num = random(360);
	let prevCol;
	noStroke();
	for (let n = d; n > dd; n -= (d - dd) / 5) {
		push();
		translate(x + w / 2, y + h / 2);
		rotate(rotate_num);
		translate(-w / 2, -h / 2);
		curveTightness(n);
		let col = random(pallete);
		while (col == prevCol) col = random(pallete);
		fill(col);
		beginShape();
		curveVertex(offset, offset); //1
		curveVertex(w - offset, offset); //2
		curveVertex(w - offset, h - offset); //3
		curveVertex(offset, h - offset); //4

		//1〜3をもう1度繰り返すとつながる
		curveVertex(offset, offset);
		curveVertex(w - offset, offset);
		curveVertex(w - offset, h - offset);
		endShape();
		pop();
		prevCol = col;
	}

}