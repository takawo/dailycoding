let palette = ["#568777", "#B6BDB0", "#4C594B", "#FB9E27", "#2B9192", "#DC3509", "#0C120E", "#EEEEEE"];
let g;

function setup() {
	createCanvas(800, 800, WEBGL);
	colorMode(HSB, 360, 100, 100, 100);
	ortho(-width / 2, width / 2, height / 2, -height / 2, -1600, 1600);
}

function draw() {

	let colors = palette.concat();
	randomSeed(frameCount * 10000);
	let bgNum = int(random(colors.length));
	let bg = colors[bgNum];
	colors.splice(bgNum, 1);
	background(bg);
	orbitControl();
	ambientLight(0, 0, 30);
	// pointLight(0,0,30, 0, 0, 100);
	directionalLight(0, 0, 50, 1, 0, -1);

	push();
	let d = width * 0.5;
	rotateX(int(random(8)) * 360 / 8);
	rotateY(int(random(8)) * 360 / 8);
	rotateZ(int(random(8)) * 360 / 8);
	push();
	translate(-d / 2, -d / 2, -d / 2);
	separateGrid(0, 0, 0, d, d, colors);
	pop();
	pop();
	frameRate(0.5);
	// noLoop();
}



function separateGrid(x, y, z, d, dd, palette) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	let pc1 = -1;
	let pc2 = -1;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 10) {
				separateGrid(i, j, 0, w, dd, palette);
			} else {
				push();
				translate(i + w / 2, j + w / 2, 0);
				let ratio = 0.8;
				let k = 0;
				let kStep;
				while (k < dd) {
					let kStep = dd / int(random(2, 15));
					if (k + kStep > dd) kStep = dd - k;
					push();
					translate(0, 0, k + kStep / 2);
					let c1 = random(palette);
					let c2 = random(palette);
					while (c1 == c2 || pc1 == c1 || pc2 == c2) {
						c1 = random(palette);
						c2 = random(palette);

					}
					fill(c1);
					noStroke();
					// stroke(0,0,100);
					specularMaterial(c1);					
					box(w * ratio, w * ratio, kStep * ratio);
					pop();
					pc1 = c1;
					pc2 = c2;
					k += kStep;
				}
				for (let k = 0; k < dd; k += dd / 20) {}
				pop();
			}
		}
	}
}