//reference : Scorpio Creative @scorpiocreative
//https://unsplash.com/photos/XtK8JrIyALI

let img;

function preload() {
	img = loadImage("scorpio-creative-XtK8JrIyALI-unsplash.jpg");
}


function setup() {
	createCanvas(img.width, img.height);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	background(img);
}

function draw() {
	randomSeed(frameCount / 180);
	push();
	translate(width / 2, height / 2);
	let cells = 8;
	let offset = width / 10;
	let margin = 0;
	let w = (width + offset * 2 - margin * (cells - 1)) / cells;
	let h = (height + offset * 2 - margin * (cells - 1)) / cells;

	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = -width / 2 - offset + i * (w + margin) + w / 2;
			let y = -height / 2 - offset + j * (h + margin) + h / 2;

			let ix = width / cells * i;
			let iy = height / cells * j;
			let img_trim = img.get(ix, iy, w, h);
			push();
			translate(x, y);
			let direction = (random(100) > 50) ? -1 : 1;
			shearX(((i + j * cells) * 1.5 + frameCount * direction) % 90 + int(random(2)) * 180 + 90);
			// rectMode(CENTER);
			// rect(0, 0, d, d);
			imageMode(CENTER);
			drawingContext.shadowColor = color(0, 33);
			drawingContext.shadowBlur = max(w, h) / 15;
			image(img_trim, 0, 0, w, h);
			pop();

		}
	}




	pop();
}