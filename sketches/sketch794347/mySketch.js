const scaleFactor = 6;
let i = 0;
let imgs = [];
let img;

let counter = 0;
let freeze = false;

function preload() {
	for (let n = 0; n < 10; n++) {
		let num = int(random(1000));
		let img = loadImage("https://loremflickr.com/800/800/fisheye?random=" + num);
		imgs.push(img);
	}
}

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
	background(20);
	//image(img,0,0);
	img = random(imgs);
}

function draw() {

	if (freeze) {
		counter++;
	}

	if (counter > 150) {
		background(20);
		img = random(imgs);
		i = 0;
		counter = 0;
		freeze = false;
	}

	if (freeze) {
		return;
	}

	let phi = (sqrt(5) + 1) / 2;
	let seeds = 1000;

	for (let j = 0; j < 7; j++) {
		let angle = i * 360 / phi;
		let r = sqrt(i) * scaleFactor;
		let x = width / 2 + cos(angle) * r;
		let y = height / 2 + sin(angle) * r;
		let c = img.get(x, y);
		stroke(c);
		strokeWeight(scaleFactor);
		point(x, y);
		fill(c);

		if (r > sqrt(sq(width / 3.3) + sq(height / 3.3))) {
			freeze = true;
		}
		i++;
	}
}