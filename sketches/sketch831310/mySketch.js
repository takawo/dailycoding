let ns = 800;
let url = "https://coolors.co/app/6a0136-b81365-bfab25-026c7c-444b6e";
let pallete;
let graphics;


function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);

	let percent = 30 / 100;
	let radius = sqrt(sq(width / 2) + sq(height / 2));
	graphics.fill(0, 0, 100, 7);
	graphics.noStroke();
	for (let i = 0; i < width * height * percent; i++) {
		let angle = random(360);
		let r = 1 - (random(random(1)));
		let x = width / 2 + r * radius * cos(angle);
		let y = height / 2 + r * radius * sin(angle);
		let w = random(3);
		let h = random(3);
		graphics.ellipse(x, y, w, h);
	}

	pallete = createPallete(url);

}

function draw() {
	let w = sqrt(sq(width) + sq(height));
	//randomSeed(500 + frameCount);
	push();
	translate(width / 2, height / 2);
	rotate(45);
	separateGrid(-w / 2, -w / 2, w);
	pop();
	image(graphics, 0, 0);

	//save("img-" + frameCount + ".png");
	noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			let n = noise(i / ns, j / ns, frameCount / ns);
			if (n > 0.25 && d > width / 10) {
				separateGrid(i, j, w);
			} else {
				drawArcByDottedLine(i, j, w, pallete.concat());
				//rect(i, j, w, w);
			}
		}
	}
}

function drawArcByDottedLine(x, y, d, colors) {
	push();
	translate(x + d / 2, y + d / 2);
	rotate(int(random(4)) * 360 / 4);
	noStroke();
	fill(random(colors));
	arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90, PIE);
	push();
	translate(-d / 2, -d / 2);
	let sep = int(random(3, 15));
	strokeWeight(1);
	for (let r = d; r > 0; r -= d / sep) {
		let angleStep = map(d * d, 1, sq(width / 2), 15, 5);
		stroke(random(colors));
		angleStep /= random(1, 3);
		//arc(0,0,r,r,0,90);
		let n = int(random(2));
		for (let angle = 0; angle < 90; angle += angleStep) {
			beginShape();
			let a = angle;
			let e = min(angle + angleStep, 90);
			if (n % 2 == 0) {
				while (a < e) {
					vertex(cos(a) * r, sin(a) * r);
					a += 1;
				}
			}
			n++;
			endShape();
		}
	}
	pop();
	pop();
}


function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');

	for (let i = 0; i < arr.length; i++) {
		let red = unhex(arr[i].substr(0, 2));
		let green = unhex(arr[i].substr(2, 2));
		let blue = unhex(arr[i].substr(4, 2));
		colorMode(RGB, 255, 255, 255);
		let c = color(red, green, blue);
		let h = hue(c);
		let s = saturation(c);
		let b = brightness(c);
		let t = 100 * 3 / 4;
		colorMode(HSB, 360, 100, 100, 100);
		c = color(h, s, b, t);
		arr[i] = c;
	}
	return arr;
}