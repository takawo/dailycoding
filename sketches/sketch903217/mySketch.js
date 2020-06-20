let offset;

function setup() {
	let c = createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	offset = width / 8;
	c.drop(gotFile);
}

function draw() {
	background(0, 0, 95);
	fill(0, 0, 10);
	noStroke();
	textSize(60);
	textStyle(BOLD);
	textAlign(CENTER, CENTER);
	text('Drag and drop\nsingle image file\nyou want to frame\nonto this canvas.', width / 2, height / 2);
	noLoop();
}

function gotFile(file) {
	if (file.type != "image") {
		print("This does not seem to be an image file...");
		return;
	} else {
		let img = loadImage(file.data, function() {
			resizeImage(img, offset);
		});
	}
}

function resizeImage(img) {
	let w = img.width;
	let h = img.height;
	let tw, th;
	if (w > h) {
		tw = width - offset * 2;
		th = tw * h / w;
	} else if (w < h) {
		th = height - offset * 2;
		tw = th * w / h;
	} else if (w == h) {
		tw = min(width, height) - offset * 2;
		th = tw;
	}
	background(0, 0, 95);
	push();
	translate(width / 2, height / 2);
	rotate(random(10) * (random(100) > 50 ? -1 : 1));
	push();
	drawingContext.shadowColor = color(0, 0, 0, 50);
	drawingContext.shadowBlur = min(tw, th) / 8;
	drawingContext.shadowOffsetX = min(tw, th) / 8 / 2;
	drawingContext.shadowOffsetY = min(tw, th) / 8 / 2;

	rectMode(CENTER);
	fill(0, 0, 100);
	let d = min(tw, th) / 15;
	rect(0, 0, tw + d, th + d);
	pop();

	imageMode(CENTER);
	image(img, 0, 0, tw, th);
	pop();
}