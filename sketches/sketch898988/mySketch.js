//reference:Haley Lawrence's awesome portrait
//https://unsplash.com/photos/6ugQ978v-zg

let img;
let count = 2000;

function preload() {
	img = loadImage("haley-lawrence-6ugQ978v-zg-unsplash (1).jpg");
}

function setup() {
	createCanvas(int(img.width), int(img.height));
	angleMode(DEGREES);
}

function draw() {
	// background(img);
	for (let i = 0; i < count; i++) {

		let src_width = random(img.width / 50, img.width / 3);
		let src_height = random(img.height / 50, img.height / 3);

		let src_x = random(0, img.width - src_width);
		let src_y = random(0, img.height - src_height);

		let step = random(img.width / 100, img.width / 20);

		let dist_x = src_x + random(-step, step);
		let dist_y = src_y + random(-step, step);

		// if (random(100) > 50) {
		//   dist_x = src_x;
		// } else {
		//   dist_y = src_y;
		// }
		let dist_scale = random(0.5, 1.33);
		let dist_width = src_width * dist_scale;
		let dist_height = src_height * dist_scale;

		drawingContext.shadowColor = color(255, 25 / 100 * 255);
		drawingContext.shadowBlur = max(dist_width, dist_height) / 2;

		// copy(img,src_x, src_y, src_width, src_height,
		//   dist_x, dist_y, dist_width, dist_height);

		let img_trim = img.get(src_x, src_y, src_width, src_height);

		push();
		translate(dist_x + dist_width / 2, dist_y + dist_height / 2);
		rotate(random(20) * (random(100) > 50 ? -1 : 1));
		shearX(random(90) / 4 * (random(100) > 50 ? -1 : 1));
		shearY(random(90) / 4 * (random(100) > 50 ? -1 : 1));
		imageMode(CENTER);
		image(img_trim, 0, 0, dist_width, dist_height);
		pop();

	}
	noLoop();
}