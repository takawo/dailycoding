let cells, offset, margin, d;
let url = "https://coolors.co/ff9f1c-ffbf69-ffffff-cbf3f0-2ec4b6";
let palette = createPalette(url);
let texture;

function setup() {
	createCanvas(800, 800);
	pixelDensity(1);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);

	let percent = 10 / 100;
	for (let i = 0; i < width * height * percent; i++) {
		let x = random(width);
		let y = random(height);
		let dw = random(3);
		let dh = random(3);
		texture.fill(0, 0, 100, 15);
		texture.noStroke();
		texture.ellipse(x, y, dw, dh);
	}

}

function drawFuncyShape(g, i) {
	init(i);
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = offset + i * (d + margin);
			let y = offset + j * (d + margin);
			let cx = x + d / 2;
			let cy = y + d / 2;
			let ratio_A = random(0.1, 0.9);
			let ratio_B = 1 - ratio_A;
			let ad = d * ratio_A;
			let bd = d * ratio_B;
			g.push();
			g.translate(cx, cy);
			g.rotate(random(360));
			g.noStroke();

			// g.drawingContext.shadowColor = color(0, 0, 0, 10);
			// g.drawingContext.shadowBlur = d / 5;

			if (random(100) > 50) {
				let colors = shuffle(palette.concat(), true);
				let n = 0;
				for (let k = 5; k > 0; k--) {
					let dd = d * k / 5;
					g.fill(colors[n % colors.length]);
					n++;
					g.arc(0, 0, dd, dd, 0, 180, PIE);
				}
				let add = ad;
				colors = shuffle(palette.concat(), true);
				while (add > 0) {
					g.fill(colors[n % colors.length]);
					n++;
					g.arc(-d / 2 + ad / 2, 0, add, add, 180, 360, PIE);
					add -= d * 1 / 5;
				}
				let bdd = bd;
				colors = shuffle(palette.concat(), true);
				while (bdd > 0) {
					g.fill(colors[n % colors.length]);
					n++;
					g.arc(+d / 2 - bd / 2, 0, bdd, bdd, 180, 360, PIE)
					// rect(x, y, d, d);
					bdd -= d * 1 / 5
				}
			} else {
				let colors = shuffle(palette.concat(), true);
				let n = 0;
				let add = ad;
				while (add > 0) {
					g.fill(colors[n % colors.length]);
					n++;
					g.arc(-d / 2 + ad / 2, 0, add, add, 180, 360, PIE);
					add -= d * 1 / 5;
				}
				let bdd = bd;
				colors = shuffle(palette.concat(), true);
				while (bdd > 0) {
					g.fill(colors[n % colors.length]);
					n++;
					g.arc(+d / 2 - bd / 2, 0, bdd, bdd, 180, 360, PIE)
					// rect(x, y, d, d);
					bdd -= d * 1 / 5
				}
				colors = shuffle(palette.concat(), true);
				for (let k = 5; k > 0; k--) {
					let dd = d * k / 5;
					g.fill(colors[n % colors.length]);
					n++;
					g.arc(0, 0, dd, dd, 0, 180, PIE);
				}
			}

			g.pop();

		}
	}
	drawingContext.shadowColor = color(0, 0, 0, 20);
	drawingContext.shadowBlur = offset / 4;
	image(g, 0, 0);
}

function init(n) {
	cells = n;
	offset = width / 10;
	margin = offset / 5;
	d = (width - offset * 2 - margin * (cells - 1)) / cells;
	// drawingContext.shadowColor = color(0, 0, 0,33);
	// drawingContext.shadowBlur = offset;

}

function draw() {
	background(0, 0, 90);
	for (let i = 0; i < 1; i++) {
		let g = createGraphics(width, height);
		g.colorMode(HSB, 360, 100, 100, 100);
		g.angleMode(DEGREES);
		drawFuncyShape(g, int(random(2, 6)));
	}
	image(texture, 0, 0);
	frameRate(0.5);
}


function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}