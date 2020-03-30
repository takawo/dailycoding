let pallet;
let url = ["https://coolors.co/app/fe938c-e6b89c-ead2ac-9cafb7-4281a4",
	"https://coolors.co/app/7bdff2-b2f7ef-eff7f6-f7d6e0-f2b5d4",
	"https://coolors.co/9c89b8-f0a6ca-efc3e6-f0e6ef-b8bedd",
	"https://coolors.co/app/ffcdb2-ffb4a2-e5989b-b5838d-6d6875",
	"https://coolors.co/app/f2d7ee-d3bcc0-a5668b-69306d-0e103d"
];
let w;
let textureGraphics;

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
	
	w = sqrt(width * width + height * height);
	textureGraphics = createGraphics(w, w);
	textureGraphics.colorMode(HSB, 360, 100, 100, 100);
	textureGraphics.noStroke();
	textureGraphics.fill(0, 0, 100, 10);

	for (let i = 0; i < width * height * 10 / 100; i++) {
		let x = random(w);
		let y = random(w);
		let ww = random(3);
		let h = random(3);
		textureGraphics.ellipse(x, y, ww, h);
	}
}

function draw() {
	background(240);
	randomSeed(0);
	push();
	translate(width / 2, height / 2);
	rotate(45 + frameCount / 3);
	separateGrid(-w / 2, -w / 2, w, w, 9);
	image(textureGraphics, -w/2, -w/2);	
	pop();
}

function separateGrid(x, y, w, h, depth) {
	let direction = random(100) > 50 ? -1 : 1;
	if (depth > 0) {
		let n = map(sin(w * h / 5999800 + frameCount * direction), -1, 1, 0, 1);
		push();
		translate(x + w / 2, y + h / 2);
		//rotate(int(random(4)) * 360 / 4);
		rectMode(CENTER);
		//rect(0, 0, w, h);
		let points = [];
		points.push(createVector(-w / 2, -h / 2));
		points.push(createVector(w / 2, -h / 2));
		points.push(createVector(w / 2, h / 2));
		points.push(createVector(-w / 2, h / 2));
		drawSeparatedRect(points);
		pop();
		if (depth % 2 == 1) {
			separateGrid(x, y, w * n, h, depth - 1);
			separateGrid(x + w * n, y, w - w * n, h, depth - 1);
		} else {
			separateGrid(x, y, w, h * n, depth - 1);
			separateGrid(x, y + h * n, w, h - h * n, depth - 1);
		}
	}
}

function drawSeparatedRect(_points) {
	pallete = createPallete(random(url));

	let n = int(random(_points.length / 2));
	let m = int(n + _points.length / 2);
	let min_margin = 0.1;
	// let n_f = random(min_margin, 1 - min_margin);
	// let m_f = random(min_margin, 1 - min_margin);
	let n_f = map(sin(frameCount + n * 10), -1, 1, 0, 1);
	let m_f = map(cos(frameCount + m * 10), -1, 1, 0, 1);
	let n_next = (n + 1) % _points.length;
	let m_next = (m + 1) % _points.length;
	let p3 = p5.Vector.lerp(_points[n], _points[n_next], n_f);
	let p4 = p5.Vector.lerp(_points[m], _points[m_next], m_f);
	let c1 = random(pallete);
	let c2 = c1;
	while (c1 == c2) {
		c2 = random(pallete);
	}
	fill(c1);
	//fill(0,0,100);
	noStroke();
	quad(p3.x, p3.y, p4.x, p4.y, _points[m_next].x, _points[m_next].y, _points[n].x, _points[n].y);
	fill(c2);
	quad(p4.x, p4.y, p3.x, p3.y, _points[n_next].x, _points[n_next].y, _points[m].x, _points[m].y);
}


function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}