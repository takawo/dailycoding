let imgs = [];

function preload() {
	for (let i = 0; i < 30; i++) {
		let img = loadImage("https://loremflickr.com/400/400?random=" + i);
		imgs.push(img);
	}
}

function setup() {
	createCanvas(800, 800, WEBGL);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	ortho(-width / 2, width / 2, height / 2, -height / 2, -1600, 1600);

}

function draw() {
	background(0, 0, 90);
	randomSeed(frameCount / 120);
	orbitControl();
	ambientLight(0, 0, 100);
	// pointLight(0,0,-100, 0, 0, 100);
	directionalLight(0, 0, 20, 0, 0, -1);


	let d = width * 0.55;
	let t = frameCount;
	rotateX(int(random(8)) * 360 / 8 + t / 2);
	rotateY(int(random(8)) * 360 / 8 + t / 3);
	rotateZ(int(random(8)) * 360 / 8 + t / 5);
	push();
	translate(-d / 2, -d / 2, -d / 2);
	separateGrid(0, 0, 0, d);
	pop();
	// noLoop();

}

function separateGrid(x, y, z, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			for (let k = z; k < z + d - 1; k += w) {
				if (random(100) < 90 && d > width / 3) {
					separateGrid(i, j, k, w);
				} else {
					drawBoxImage(i + w / 2, j + w / 2, k + w / 2, w / 2, w / 15, imgs);
				}
			}
		}
	}
}

function drawBoxImage(x, y, z, d, offset, imgs) {
	noStroke();
	push();
	translate(x, y, z);
	push();
	translate(-d - offset, 0, 0);
	rotateY(-90);
	rotate(int(random(4)) * 360 / 4);
	texture(random(imgs));
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(d + offset, 0, 0);
	rotateY(90);
	rotate(int(random(4)) * 360 / 4);
	texture(random(imgs));
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(0, -d - offset, 0);
	rotateX(-90);
	rotate(int(random(4)) * 360 / 4);
	texture(random(imgs));
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(0, d + offset, 0);
	rotateX(90);
	rotate(int(random(4)) * 360 / 4);
	texture(random(imgs));
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(0, 0, d + offset);
	rotateZ(90);
	rotate(int(random(4)) * 360 / 4);
	texture(random(imgs));
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(0, 0, -d - offset);
	rotateZ(-90);
	rotate(int(random(4)) * 360 / 4);
	texture(random(imgs));
	plane(d * 2 - offset * 2);
	pop();

	pop();
}