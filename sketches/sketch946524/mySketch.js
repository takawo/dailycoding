let g;
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let palette;

function setup() {
	createCanvas(800, 800, WEBGL);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	palette = createPalette(url);

	// ortho(-width/2,width/2,-height/2,height/2,-2000,2000);
}

function draw() {
	perspective(map(sin(frameCount), -1, 1, 0, 179), width / height, 0.1, 5000);
	background(220);
	randomSeed(0);
	orbitControl();

	rotateX(frameCount / 3);
	rotateY(frameCount / 4);
	rotateZ(frameCount / 5);
	g = drawGraphics(width, height);
	drawBoxImage(0, 0, 0, width, 0, g);

	// imageMode(CENTER);
	// image(g,0,0);
	// frameRate(5);
}

function drawGraphics(w, h) {
	let g = createGraphics(w, h);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);
	let cells = int(random(3, 8));
	let offset = 0;
	g.width / 10;
	let margin = offset / 5;
	let d = (g.width - offset * 2 - margin * (cells - 1)) / cells;
	// g.drawingContext.shadowColor = color(0, 0, 0, 33);
	// g.drawingContext.shadowBlur = d / 5;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = offset + i * (d + margin) + d / 2;
			let y = offset + j * (d + margin) + d / 2;
			g.push();
			g.translate(x, y);
			let n = int(noise(x / 100, y / 100, frameCount / 100) * 4);
			g.rotate(n * 360 / 4);
			g.translate(-d / 2, -d / 2);
			// g.rect(0, 0, d,d);
			m = n + i + j * cells;
			for (let i = 5; i > 0; i--) {
				g.fill(palette[m % palette.length]);
				g.stroke(palette[(m+3)%palette.length]);
				// g.noStroke();
				g.arc(0, 0, d * 2 * i / 5, d * 2 * i / 5, 0, 90, PIE);
				m++;
			}
			g.pop();

		}

	}


	return g;
}

function drawBoxImage(x, y, z, d, offset, img) {
	noStroke();
	push();
	translate(x, y, z);
	push();
	translate(-d - offset, 0, 0);
	rotateY(-90);
	rotate(int(random(4)) * 360 / 4);
	texture(img);
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(d + offset, 0, 0);
	rotateY(90);
	rotate(int(random(4)) * 360 / 4);
	texture(img);
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(0, -d - offset, 0);
	rotateX(-90);
	rotate(int(random(4)) * 360 / 4);
	texture(img);
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(0, d + offset, 0);
	rotateX(90);
	rotate(int(random(4)) * 360 / 4);
	texture(img);
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(0, 0, d + offset);
	rotateZ(90);
	rotate(int(random(4)) * 360 / 4);
	texture(img);
	plane(d * 2 - offset * 2);
	pop();

	push();
	translate(0, 0, -d - offset);
	rotateZ(-90);
	rotate(int(random(4)) * 360 / 4);
	texture(img);
	plane(d * 2 - offset * 2);
	pop();
	pop();
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = color('#' + arr[i]);
	}
	return arr;
}