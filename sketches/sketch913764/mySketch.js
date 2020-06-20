let bodypix;
let video;
let segmentation;
let img;
let pg;
let pg2;
let scl = 8;
let offset = 20;

function preload() {
	bodypix = ml5.bodyPix(options);
}

function setup() {
	createCanvas(640, 480);

	pg = createGraphics(width, height);
	pg2 = createGraphics(width, height);
	video = createCapture({
		video: {
			mandatory: {
				minWidth: 640,
				minHeight: 480
			},
			optional: [{
				maxFrameRate: 30
			}]
		},
		audio: false
	});
	video.size(width / scl, height / scl);
	video.hide();

	bodypix.segmentWithParts(video, gotResults, options)
}


function gotResults(err, result) {
	copy(0, 0, width, height, -offset, -offset, width + offset * 2, height + offset * 2);
	if (err) {
		console.log(err)
		return
	}
	segmentation = result;
	pg.clear();
	pg2.clear();
	let img = segmentation.partMask;
	img.resize(width, height);
	pg2.image(video, 0, 0, width, height);
	pg.image(img, 0, 0);
	pg.filter(INVERT);
	// image(pg2, 0, 0);
	let img2 = pgMask(pg2, pg);
	image(img2, 0, 0);
	bodypix.segmentWithParts(video, gotResults, options)
}

function pgMask(_content, _mask) {
	//Create the mask as image
	var img = createImage(int(_mask.width), int(_mask.height));
	img.copy(_mask, 0, 0, int(_mask.width), int(_mask.height), 0, 0, int(_mask.width), int(_mask.height));
	//load pixels
	img.loadPixels();
	for (var i = 0; i < img.pixels.length; i += 4) {
		var v = img.pixels[i];
		img.pixels[i + 3] = v;
	}
	img.updatePixels();
	//convert _content from pg to image
	var contentImg = createImage(int(_content.width), int(_content.height));
	contentImg.copy(_content, 0, 0, int(_content.width), int(_content.height), 0, 0, int(_content.width), int(_content.height));
	// create the mask
	contentImg.mask(img)
	// return the masked image
	return contentImg;
}

const options = {
	multiplier: 0.25, // 1.0, 0.75, or 0.50, 0.25
	outputStride: 8, // 8, 16, or 32, default is 16
	segmentationThreshold: 0.5, // 0 - 1, defaults to 0.5
	palette: {
		leftFace: {
			id: 0,
			color: [0, 0, 0],
		},
		rightFace: {
			id: 1,
			color: [0, 0, 0],
		},
		rightUpperLegFront: {
			id: 2,
			color: [255, 255, 255],
		},
		rightLowerLegBack: {
			id: 3,
			color: [255, 255, 255],
		},
		rightUpperLegBack: {
			id: 4,
			color: [255, 255, 255],
		},
		leftLowerLegFront: {
			id: 5,
			color: [255, 255, 255],
		},
		leftUpperLegFront: {
			id: 6,
			color: [255, 255, 255],
		},
		leftUpperLegBack: {
			id: 7,
			color: [255, 255, 255],
		},
		leftLowerLegBack: {
			id: 8,
			color: [255, 255, 255],
		},
		rightFeet: {
			id: 9,
			color: [255, 255, 255],
		},
		rightLowerLegFront: {
			id: 10,
			color: [255, 255, 255],
		},
		leftFeet: {
			id: 11,
			color: [255, 255, 255],
		},
		torsoFront: {
			id: 12,
			color: [255, 255, 255],
		},
		torsoBack: {
			id: 13,
			color: [255, 255, 255],
		},
		rightUpperArmFront: {
			id: 14,
			color: [255, 255, 255],
		},
		rightUpperArmBack: {
			id: 15,
			color: [255, 255, 255],
		},
		rightLowerArmBack: {
			id: 16,
			color: [255, 255, 255],
		},
		leftLowerArmFront: {
			id: 17,
			color: [255, 255, 255],
		},
		leftUpperArmFront: {
			id: 18,
			color: [255, 255, 255],
		},
		leftUpperArmBack: {
			id: 19,
			color: [255, 255, 255],
		},
		leftLowerArmBack: {
			id: 20,
			color: [255, 255, 255],
		},
		rightHand: {
			id: 21,
			color: [255, 255, 255],
		},
		rightLowerArmFront: {
			id: 22,
			color: [255, 255, 255],
		},
		leftHand: {
			id: 23,
			color: [255, 255, 255],
		},
	},
}