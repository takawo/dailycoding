let g;
let offset, w;
let d = 250;
let t = 0;
let n = 0;
let url = "https://coolors.co/f6bd60-f7ede2-f5cac3-84a59d-f28482";
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	g = createGraphics(width, height);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);

	offset = width / 10;
	w = sqrt(sq(width + offset) + sq(height + offset));
	palette = createPalette(url);

}

function draw() {
	background(220, 80, 30);
	g.clear();
	randomSeed(t);
	let u = t;
	let s = t;
	g.push();
	g.translate(width / 2, height / 2);
	g.rotate(-45);
	g.translate(-w / 2, -w / 2);
	let deltaTime = 1.0 / 120.0;
	let k = 8.0;
	n = lerp(d, n, exp(-k * deltaTime));
	g.noStroke();
	// g.drawingContext.shadowColor = color(0, 0, 0, 25);

	for (let y = 0; y < w; y += d + offset / 2) {
		for (let x = n; x < w + n; x += d) {
			let m = abs(palette.length + u) % palette.length;
			for (let i = palette.length - 1; i > 0; i--) {
				g.fill(palette[(m + i) % palette.length]);
				let dd = d * i / palette.length;
				g.arc(x + d / 2, y + d / 2, dd, dd, 0, 180);
			}
			u--;
		}
		for (let x = -n + d / 2; x < -n + w + d / 2; x += d) {
			let m = s % palette.length;
			for (let i = palette.length - 1; i > 0; i--) {
				g.fill(palette[(m + i) % palette.length]);
				let dd = d * i / palette.length;
				// g.drawingContext.shadowBlur = dd / 4;
				g.arc(x + d / 2, y + d / 2, dd, dd, 180, 360);
			}
			s++;
		}
	}
	g.pop();
	separateGrid(0, 0, width);





	// image(g,0,0);
	if (abs(d - n) < 1) {
		n = 0;
		t++;
	}
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 5));
	let w = d / sepNum;
	let ratio = 1 / 20;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 2) {
				separateGrid(i, j, w);
			} else {
				let ww = constrain(random(g.width), g.width / 10, g.width);
				let hh = ww;
				let x = random(g.width - ww);
				let y = random(g.height - hh);
				let g_trim = g.get(x, y, ww, hh);
				drawingContext.shadowColor = color(0, 0, 100, 33);
				drawingContext.shadowBlur = w / 5;
				// image(g_trim, i + w / 10, j + w / 10, w * 8 / 10, w * 8 / 10);
				push();
				translate(i + w / 2, j + w / 2);
				imageMode(CENTER);
				rotate(int(random(4)) * 360 / 4);
				image(g_trim, 0, 0, w, w);
				pop();
			}
		}
	}
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