let ns = 100000 / 5;
let offset;

let url = "https://coolors.co/573ced-7b9fe9-e349c5-feb870-9aece0";
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	drawingContext.shadowColor = color(0, 0, 0, 50);
	palette = createPalette(url);
}

function draw() {
	background(0, 0, 95);
	randomSeed(frameCount / 1000);
	offset = width / 10;
	separateGrid(-offset, -offset, width + offset * 2);
	// frameRate(1);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 4) {
				separateGrid(i, j, w);
			} else {
				let x = i;
				let y = j;

				let points = [
					createVector(x, y),
					createVector(x + w, y),
					createVector(x + w, y + w),
					createVector(x, y + w),
				];
				drawingContext.shadowBlur = w / 2;
				noStroke();
				fill(random(palette));
				beginShape();
				for (let k = 0; k < points.length; k++) {
					let p = points[k];
					let np = points[(k + 1) % points.length];
					for (let n = 0; n < 1; n += 0.1) {
						let cp = p5.Vector.lerp(p, np, n);
						let angle = map(noise(cp.x / ns, cp.y / ns, frameCount / 2500), 0, 1, -360 / 2, 360 / 2);
						let newp = p5.Vector.fromAngle(angle).mult(offset).add(cp);
						vertex(newp.x, newp.y);
					}
				}
				endShape(CLOSE);
				// rect(i, j, w, w);
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