let graphices;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	randomSeed(frameCount / 10);
	graphices = drawGraphics(width / 2, height / 2, 10);
	background(0, 0, 90);
	let w = sqrt(width * width + height * height);

	push();
	translate(width / 2, height / 2);
	rotate(int(random(12)) * 360 / 12);
	translate(-w / 2, -w / 2);
	separateGrid(0, 0, w, graphices);
	pop();
	// noLoop();
	// frameRate(0.5);
}


function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 3) {
				separateGrid(i, j, w, graphices);
			} else {
				// rect(i,j,w,w);
				let g = random(graphices);
				push();
				translate(i + w / 2, j + w / 2);
				rotate(int(random(4)) * 360 / 4);
				imageMode(CENTER);

				drawingContext.shadowColor = color(0, 0, 0, 33);
				drawingContext.shadowBlur = w / 10;
				drawingContext.shadowOffsetX = w / 20;
				drawingContext.shadowOffsetY = w / 20;
				image(g, 0, 0, w, w);
				pop();
			}
		}
	}
}

function drawGraphics(w, h, num) {
	let arr = [];
	for (let i = 0; i < num; i++) {
		let g = createGraphics(w, h, WEBGL);
		g.ortho(-w / 2, w / 2, -h / 2, h / 2, -2500, 2500);
		g.colorMode(HSB, 360, 100, 100);
		g.angleMode(DEGREES);

		g.rotateX(int(random(8)) * 360 / 8);
		g.rotateY(int(random(8)) * 360 / 8);
		g.rotateZ(int(random(8)) * 360 / 8);
		// g.normalMaterial();
		g.scale(0.5);
		switch (i % 5) {
			case 0:
				g.box(w / sqrt(2));
				break;
			case 1:
				g.sphere(w / sqrt(2));
				break;
			case 2:
				g.cylinder(w / 2, w / sqrt(2));
				break;
			case 3:
				g.cone(w / 3, w);
				break;
			case 4:
				g.torus(w / 2, w / 6);
				break;
		}

		arr.push(g);
	}
	return arr;
}