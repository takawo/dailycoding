let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallet = createPallet(url);
let mic;
let x, y, offset, margin, rows;
let xStep, yStep;
let frontLayer, backLayer;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);

	backLayer = createGraphics(width, height);
	backLayer.colorMode(HSB, 360, 100, 100, 100);
	backLayer.angleMode(DEGREES);
	concentricCircles(backLayer, 500, pallet);

	frontLayer = createGraphics(width, height);
	frontLayer.colorMode(HSB, 360, 100, 100, 100);
	frontLayer.angleMode(DEGREES);
	frontLayer.background(0, 0, 90);
	frontLayer.stroke(0, 0, 0, 8);
	for (let i = 0; i < width * height * 10 / 100; i++) {
		let x = random(width);
		let y = random(height);
		frontLayer.point(x, y);
	}
	frontLayer.blendMode(ADD);

	mic = new p5.AudioIn();
	mic.start();

	offset = width / 10;
	margin = offset / 5;
	rows = random(3, 10);
	yStep = (height - offset * 2 - margin * (rows - 1)) / rows;
	xStep = 2;

	x = offset;
	y = offset;
	background(0, 0, 90);
}

function draw() {
	image(backLayer, 0, 0);
	image(frontLayer, 0, 0);
	let vol = mic.getLevel();
	if (vol > 0.01) {
		let d = map(vol, 0, 0.2, 0, yStep);

		frontLayer.push();
		frontLayer.noErase();
		frontLayer.strokeWeight(xStep);
		frontLayer.strokeCap(SQUARE);
		frontLayer.stroke(0, 0, 0);
		frontLayer.drawingContext.shadowColor = color(0, 0, 100, 20);
		frontLayer.drawingContext.shadowBlur = d / 5;
		frontLayer.line(x, y + yStep / 2 - d / 2, x, y + yStep / 2 + d / 2);
		frontLayer.pop();


		frontLayer.push();
		frontLayer.erase(0, 255);
		frontLayer.strokeWeight(xStep);
		frontLayer.strokeCap(SQUARE);
		frontLayer.line(x, y + yStep / 2 - d / 2, x, y + yStep / 2 + d / 2);
		frontLayer.pop();
		x += xStep;
		if (x > width - offset) {
			x = offset;
			y += yStep + margin;
		}
		if (y + yStep / 2 > height - offset) {
			saveCanvas();
			noLoop();
		}
	}
}

function concentricCircles(g, num, pallet) {
	for (let i = 0; i < num; i++) {
		let ds = width / int((1 - random(random())) * 8 + 2);
		let d = random(ds / 2, ds);
		let x = random(width);
		let y = random(height);
		let angle = random(360);
		g.drawingContext.shadowColor = color(0, 0, 100, 20);
		g.drawingContext.shadowBlur = ds;
		for (let dd = d; dd > 0; dd -= d / 5) {
			let x1 = x + cos(angle + dd * 5) * dd / 2;
			let y1 = y + sin(angle + dd * 5) * dd / 2;
			let x2 = x + cos(angle + dd * 5 + 180) * dd / 2;
			let y2 = y + sin(angle + dd * 5 + 180) * dd / 2;
			let gradient = g.drawingContext.createRadialGradient(x, y, 0, x, y, dd);
			// Add three color stops
			let a = 255;
			let c1 = color(random(pallet) + hex(a, 2));
			let c2 = color(random(pallet) + hex(a, 2));
			while (c1 == c2) {
				c2 = color(random(pallet) + hex(a, 2));
			}
			gradient.addColorStop(0, c2);
			gradient.addColorStop(1, c1);
			g.drawingContext.fillStyle = gradient;
			g.noStroke();
			let xx = x + cos(angle) * dd / 2;
			let yy = y + sin(angle) * dd / 2;
			g.circle(xx, yy, dd);
		}

	}
}

function createPallet(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}