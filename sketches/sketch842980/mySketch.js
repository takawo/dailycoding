let graphics;

function setup() {
	createCanvas(800, 800);

	graphics = createGraphics(width, height);
	graphics.fill(0, 20);
	graphics.noStroke();
	for (let i = 0; i < width * height * 15 / 100; i++) {
		graphics.ellipse(random(width),
			random(height),
			random(2),
			random(2));
	}
	frameRate(0.5);
}

function draw() {
	background(255);

	let offset = width / 10;
	let gWidth = width - offset * 2;
	
	let g = createGraphics(gWidth / 2, gWidth);
	g.angleMode(DEGREES);
	separateGrid(0, 0, g.height, g);
	
	push();
	translate(offset, offset);
	image(g, 0, 0);
	pop();
	push();
	translate(width - offset, offset);
	scale(-1, 1);
	image(g, 0, 0);
	pop();
	image(graphics,0,0);
	//save();
}

function separateGrid(x, y, d, g) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 30) {
				separateGrid(i, j, w, g);
			} else {
				let sep = int(random(w / 4, w / 2));
				// g.rect(i, j, w, w);
				g.push();
				g.translate(i + w / 2, j + w / 2);
				g.rotate(int(random(4)) * 360 / 4);
				let n = random(100);
				for (let ww = w; ww > 0; ww -= w / sep) {
					g.rectMode(CENTER);
					//strokeCap(ROUND);
					g.strokeCap(SQUARE);
					let list = [];
					let rMax = w * TWO_PI / 4;
					let strokeWidth = w / int(random(rMax / 8, rMax));
					let separateWidth = w / int(random(5, 20));
					list.push(strokeWidth);
					list.push(strokeWidth);
					let sw = 1;
					w / 50;
					g.strokeWeight(sw);
					g.stroke(0);
					g.drawingContext.setLineDash(list); // set the "dashed line" mode
					if (n > 50) {
						g.arc(-w / 2, -w / 2, ww * 2 - sw / 2, ww * 2 - sw / 2, 0, 90);

					} else {
						g.rect(0, 0, ww - sw / 2, ww - sw / 2);
					}
					g.drawingContext.setLineDash([]); // reset into "solid line" mode
				}
				g.pop();
			}
		}
	}
}