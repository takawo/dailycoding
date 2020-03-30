let img;
let w = 800;
let h = 800;
let count = 0;
let cellH;
let cellW;
let amp;

function preload() {
	img = loadImage("https://loremflickr.com/" + w + "/" + h + "/");
}

function setup() {
	createCanvas(w, h);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	cellH = int(img.height / int(random(10, 100)));
	cellW = int(img.width / int(random(10, 100)));
	amp = int(img.width / int(random(1, 4)));
}

function draw() {
	//image(img,0,0);

	if (count % 2 == 0) {
		for (let y = 0; y < img.height; y += cellH) {
			let x = sin(frameCount) * tan(y / 10 + frameCount) * amp;
			let trim = img.get(0, y, img.width, cellH);
			image(trim, x, y);
		}
	} else {
		for (let x = 0; x < img.width; x += cellW) {
			let y = sin(frameCount) * tan(x / 10 + frameCount) * amp;
			let trim = img.get(x, 0, cellW, img.height);
			image(trim, x, y);
		}
	}
	if (frameCount % 180 == 0) {
		count++;
		cellH = int(img.height / int(random(10, 100)));
		cellW = int(img.width / int(random(10, 100)));
		amp = int(img.width / int(random(1, 4)));

	}
}