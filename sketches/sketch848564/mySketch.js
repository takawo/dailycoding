let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	noStroke();
	
	graphics = createGraphics(width,height);
  let w = sqrt(sq(width) + sq(height));
  for (let i = 0; i < width * height * 15 / 100; i++) {
    //半透明の点，白でも黒でもOK．透明度は適宜調整する
    graphics.stroke(0, 0, 0, 50);
    let angle = random() * 360;
    let r = (sqrt(1 - random(random()))) * w / 2;
    let px = width / 2 + cos(angle) * r;
    let py = height / 2 + sin(angle) * r;
    graphics.point(px, py);
  }
}

function draw() {
	background(220);
	randomSeed(100);
	push();
	translate(width / 2, height / 2);
	let w = sqrt(width * width + height * height);
	//rotate(45);
	recursiveRect(-w / 2, -w / 2, w, w, 4);
	pop();
	image(graphics,0,0);
}

function recursiveRect(x, y, w, h, depth) {
	if (depth < 0) return;
	//rect(x, y, w, h);

	let rsx = random(1000);
	let rsy = random(1000);

	let nw = noise(x / 1000 + rsx, frameCount / 50) * w;
	let nh = noise(y / 1000 + rsy, frameCount / 50) * h;

	if (random(100) > 25) {
		checkRects(x, y, nw, nh);
		checkRects(x + nw, y, w - nw, nh);
		checkRects(x, y + nh, nw, h - nh);
		checkRects(x + nw, y + nh, w - nw, h - nh);
	} else {
		random(100) > 50 ? fill(0, 0, 0) :
			fill(0, 0, 100);
		rect(x, y, w, h);
	}
	recursiveRect(x, y, nw, nh, depth - 1);
	recursiveRect(x + nw, y, w - nw, nh, depth - 1);
	recursiveRect(x, y + nh, nw, h - nh, depth - 1);
	recursiveRect(x + nw, y + nh, w - nw, h - nh, depth - 1);
}

function checkRects(x, y, w, h) {
	let sep = int(random(2, 4));
	push();
	translate(x, y);
	let n = int(random(2));
	if (sep == 2) n = 1;
	for (let j = 0; j < sep; j++) {
		for (let i = 0; i < sep; i++) {
			let xx = i * w / sep;
			let yy = j * h / sep;
			if (sep == 3) {
				if (n % 2 == 0) {
					fill(0, 0, 10);
				} else {
					fill(0, 0, 100);
				}
			} else {
				switch (n) {
					case 1:
					case 4:
						fill(0, 0, 100);
						break;
					case 2:
					case 3:
						fill(0, 0, 10);
						break;
				}
			}
			rect(xx, yy, w / sep, h / sep);
			n++;
		}
	}
	pop();
}