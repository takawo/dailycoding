let texture;
let pallete = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.stroke(255, 5 / 100 * 255);
	for (let i = 0; i < width * height * 5 / 100; i++) {
		texture.strokeWeight(random(3));
		texture.point(random(width),
			random(height));
	}
}

function draw() {
	background(0, 0, 100);

	let w = sqrt(sq(width) + sq(height));

	push();
	translate(width / 2, height / 2);
	rotate(random(360));
	translate(-w / 2, -w / 2);
	let offset = width / 20;
	separateGrid(-offset, -offset, w + offset * 2, w + offset * 2);
	pop();
	image(texture, 0, 0);
	noLoop();
}


function separateGrid(x, y, dw, dh) {
	let n = int(random(1, 5));
	let w = dw / n;
	let h = dh / n;

	let iStep;
	let jStep;
	for (let j = 0; j < n; j += jStep) {
		jStep = int(random(1, 3));
		if (j + jStep > n) jStep = n - j;
		for (let i = 0; i < n; i += iStep) {
			iStep = int(random(1, 3));
			if (i + iStep > n) iStep = n - i;
			let xx = x + i * w;
			let yy = y + j * h;
			let ww = w * iStep;
			let hh = h * jStep;
			if (random(100) < 95 && min(ww, hh) > width / 10) {
				separateGrid(xx, yy, ww, hh);
			} else {
				// rect(xx,yy,ww,hh);
				let d = min(ww, hh) / int(random(1, 5));
				for (let ry = yy; ry < yy + hh - 1; ry += d) {
					for (let rx = xx; rx < xx + ww - 1; rx += d) {
						let cx = rx + d / 2;
						let cy = ry + d / 2;
						for (let dd = d; dd > 0; dd -= d / n) {
							let c = random(pallete);
							drawingContext.shadowColor = color(c);
							drawingContext.shadowBlur = dd / d * d;
							noStroke();
							fill(c + hex(150, 2));
							circle(cx, cy, dd * 4 / 5);
						}
					}
				}
			}
		}

	}
}