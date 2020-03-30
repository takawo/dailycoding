let bg;
let pallete = ["#09061B", "#13215C", "#BC5159", "#533355", "#956782", "#F9A16F", "#F8BE86"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	bg.stroke(0, 0, 100, 10);
	for (let i = 0; i < bg.width * bg.height * 10 / 100; i++) {
		bg.point(random(bg.width),
			random(bg.height));
	}
}

function draw() {
	let colors = pallete.concat();
	let bgNum = int(random(colors.length));
	background(colors[bgNum]);
	colors.splice(bgNum,1);
	
	let ww = sqrt(sq(width) + sq(height));
	randomSeed(0);
	push();
	translate(width / 2, height / 2);
	rotate(int(random(4)) * 360 / 4 + 45);
	separateGrid(-ww / 2, -ww / 2, ww,colors);
	pop();

	image(bg, 0, 0);
	noLoop();
}


function separateGrid(x, y, d,colors) {
	let sepNum = int(random(1, 3));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 95 && d > width / 15) {
				separateGrid(i, j, w,colors);
			} else {
				//rect(i, j, w, w);
				let shapeNum = int(random(2));
				let direction = random(100) > 50 ? -1 : 1;
				let cx = i + w / 2;
				let cy = j + w / 2;
				drawBezierShape(cx, cy, w / 2 * 1.15,colors);
			}
		}
	}
}


function drawBezierShape(x, y, rr,colors) {
	push();
	translate(x, y);
	rotate(random(360));
	let angleStep = 360 / int(random(5, 8));
	let noiseScale = int(random(1, 8)) * 10;
	let sep = random(4, 8);

	for (let r = rr; r > 0; r -= rr / sep) {
		let c = colors[int(random(colors.length))];
		fill(c);
		noStroke();
		beginShape();
		for (let angle = 0; angle < 360; angle += angleStep) {
			let r1 = map(noise(angle / noiseScale), 0, 1, r / 2, r);
			let x1 = cos(angle) * r1;
			let y1 = sin(angle) * r1;
			vertex(x1, y1);
			let pRatio = random(2, 4);
			let px1 = x1 + cos(angle + 90) * r1 / pRatio;
			let py1 = y1 + sin(angle + 90) * r1 / pRatio;
			let angle2 = angle + angleStep;
			let r2 = map(noise(angle2 % 360 / noiseScale), 0, 1, r / 2, r);
			let x2 = cos(angle2) * r2;
			let y2 = sin(angle2) * r2;
			pRatio = random(2, 4);
			let px2 = x2 + cos(angle2 - 90) * r2 / pRatio;
			let py2 = y2 + sin(angle2 - 90) * r2 / pRatio;
			bezierVertex(px1, py1, px2, py2, x2, y2);
		}
		endShape();
	}

	pop();

}