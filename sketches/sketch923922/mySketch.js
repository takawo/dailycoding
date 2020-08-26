let url = "https://coolors.co/b1f8f2-bcd39c-fffc99-eafdcf-8e8358";
let palette = createPalette(url);

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	noStroke();

}

function draw() {
	background(0, 0, 90);

	let w = sqrt(width * width + height * height);
	let cells = int(random(4, 15));
	let offset = width / 10;
	let margin = 0; //offset / 5;

	let d = (w + offset * 2 - margin * (cells - 1)) / cells;

	push();
	translate(width / 2, height / 2);
	rotate(45);
	translate(-w / 2 - offset, -w / 2 - offset);
	let n = 0;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let cx = i * (d + margin) + d / 2;
			let cy = j * (d + margin) + d / 2;
			let colors = shuffle(palette.concat());

			push();
			translate(cx, cy);
			rotate(int(random(4)) * 360 / 4);
			translate(-d / 2, -d / 2);
			let step = random([2, 4, 8, 12]);
			drawingContext.shadowColor = color(0, 0, 0, 10 / (step / 8));
			drawingContext.shadowBlur = d / 4;

			for (let y = 0; y < d; y += d / step) {
				fill(colors[n % colors.length]);
				rect(0, y, d, d / step);
				n++;
				if (n % colors.length == 0) shuffle(colors);
			}
			push();

			for (let dd = d; dd > 0; dd -= d / step) {
				fill(colors[n % colors.length]);
				arc(0, 0, dd * 2, dd * 2, 0, 90);
				n++;
				if (n % colors.length == 0) shuffle(colors);
			}
			pop();
			pop();

		}
	}


	pop();
	noLoop();
}


function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}