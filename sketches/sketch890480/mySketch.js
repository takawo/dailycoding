let imgs;

function setup() {
	const c = createCanvas(800, 800);
	angleMode(DEGREES);
	c.drop(gotFile);
	init();
}

function init() {
	imgs = [];
	redraw();
}

function draw() {
	background(100);
	fill(255);
	noStroke();
	textSize(24);
	textAlign(CENTER);
	text('Drag multiple image files onto the canvas.', width / 2, height / 2);
	noLoop();
}

function mousePressed() {
	if (imgs.length > 0) {
		drawImages(0, 0, width);
	}
}

function keyPressed() {
	if (key == "s" || key == "S") {
		save();
	}
	if (key == "r" || key == "R") {
		init();
	}
}

function gotFile(file) {
	if (file.type === 'image') {
		const img = createImg(file.data, "hogehoge", "", function() {
			imgs.push(img);
			drawImages(0, 0, width);
		}).hide();
	} else {
		console.log('Not an image file!');
	}
}

function drawImages(xx, yy, d) {
	let w = sqrt(d * d + d * d);
	images = imgs.concat();
	push();
	translate(xx, yy);
	translate(d / 2, d / 2);
	rotate(random(15) * (random(100) > 50 ? -1 : 1));
	translate(-w / 2, -w / 2);

	if (random(100) > 50) {
		let offset = d / 5;
		let x = -offset;
		let xStep = 0;
		let num = 0;
		let prevNum = -1;
		while (x < w + offset) {
			let y = -offset;
			xStep = random((1 - random(random()))) * d / 4;
			while (y < w + offset) {
				num = int(random(images.length));
				let img = images[num];
				let yStep = (img.height * xStep) / img.width;
				image(img, x, y, xStep, yStep);
				images.splice(num, 1);
				if (images.length < 1) {
					images = imgs.concat();
				}
				y += yStep;
			}
			x += xStep;
		}
	} else {
		let offset = d / 5;
		let y = -offset;
		let yStep = 0;
		let num = 0;
		let prevNum = -1;
		while (y < d + offset) {
			let x = -offset;
			yStep = random((1 - random(random()))) * d / 4;
			while (x < w + offset) {
				num = int(random(images.length));
				let img = images[num];
				let xStep = (img.width * yStep) / img.height;
				image(img, x, y, xStep, yStep);
				images.splice(num, 1);
				if (images.length < 1) {
					images = imgs.concat();
				}
				x += xStep;
			}
			y += yStep;
		}
	}
	pop();
}