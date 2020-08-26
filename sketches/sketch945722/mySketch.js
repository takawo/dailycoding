let imgs;
let g;

function setup() {
	const c = createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	pixelDensity(1);

	g = createGraphics(width, height, WEBGL);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);
	g.ortho(-width / 2, width / 2, height / 2, -height / 2, -1600, 1600)
	c.drop(gotFile);
	init();
}

function init() {
	imgs = [];
	redraw();
}

function draw() {
	background(0, 0, 20);
	fill(0, 0, 100);
	noStroke();
	textSize(50);
	textStyle(BOLD);
	textAlign(CENTER);
	text('Drag multiple \nimage files\n onto the canvas.'.toUpperCase(), width / 2, height / 2 - 36);
	noLoop();
}

function mousePressed() {
	if (imgs.length > 0) {
		drawImages();
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
			let g2 = createGraphics(img.width, img.height);
			g2.image(img, 0, 0);
			background(0, 0, 90);
			imgs.push(g2);
			drawImages();
		}).hide();
	} else {
		console.log('Not an image file!');
	}
}

function drawImages() {
	let d = width * 0.5;
	background(0, 0, 10);
	g.clear();
	g.rotateX(int(random(8)) * 360 / 8);
	g.rotateY(int(random(8)) * 360 / 8);
	g.rotateZ(int(random(8)) * 360 / 8);
	g.push();
	g.translate(-d / 2, -d / 2, -d / 2);
	separateGrid(0, 0, 0, d);
	g.pop();
	image(g, 0, 0);


}

function separateGrid(x, y, z, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			for (let k = z; k < z + d - 1; k += w) {
				if (random(100) < 90 && d > width / 3) {
					separateGrid(i, j, k, w);
				} else {
					drawBoxImage(i + w / 2, j + w / 2, k + w / 2, w / 2, 0, imgs);
				}
			}
		}
	}
}

function drawBoxImage(x, y, z, d, offset, imgs) {
	g.noStroke();

	g.push();
	g.translate(x, y, z);
	g.push();
	g.translate(-d - offset, 0, 0);
	g.rotateY(-90);
	g.rotate(int(random(4)) * 360 / 4);
	g.texture(random(imgs));
	g.plane(d * 2 - offset * 2);
	g.pop();

	g.push();
	g.translate(d + offset, 0, 0);
	g.rotateY(90);
	g.rotate(int(random(4)) * 360 / 4);
	g.texture(random(imgs));
	g.plane(d * 2 - offset * 2);
	g.pop();

	g.push();
	g.translate(0, -d - offset, 0);
	g.rotateX(-90);
	g.rotate(int(random(4)) * 360 / 4);
	g.texture(random(imgs));
	g.plane(d * 2 - offset * 2);
	g.pop();

	g.push();
	g.translate(0, d + offset, 0);
	g.rotateX(90);
	g.rotate(int(random(4)) * 360 / 4);
	g.texture(random(imgs));
	g.plane(d * 2 - offset * 2);
	g.pop();

	g.push();
	g.translate(0, 0, d + offset);
	g.rotateZ(90);
	g.rotate(int(random(4)) * 360 / 4);
	g.texture(random(imgs));
	g.plane(d * 2 - offset * 2);
	g.pop();

	g.push();
	g.translate(0, 0, -d - offset);
	g.rotateZ(-90);
	g.rotate(int(random(4)) * 360 / 4);
	g.texture(random(imgs));
	g.plane(d * 2 - offset * 2);
	g.pop();

	g.pop();
}