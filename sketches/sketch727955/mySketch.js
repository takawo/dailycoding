let dcgan;

function preload() {
	dcgan = ml5.DCGAN('manifest.json');
}

function setup() {
	createCanvas(400, 400);
	frameRate(1);
}

function draw() {
	dcgan.generate(displayImage);
}

function displayImage(err, result) {
	if (err) {
		console.log(err);
		return;
	}
	image(result.image, 0, 0, width, height);
}