let w = 600;
let h = 600;
let n = 0;
const yolo = ml5.YOLO(modelReady);
let img;
let objects = [];
let status;

function setup() {
	createCanvas(600, 600);
	colorMode(HSB, 360, 100, 100, 100);
	init();
}

function init() {
	let randomNum = int(random(10000));
	let url = "https://loremflickr.com/" + w + "/" + h + "?random=" + randomNum;
	img = createImg(url, imageReady);
	img.hide();
	img.size(w, h);
}

function draw() {
	background(220);

	if (status != undefined) {
		image(img, 0, 0);
		for (let obj of objects) {
			fill(0, 100, 100);
			noStroke();

			text(obj.label + " " + nfc(obj.confidence * 100.0, 2) + "%", obj.x * width + 5, obj.y * height + 15);

			noFill();
			stroke(0, 100, 100);
			strokeWeight(5);
			rect(obj.x * width, obj.y * height,
				obj.w * width, obj.h * height);
		}
	}
}

function modelReady() {
	// console.log('Model Ready');
	status = true;
}

function imageReady() {
	//console.log('Detecting');
	yolo.detect(img, gotResult);
}

function gotResult(err, results) {
	if (err) {
		console.log(err);
	}
	// console.log(results);
	objects = results;
}