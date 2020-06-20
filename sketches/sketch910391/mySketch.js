let x;
let y;
let a;
let w;
let h;
let counter = 0;
let xTarget;
let yTarget;
let aTarget;
let wTarget;
let hTarget;

let offset;

let img;

function preload() {
	img = loadImage("https://loremflickr.com/800/800/?lock=" + counter);
	counter++;
}


function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);

	offset = 0;

	x = random(offset, width - offset);
	y = random(offset, height - offset);
	a = random(360);
	w = random(width / 2);
	h = random(width / 2);

	xTarget = random(offset, width - offset);
	yTarget = random(offset, height - offset);
	aTarget = random(360);
	wTarget = random(width / 2);
	hTarget = random(width / 2);

}

function draw() {
	let deltaTime = 1.0 / 60.0;
	let k = 10.0;
	x = lerp(xTarget, x, exp(-k * deltaTime));
	y = lerp(yTarget, y, exp(-k * deltaTime));
	a = lerp(aTarget, a, exp(-k * deltaTime));
	w = lerp(wTarget, w, exp(-k * deltaTime));
	h = lerp(hTarget, h, exp(-k * deltaTime));

	if (dist(x, y, xTarget, yTarget) < 1) {
		xTarget = random(offset, width - offset);
		yTarget = random(offset, height - offset);
		aTarget = random(360);
		wTarget = random(width / 2);
		hTarget = random(width / 2);
	}

	let img_trim = img.get(x, y, max(w, 1), max(h, 1));
	push();
	translate(x, y);
	// rotate(a);
	drawingContext.shadowColor = color(0, 0, 0, 20);
	drawingContext.shadowBlur = min(w, h) / 10;
	// rectMode(CENTER);
	noStroke();
	imageMode(CENTER);
	image(img_trim, 0, 0);
	// rect(0, 0, w, h);
	pop();
	if (frameCount % 800 == 0) {
		let img2 = loadImage("https://loremflickr.com/800/800/?lock=" + counter, function() {
			counter++;
			img = img2.get();
		});

	}
}

function mousePressed() {
	xTarget = mouseX;
	yTarget = mouseY;
}

function mouseDragged() {
	xTarget = mouseX;
	yTarget = mouseY;
}