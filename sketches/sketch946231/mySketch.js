let g;
let url = "https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51";
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	palette = createPalette(url);

	g = createGraphics(width, height, WEBGL);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);
	g.ortho(-width / 2, width / 2, -height / 2, height / 2, -5000, 5000);


	// g.plane(width,height);
	// g.box(100);
}

function draw() {
	background(0, 0, 90);

	// randomSeed(frameCount / 10);
	g.clear();
	g.push();
	g.rotateX(20 + map(sin(frameCount), -1, 1, 10, 50));
	g.rotateY(frameCount / 3);

	let cells = 10;
	let offset = width / 10;
	let margin = 0; //offset / 5;
	let nn = 0;
	let d = (width * 3 - offset * 2 - margin * (cells - 1)) / cells;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = -width * 1.5 + offset + i * (d + margin) + d / 2;
			let z = -height * 1.5 + offset + j * (d + margin) + d / 2;
			g.push();
			g.translate(x, 0, z);
			g.rotateX(90);
			let n = nn + int(noise(x, z, frameCount / 50) * 4);
			g.rotate(n * 360 / 4);
			g.noStroke();
			//  g.plane(d, d);
			let m = n;
			for (let dd = d * 2; dd > 0; dd -= d * 2 / 5) {
				g.push();
				g.translate(0, 0, -m / 100);
				g.fill(palette[m % palette.length]);
				g.arc(-d / 2, -d / 2, dd, dd, 0, 90);
				g.pop();
				m++;
			}
			g.pop();
			nn++;
		}
	}
	g.pop();
	drawingContext.shadowColor = color(0, 0, 0, 50);
	drawingContext.shadowBlur = d / 4;
	// drawingContext.shadowOffsetY = d/2;
	image(g, 0, 0);
	// noLoop();
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = color('#' + arr[i]);
	}
	return arr;
}