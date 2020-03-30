let cells, cellW, w;
let ns = 200;
let url = "https://coolors.co/app/e2302d-510048-000028-e25b53-044472";
let pallete = [];
let graphics;

function setup() {
	createCanvas(800, 800, WEBGL);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	ortho(-width / 2, width / 2, height / 2, -height / 2, -1500, 1500);

	cells = int(random(5, 20));
	w = sqrt(sq(width) + sq(height));
	cellW = w / cells;
	pallete = createPallete(url);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);

	for (let i = 0; i < 50000; i++) {
		graphics.stroke(0, 0, 100, 7);
		graphics.point(random(width), random(height));
	}
	img = createImage(width, height);
	img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);

}

function draw() {
	randomSeed(frameCount / 200);
	background(0, 0, 20);
	orbitControl();
	rotateX(random(-30, 30));
	rotateY(random(-30, 30));
	rotateZ(random(-30, 30));
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = -w / 2 + cellW * i;
			let y = -w / 2 + cellW * j;
			push();
			translate(x + cellW / 2, y + cellW / 2, 0);
			let n = noise(x / ns, y / ns, frameCount / ns);
			rotate(int(n * 4) * 360 / 4 + 45);
			let ww = sqrt(sq(cellW) * 2);
			whichColor(pallete);
			box(ww, ww / 10, 100);
			pop();
		}
	}
	if (frameCount % 200 == 0) {
		cells = int(random(5, 10));
		cellW = w / cells;
	}

	push();
	translate(0, 0, 100);
	texture(img);
	noStroke();
	plane(w);
	pop();
}

function whichColor(colors) {
	let n1 = int(random(colors.length));
	let n2 = n1;
	while (n1 == n2) {
		n2 = int(random(colors.length));
	}
	let c = colors[n1];
	let cc = colors[n2];
	fill(c);
	stroke(cc);

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