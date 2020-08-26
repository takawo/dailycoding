let url = "https://coolors.co/0081a7-00afb9-fdfcdc-fed9b7-f07167";
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	palette = createPalette(url);
}

function draw() {
	background(0, 0, 95);
	separateGrid(0, 0, width);
	frameRate(1);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 3) {
				separateGrid(i, j, w);
			} else {
				let n = int(random(4)) * 360 / 4;
				for (let k = 0; k < 4; k++) {
					drawFancySquare(i, j, w, k * 90 + n);
				}
			}
		}
	}
}

function drawFancySquare(x, y, w, k) {
	let g = createGraphics(w, w);
	let rotate_num = k;
	g.angleMode(DEGREES);
	g.curveTightness(random(1, -5));
	let colors = shuffle(palette.concat());
	let n = 0;
	for (let d = w; d >= 0; d -= w / 30) {
		g.push();
		g.translate(w / 2, w / 2);
		g.rotate(rotate_num);
		g.translate(-d, 0);
		// let d = w / 2 * 0.5;
		g.fill(colors[n % colors.length]);
		// g.stroke(colors[(n+3)%colors.length]);
		g.noStroke();
		// g.drawingContext.shadowColor = colors[(n + 3) % colors.length];
		// g.drawingContext.shadowBlur = w / 20;
		g.beginShape();
		g.curveVertex(-d, -d);
		g.curveVertex(d, -d);
		g.curveVertex(d, d);
		g.curveVertex(-d, d);
		g.curveVertex(-d, -d);
		g.curveVertex(d, -d);
		g.curveVertex(d, d);
		g.endShape();
		g.pop();
		n++;
	}
	let ratio = 1;
	image(g, x + w * (1 - ratio) / 2, y + w * (1 - ratio) / 2, w * ratio, w * ratio);
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