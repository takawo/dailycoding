//reference: @ntsutae's awesome sketch(#つぶやきProcessing). //https://twitter.com/ntsutae/status/1225008609756508160

let count = 0;
let w;
let capture;
let angle = 0;
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	pixelDensity(1);
	//capture.hide();
	angleMode(DEGREES);
	w = sqrt(width * width + height * height);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB,360,100,100,100);
	graphics.fill(0,0,0,5);
	graphics.noStroke();
	for(let i = 0; i < width * height * 10/100; i++){
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		graphics.ellipse(x,y,w,h);
	}
}

function draw() {
	push();
	translate(width / 2, height / 2);
	rotate(angle);
	separateGrid(-w / 2, -w / 2, w, w, 8);
	pop();
	angle += 0.5;
	count += 0.05;
	image(graphics,0,0);
}

function separateGrid(x, y, w, h, depth) {
	if (depth > 0) {
		let n = noise(x / 200, y / 100, frameCount / 300);
		strokeWeight(min(w, h) / 20);
		strokeWeight(1);
		fill(0, 0, 100);
		stroke(0, 0, 0);
		rect(x, y, w, h, min(w, h) / 3);
		if (n > 0.6 && n > 0.7) {
			push();
			translate(x + w / 2, y + h / 2);
			strokeWeight(min(w, h) / 10);
			//rotate(-45);
			line(-w / 6, 0, w / 6, 0);
			pop();
		} else {
			fill(0, 0, 30);
			strokeWeight(min(w, h) / 20);
			let d = min(w, h);
			ellipse(x + w / 2, y + h / 2, d * 0.8);
			fill(0, 0, 10);
			stroke(0, 0, 80);
			ellipse(x + w / 2, y + h / 2, d * 0.5);
			fill(0, 0, 100);
			noStroke();
			ellipse(x + w / 2 + cos(-45 - angle) * d / 5, y + h / 2 + sin(-45 - angle) * d / 5, d / 4);

		}
		if (depth % 2 == 1) {
			separateGrid(x, y, w * n, h, depth - 1);
			separateGrid(x + w * n, y, w - w * n, h, depth - 1);
		} else {
			separateGrid(x, y, w, h * n, depth - 1);
			separateGrid(x, y + h * n, w, h - h * n, depth - 1);
		}
	}
}