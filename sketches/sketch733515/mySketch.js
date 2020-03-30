let url = "https://coolors.co/app/ffffff-84dcc6-a5ffd6-ffa69e-ff686b";
let pallete;
let triangleNum = 30;
let rs;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	pallete = createPallete(url);
	rs = random(10000);
}

function draw() {
	background(0, 0, 90);

	let w = width / 2;
	let h = height / 2;
	let j = 0;
	randomSeed(rs);

	for (let i = 0; i < triangleNum; i++) {
		let fc = frameCount / 100;
		let l = map(i, 0, triangleNum, 0, pallete.length);
		l += random(pallete.length);
		let current = int(l + fc) % pallete.length;
		let next = ceil(l + fc) % pallete.length;
		let fl = (fc + l) % 1;

		let c1 = color(pallete[current]);
		let c2 = color(pallete[next]);

		colorMode(RGB);
		let c = lerpColor(c1, c2, fl);
		fill(c);
		noStroke();
		push();
		translate(width / 2, height / 2);
		scale(tan(frameCount / 10));
		beginShape();
		vertex(-w, -h);
		vertex(w, -h);
		vertex(w, h);
		vertex(-w, h);
		beginContour();
		let n = 3;
		let f = frameCount;
		for (let angle = 0; angle > -360; angle -= 360 / n) {
			let m = map(sin(frameCount + angle + i * triangleNum), -1, 1, .25, -.25);
			let direction = 1;
			let angle2 = angle + f;
			if (j % 2 == 0) {
				direction = -1;
			}
			let x = cos(angle2 + (f / 25 + i) * m * direction) * w * 0.025;
			let y = sin(angle2 + (f / 25 + i) * m * direction) * w * 0.025;
			vertex(x, y);
		}
		endContour();
		endShape(CLOSE);
		w *= 1.15;
		h *= 1.15;
		j++;
		pop();
	}
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