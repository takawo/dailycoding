let ns = 100;
let n = 0;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 90);
	randomSeed(frameCount / 100);

	let w = sqrt(sq(width) + sq(height));
	push();
	translate(width / 2, height / 2);
	rotate(random(360));
	translate(-w / 2, -w / 2);
	rect(0, 0, w / 2, w);
	separateGrid(0, 0, w / 2, w, n)
	rect(w / 2, 0, w / 2, w);
	separateGrid(w / 2, 0, w / 2, w, n)
	pop();
	//noLoop();
}


function separateGrid(x, y, d, e, m) {
	let sepNum = int(random(1, 5));
	let w = d / sepNum;
	let h = e / sepNum;
	for (let j = y; j < y + e; j += h) {
		for (let i = x; i < x + d; i += w) {
			let n = noise(i / ns, j / ns, frameCount / ns);
			if (n > 0.35 && min(d, e) > 50) {
				separateGrid(i, j, w, h, m);
			} else {
				if (m % 2 == 0) {
					fill(0, 0, 100);
				} else {
					fill(0, 0, 0);
				}
				rect(i, j, w, h);
				if (m % 2 == 0) {
					fill(0, 0, 0);
				} else {
					fill(0, 0, 100);
				}
				triangle(i, j, i + w, j + h, i + w, j);
				m++;
			}
		}
	}
}