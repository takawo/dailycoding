let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);

	let percent = 10 / 100;
	for (let i = 0; i < width * height * percent; i++) {
		let x = random(width);
		let y = random(height);
		let dw = random(3);
		let dh = random(3);
		graphics.fill(0, 0, 0, 5);
		graphics.noStroke();
		graphics.ellipse(x, y, dw, dh);
	}
	background(0, 0, 90);
}

function draw() {
	if (frameCount % 5 == 0) {
		background(0, 0, 90);
	}
	separateGrid(0, 0, width);
	image(graphics, 0, 0);
	frameRate(1);

	//noLoop();
}


function separateGrid(x, y, d, colors) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 10) {
				separateGrid(i, j, w);
			} else {
				let num = int(random(1, 4));
				drawingContext.setLineDash([d / 20]);
				if (random(100) > 50) {
					drawLineArc(i, j, w / 2, num);
				} else {
					drawLineTriangle(i, j, w, num)
				}
				drawingContext.setLineDash([]);
			}
		}
	}
}

function drawLineArc(x, y, d, num) {
	push();
	translate(x, y);
	for (let i = 0; i < num; i++) {
		push();
		rotate(int(random(4)) * 360 / 4);
		for (let dd = d * 2 * 2; dd >= 0; dd -= d * 2 / 3) {
			arc(-d, -d, dd, dd, 0, 90, PIE);
		}
		pop();
	}
	pop();
}


function drawLineTriangle(x, y, d, num) {
	let rotateArr = [0, 90, 180, 360];
	let rotateArrCopy = rotateArr.concat();
	push();
	translate(x, y);
	for (let i = 0; i < num; i++) {
		push();
		rotate(int(random(4)) * 360 / 4);
		let sep = int(random(4, 8));
		for (let dd = 0; dd <= d; dd += d / sep) {
			fill(0, 0, 100);
			noStroke();
			triangle(0, 0 - dd, -d + dd, -d, d - dd, -d);
			stroke(0);
			line(0, 0 - dd, -d + dd, -d);
			line(0, 0 - dd, d - dd, -d);
			line(-d + dd, -d, d - dd, -d);
		}
		pop();
	}
	pop();
}

function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');

	for (let i = 0; i < arr.length; i++) {
		let red = unhex(arr[i].substr(0, 2));
		let green = unhex(arr[i].substr(2, 2));
		let blue = unhex(arr[i].substr(4, 2));
		colorMode(RGB, 255, 255, 255);
		let c = color(red, green, blue);
		let h = hue(c);
		let s = saturation(c);
		let b = brightness(c);
		let t = 100 * 3 / 4;
		colorMode(HSB, 360, 100, 100, 100);
		c = color(h, s, b, t);
		arr[i] = c;
	}
	return arr;
}