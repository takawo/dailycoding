let buttonRock;
let buttonPaper;
let buttonScissor;
let buttonEmpty;

let buttonClassify;
let offsetX = 30;
let offsetY = 50;
let patternCount = [0, 0, 0, 0];
let patternProbability = [, , , ];
let isClassify = false;
let rps = ['✊', '✌', '✋', '　'];
let video;
const knnClassifier = ml5.KNNClassifier();
let featureExtractor;

function setup() {
	createCanvas(640, 480);
	colorMode(HSB, 360, 100, 100, 100);
	video = createCapture(VIDEO);
	video.size(width, height);
	video.hide();

	featureExtractor = ml5.featureExtractor('MobileNet');
	setupButtons();
}

function setupButtons() {
	buttonRock = createButton('✊');
	buttonRock.position(offsetX, offsetY);
	buttonRock.style('font-size', '20px');

	buttonPaper = createButton('✌');
	buttonPaper.position(offsetX, offsetY + 35);
	buttonPaper.style('font-size', '20px');

	buttonScissor = createButton('✋');
	buttonScissor.position(offsetX, offsetY + 70);
	buttonScissor.style('font-size', '20px');

	buttonEmpty = createButton('?');
	buttonEmpty.position(offsetX, offsetY + 105);
	buttonEmpty.style('font-size', '20px');

	buttonRock.mousePressed(function() {
		addExample('Rock');
	});

	buttonPaper.mousePressed(function() {
		addExample('Paper');
	});

	buttonScissor.mousePressed(function() {
		addExample('Scissor');
	});

	buttonEmpty.mousePressed(function() {
		addExample('Empty');
	});

	buttonClassify = createButton("2. Classify");
	buttonClassify.style('font-size', '20px');
	buttonClassify.position(width - buttonClassify.width - offsetX * 2, height - buttonClassify.height - 15);
	buttonClassify.mousePressed(function() {
		classify();
	});
}

function keyPressed() {
	if (key == 'd' || key == 'D') {
		clearAllLabels();
	}
	if (key == '1') {
		addExample('Rock');
	}
	if (key == '2') {
		addExample('Paper');
	}
	if (key == '3') {
		addExample('Scissor');
	}
	if (key == '4') {
		addExample('Empty');
	}
}

function addExample(label) {
	const features = featureExtractor.infer(video);
	knnClassifier.addExample(features, label);
	updateCounts();
}

function classify() {
	const numLabels = knnClassifier.getNumLabels();
	if (numLabels <= 0) {
		console.error('There is no examples in any label');
		return;
	}
	const features = featureExtractor.infer(video);
	knnClassifier.classify(features, gotResults);
	isClassify = true;
}

function draw() {
	image(video, 0, 0, width, height);
	drawText();

	let m = 0;
	let p = 0;
	let i = 0;

	for (let n of patternProbability) {
		if (n > m) {
			p = i;
			m = n;
		}
		i++;
	}
	if (isClassify) {
		textAlign(CENTER, CENTER);
		textSize(250);
		text(rps[p], width / 2, height / 2);
	}
}

function gotResults(err, result) {
	if (err) {
		console.error(err);
	}

	if (result.confidencesByLabel) {
		const confidences = result.confidencesByLabel;
		patternProbability[0] = confidences['Rock'] ? ceil(confidences['Rock'] * 100) : 0;
		patternProbability[1] = confidences['Paper'] ? ceil(confidences['Paper'] * 100) : 0;
		patternProbability[2] = confidences['Scissor'] ? ceil(confidences['Scissor'] * 100) : 0;
		patternProbability[3] = confidences['Empty'] ? ceil(confidences['Empty'] * 100) : 0;
	}

	classify();
}

function drawText() {
	textSize(18);
	textAlign(LEFT, CENTER);
	stroke(0, 0, 100);
	strokeWeight(3);
	fill(0, 0, 20);
	let str;
	text("1. Resister Hand Pattern ✊/✌/✋/? (key:1-4)", offsetX, offsetY - 15);
	for (let i = 0; i < patternCount.length; i++) {
		let str = patternCount[i] + " Images";
		if (patternProbability[i] != undefined) {
			str += " / " + patternProbability[i] + "%";
		}
		text(str, offsetX + 50, offsetY + 20 + i * 33);
	}

}


function updateCounts() {
	const counts = knnClassifier.getCountByLabel();
	if (counts['Rock'] != undefined) {
		patternCount[0] = counts['Rock'];
	} else {
		patternCount[0] = 0;
	}
	if (counts['Paper'] != undefined) {
		patternCount[1] = counts['Paper'];
	} else {
		patternCount[1] = 0;
	}
	if (counts['Scissor'] != undefined) {
		patternCount[2] = counts['Scissor'];
	} else {
		patternCount[2] = 0;
	}
	if (counts['Empty'] != undefined) {
		patternCount[3] = counts['Empty'];
	} else {
		patternCount[3] = 0;
	}
}

function clearLabel(label) {
	knnClassifier.clearLabel(label);
	updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
	knnClassifier.clearAllLabels();
	updateCounts();
}

// Save dataset as myKNNDataset.json
function saveMyKNN() {
	knnClassifier.save('myKNNDataset');
}

// Load dataset to the classifier
function loadMyKNN() {
	knnClassifier.load('./myKNNDataset.json', updateCounts);
}