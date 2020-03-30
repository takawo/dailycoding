let pallete = ["#030B45", "#DCB15B", "#E2656F", "#CD9B98", "#1840A4", "#F5E39E"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 90);
	push();
	translate(width / 2, height / 2);
	rotate(int(random(8)) * 360 / 8);
	let w = sqrt(width * width + height * height);
	translate(-w / 2, -w / 2);
	let offset = w / 10;
	let margin = offset / 5;
	let cells = int(random(5, 12));
	let d = (w + offset * 2 - margin * (cells - 1)) / cells;

	drawingContext.shadowColor = color(0, 0, 0, 10);
	drawingContext.shadowBlur = d / 2;
	noStroke();
	let startLeft = true;
	for (let j = 0; j < cells; j++) {
		for (let i = 5; i > 0; i--) {
			let x1 = -offset;
			let x2 = w + offset;
			let y1 = -offset + j * (d + margin) + d / 2;
			let y2 = y1;
			if (!startLeft) {
				let arr = swap(x1, x2);
				x1 = arr[0];
				x2 = arr[1];
			}
			let sep = int(random(4, 10));
			triangleLine(x1, y1, x2, y2, sep);
		}
		startLeft = !startLeft;
	}
	pop();
	frameRate(0.5);
}

function triangleLine(x1, y1, x2, y2, sep) {
	let distance = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	push();
	translate(x1, y1);
	rotate(angle);
	// line(0, 0, distance, 0);

	let n = 0;
	let i = 0;
	let step = distance / sep;

	while (n < distance) {
		let c1 = random(pallete);
		let c2 = random(pallete);
		let c3 = random(pallete);
		while (c1 == c2 || c2 == c3 || c3 == c1) {
			c1 = random(pallete);
			c2 = random(pallete);
			c3 = random(pallete);
		}
		step = distance / sep;
		let dd = step;
		if (n + step > distance) {
			step = distance - n;
		}
		let gradient = drawingContext.createLinearGradient(n, dd, n, -dd);
		gradient.addColorStop(0.0, c1);
		gradient.addColorStop(0.5, c2);
		gradient.addColorStop(1.0, c3);
		//上で指定したグラデーション内容を塗りつぶしスタイルに代入する
		drawingContext.fillStyle = gradient;

		if (i % 2 == 0) {
			beginShape();
			let angleA = 270;
			let angleB = 90;
			vertex(n, dd);
			vertex(n, -dd);
			n += step;
		} else {
			let angleC = 0
			vertex(n, 0);
			endShape(CLOSE);
			angleA = angleC;
			n += 0;
		}
		if (i % 2 == 0 && n + step >= distance) {
			vertex(n, 0);
			endShape(CLOSE);
		}
		i++;
	}
	pop();
}

function swap(n, m) {
	let temp = n;
	n = m;
	m = temp;
	return [n, m]
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