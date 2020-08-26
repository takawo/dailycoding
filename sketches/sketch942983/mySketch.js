//reference: @hoshiasahi07's awesome 顔シレーター(face oscillator) tweet.
//https://twitter.com/hoshiasahi07/status/1291727540982185985

let video;
let ctracker;
let emotions;
let predictedEmotions;
let emotionData;
let icons = ["😡", "😒", "😱", "😰", "😮", "😀"];
let osc_types = ['sine', 'triangle', 'sawtooth', 'square']
let isDebug = true;

let offset, margin;
let cellW, cellH;

let osc;
let isPlaying = false;

let oscs = [];

function setup() {
	createCanvas(640, 480);
	colorMode(HSB, 360, 100, 100, 100);

	video = createCapture(VIDEO, function() {
		for (let i = 0; i < 6; i++) {
			let osc = new p5.Oscillator(osc_types[i % osc_types.length]);
			osc.start();
			osc.amp(0, 0);
			oscs.push(osc);
			isPlaying = true;
		}
	});

	video.size(640, 480);
	video.position(0, 0);
	video.hide();

	ctracker = new clm.tracker();
	ctracker.init(pModel);
	ctracker.start(video.elt);

	emotions = new emotionClassifier();
	emotions.init(emotionModel);
	emotionData = emotions.getBlank();


	offset = width / 10;
	margin = offset / 5;

}


function draw() {
	clear();
	image(video, 0, 0);

	fill(0, 0, 100, 50);
	rect(0, 0, width, height);

	positions = ctracker.getCurrentPosition();
	var cp = ctracker.getCurrentParameters();
	predictedEmotions = emotions.meanPredict(cp);

	if (isPlaying && predictedEmotions) {

		for (let i = 0; i < oscs.length; i++) {
			freq = constrain(map(predictedEmotions[i].value, 0, 1, 0, 1000), 100, 500);
			amp = constrain(map(predictedEmotions[i].value / 8, 0, 1, 0, 0.5), 0, 0.5);

			oscs[i].freq(freq, 0);
			oscs[i].amp(amp, 0);
		}

	}



	cellW = (width - offset * 2 - margin * (predictedEmotions.length - 1)) / predictedEmotions.length;
	cellH = height / 8;
	if (isDebug) {
		//angry,disgusted,fear,sad,surprised,happy
		if (emotions) {
			for (var i = 0; i < predictedEmotions.length; i++) {

				let x = map(i, 0, predictedEmotions.length - 1, offset, width - offset - cellW);
				let y = height - margin * 3;

				let h = map(i, 0, predictedEmotions.length, 0, 360);
				let s = sq(predictedEmotions[i].value) * 100;

				fill(h, s, 100);
				rect(x, y, cellW, -predictedEmotions[i].value * cellH);

				fill(0, 0, 20);
				textAlign(CENTER, CENTER);
				textSize(16);
				let label = Object.values(predictedEmotions[i])[0];
				text(label.toUpperCase(), x + cellW / 2, y + margin);

				if (predictedEmotions[i].value > 0.5) {
					textSize(40);
					text(icons[i], x + cellW / 2, y - predictedEmotions[i].value * cellH - 25);
				}
			}
		}

		fill(220, 80, 40);
		noStroke();
		for (var i = 0; i < positions.length - 3; i++) {
			ellipse(positions[i][0], positions[i][1], 5, 5);
		}
	}
}

function mousePressed() {
	isDebug = !isDebug;
}