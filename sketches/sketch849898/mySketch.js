let textureGraphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	textureGraphics = createGraphics(width, height);
	textureGraphics.colorMode(HSB, 360, 100, 100, 100);
	textureGraphics.angleMode(DEGREES);

	let percent = 10 / 100;
	for (let i = 0; i < width * height * percent; i++) {
		let x = random(width);
		let y = random(height);
		let dw = random(3);
		let dh = random(3);
		textureGraphics.fill(0, 0, 0, 5);
		textureGraphics.noStroke();
		textureGraphics.ellipse(x, y, dw, dh);
	}
}

function draw() {
	background(0, 0, 95);
	let offset = width / 20;
	//let m = map(sin(frameCount),-1,1,15,100);
	noFill();
	divideRect(offset, offset, width - offset * 2, height - offset * 2, 60);
	image(textureGraphics, 0, 0);
	//noLoop();
}

function divideRect(x, y, w, h, m) {
	let p = 0.01;
	let n = map(noise((x + w / 2) / 500, (y + h / 2) / 500, frameCount / 100), 0, 1, p, 1 - p);
	if (w > m && h > m) {
		if (w >= h) {
			let nw = n * w;
			divideRect(x, y, nw, h, m);
			divideRect(x + nw, y, w - nw, h, m);
		}
		if (w < h) {
			let nh = n * h;
			divideRect(x, y, w, nh, m);
			divideRect(x, y + nh, w, h - nh, m);
		}
	} else {
		//noStroke();
		// circle(x + w / 2, y + h / 2, min(w, h));
		drawWave(x, y, w, h);
	}
}

function drawWave(x, y, w, h) {
	let cx = x + w / 2;
	let cy = y + h / 2;
	push();
	translate(cx, cy);
	let rotate_num = int(random(4)) * 360 / 4;
	//rotate(rotate_num);
	let ww, hh;
	if (h > w) {
		rotate(90);
		ww = h * 0.9;
		hh = w * 0.9;
	} else {
		ww = w * 0.9;
		hh = h * 0.9;
	}

	push();
	translate(-ww / 2, 0);
	beginShape();
	let freq = int((width + height + x + y + w + h) / 200) % 3 + 1;
	for (let xx = 0; xx < ww; xx += 1) {
		let angle = map(xx, 0, ww, 0, 180 * freq * 3);
		let yy = sin(x + y + w + h + angle + frameCount * freq * 10) * hh / 3;
		vertex(xx, yy);
	}
	endShape();
	pop();
	pop();
}