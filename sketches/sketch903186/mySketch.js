let pallete = ["#568777", "#B6BDB0", "#4C594B", "#FB9E27", "#2B9192", "#DC3509", "#0C120E", "#EEEEEE"];
let bg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	bg.fill(0, 0, 100, 5);
	for (let i = 0; i < width * height * 20 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		bg.noStroke();
		bg.ellipse(x, y, w, h);
	}
}

function draw() {
	background(0, 0, 15);

	let offset = width / 5;
	for (let i = 0; i < 100; i++) {

		let x1 = random(-offset, width + offset);
		let y1 = random(-offset, height + offset);
		let x2 = random(-offset, width + offset);
		let y2 = random(-offset, height + offset);

		lineArc(x1, y1, x2, y2);

	}
	image(bg, 0, 0);
	noLoop();
}

function lineArc(x1, y1, x2, y2) {
	let d = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	push();
	translate(x1, y1);
	rotate(angle);
	let n = 0;
	let dd = 0;
	while (dd < d) {
		let ddPlus = d / int(random(3, 20));
		if (dd + ddPlus > d) ddPlus = d - dd;
		let ax = dd + ddPlus / 2;
		drawingContext.shadowColor = color(0, 0, 100, 10);
		drawingContext.shadowBlur = d / 20;

		let c1 = random(pallete);
		let c2 = random(pallete);
		let c3 = random(pallete);
		while (c1 == c2 || c2 == c3 || c3 == c1) {
			c1 = random(pallete);
			c2 = random(pallete);
			c3 = random(pallete);
		}

		let gradient = drawingContext.createRadialGradient(ax, 0, 0, ax, 0, ddPlus);
		gradient.addColorStop(0.0, c1);
		gradient.addColorStop(0.5, c2);
		gradient.addColorStop(1.0, c3);
		//上で指定したグラデーション内容を塗りつぶしスタイルに代入する
		drawingContext.fillStyle = gradient;

		noStroke();
		if (n % 2 == 0) {
			arc(ax, 0, ddPlus, ddPlus, 0, 180);
		} else {
			arc(ax, 0, ddPlus, ddPlus, 0 + 180, 180 + 180);
		}
		n++;
		dd += ddPlus;
	}
	pop();
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