let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallete = createPallete(url);

let g, gg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	g = createGraphics(width, height);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);
	g.background(0, 0, 95);

	g.stroke(0, 0, 0, 5);
	for (let i = 0; i < width * height * 10 / 100; i++) {
		g.strokeWeight(random(3));
		g.point(random(width), random(height));
	}


	let cells = int(random(2, 5));
	let offset = width / 15;
	let margin = offset / 2;
	let cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let cx = offset + i * (cellSize + margin) + cellSize / 2;
			let cy = offset + j * (cellSize + margin) + cellSize / 2;
			g.push();
			g.drawingContext.shadowColor = color(0, 0, 0, 25);
			g.drawingContext.shadowBlur = cellSize / 4;
			g.noStroke();
			g.ellipse(cx, cy, cellSize, cellSize);
			g.pop();

			g.push();
			g.erase(255, 0);
			g.ellipse(cx, cy, cellSize, cellSize);
			g.noErase();
			g.pop();
		}
	}

	gg = createGraphics(width, height);
	gg.colorMode(HSB, 360, 100, 100, 100);
	gg.angleMode(DEGREES);
	concentricCircles(gg, 500);

	// for (let i = 0; i < width * height * 10 / 100; i++) {
	//   // g.stroke(0, 0, 0, 10);
	//   // g.point(random(width), random(height));
	//   gg.stroke(0, 0, 100, 10);
	//   gg.strokeWeight(random(3));
	//   gg.point(random(width), random(height));
	// }

}

function draw() {
	blendMode(BLEND);
	background(0, 0, 70);
	// blendMode(DIFFERENCE);
	image(gg, 0, 0);
	image(g, 0, 0);
	noLoop();
}

function concentricCircles(g, num) {
	for (let i = 0; i < num; i++) {
		let ds = width / int((1 - random(random())) * 8 + 2);
		let d = random(ds / 2, ds);
		let x = random(width);
		let y = random(height);
		let angle = random(360);
		g.drawingContext.shadowColor = color(0, 0, 0, 20);
		g.drawingContext.shadowBlur = ds;
		for (let dd = d; dd > 0; dd -= d / 5) {
			let x1 = x + cos(angle + dd * 5) * dd / 2;
			let y1 = y + sin(angle + dd * 5) * dd / 2;
			let x2 = x + cos(angle + dd * 5 + 180) * dd / 2;
			let y2 = y + sin(angle + dd * 5 + 180) * dd / 2;
			let gradient = g.drawingContext.createRadialGradient(x, y, 0, x, y, dd);
			// Add three color stops
			let a = 255;
			let c1 = color(random(pallete) + hex(a, 2));
			let c2 = color(random(pallete) + hex(a, 2));
			while (c1 == c2) {
				c2 = color(random(pallete) + hex(a, 2));
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

function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}