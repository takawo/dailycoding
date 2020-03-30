let url = "https://coolors.co/app/ec9ca2-ffd691-7dd2e4-73dfb7-e8e2d6";
let pallete;
let bg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	pallete = createPallete(url);
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

	background(0, 0, 20);
	let w = sqrt(sq(width) + sq(height));
	push();
	translate(width / 2, height / 2);
	rotate(int(random(4)) * 360 / 4 + 45);
	separateGrid(-w / 2, -w / 2, w);
	pop();
	image(bg, 0, 0);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				drawCircularArc(i + w / 2, j + w / 2, w, pallete.concat());
			}
		}
	}
}

function drawCircularArc(x, y, r, colors) {
	let angle = 0;
	let count = 0;
	let rotateAngle = random(360);
	while (r > 15 && count < 100) {
		let angleStep = int(random(1, 5)) * 360 / 8;
		push();
		translate(x, y);
		rotate(rotateAngle + angle);
		if (colors.length == 0) {
			colors = pallete.concat();
		}
		let cNum = int(random(colors.length));
		let fc = colors[cNum];
		colors.splice(cNum, 1);

		if (colors.length == 0) {
			colors = pallete.concat();
		}
		let cNum2 = int(random(colors.length));
		let sc = colors[cNum2];
		colors.splice(cNum2, 1);
		fill(fc);
		stroke(sc);
		arc(0, 0, r, r, 0, angleStep, PIE);
		pop();
		angle = angle + angleStep;
		if (angle >= 360) {
			angle = 0;
		}
		r -= r / 8;
		count++;
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