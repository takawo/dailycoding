let pallete = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#02020C"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 10);
	blendMode(SCREEN);

	let offset = width / 5;
	randomSeed(frameCount / 100);
	separateGrid(-offset, -offset, width + offset * 2);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;

	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if ((random(100) < 90 && d > width / 5) || d > width * 1.1) {
				separateGrid(i, j, w);
			} else {
				let c1 = random(pallete);
				let c2 = random(pallete);
				while (c1 == c2) {
					c2 = random(pallete);
				}
				drawingContext.shadowColor = color(c1 + hex(100, 2));
				drawingContext.shadowBlur = w / 5;
				drawingContext.shadowOffsetX = w / 20;
				drawingContext.shadowOffsetY = w / 20;
				// rect(i,j,w,w);
				let cx = i + w / 2;
				let cy = j + w / 2;

				push();
				translate(cx, cy);
				rectMode(CENTER);
				fill(c2);
				noStroke();

				let points = [];
				let n = 0;
				let num = int(random(3, 10));
				let angleStep = 360 / num;
				beginShape();
				for (let angle = 0; angle < 360; angle += angleStep) {
					let r = noise((i + j * width) * 100, angle / 150, frameCount / 50) * w / 1.77;
					let xxx = +cos(angle) * r;
					let yyy = +sin(angle) * r;
					if (n < 3) {
						points.push(createVector(xxx, yyy));
					}
					curveVertex(xxx, yyy);
					n++;
				}
				for (let p of points) {
					curveVertex(p.x, p.y);
				}
				endShape();
				pop();
				// noLoop();        
			}
		}
	}
}