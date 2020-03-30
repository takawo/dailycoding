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
	text('Drag square image files onto the canvas.', width / 2, height / 2);
	noLoop();
}

function mousePressed() {
	if (imgs.length > 0) {
		separateGrid(0, 0, width);
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
			separateGrid(0, 0, width);
		}).hide();
	} else {
		console.log('Not an image file!');
	}
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 15) {
				separateGrid(i, j, w);
			} else {
				push();
				translate(i + w / 2, j + w / 2);
				rotate(int(random(4)) * 360 / 4);
				imageMode(CENTER);
				image(random(imgs), 0, 0, w, w);
				pop();
			}
		}
	}
}