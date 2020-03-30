let video;
let uNet;
let segmentationImage;

function preload() {
	uNet = ml5.uNet('face');
}

function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	video.size(width, height);
	video.hide();
	
	segmentationImage = createImage(width, height);
	uNet.segment(video, gotResult);
}

function draw() {
	image(segmentationImage, 0, 0, width, height);
}

function gotResult(error, result) {
	if (error) {
		console.error(error);
		return;
	}
	segmentationImage = result.image;
	uNet.segment(video, gotResult);
}