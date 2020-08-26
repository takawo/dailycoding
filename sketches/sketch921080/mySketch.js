let amplitude; //鳴ってる音量を取得する
let reverb; //リバーブ
let osc; // オシレータ
let music_scales = [261, 293, 329, 349, 391, 440, 493];
let wave_types = ['sine', 'triangle', 'sawtooth', 'square']

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	cursor(HAND);

	//ランダムな音階と波形でオシレータで音を生成
	// init();

	blendMode(BLEND);
	background(0, 0, 15);
}

function init() {
	let wave_type = random(wave_types);
	let music_scale = random(music_scales);
	osc = new p5.Oscillator(music_scale, wave_type);
	osc.amp(2, 0); //オシレータの音量を0秒後に2に
	reverb = new p5.Reverb();
	reverb.process(osc, 1, 1);
	osc.start();
	osc.amp(0, 2);
	amplitude = new p5.Amplitude();
	amplitude.setInput(reverb);

}

function draw() {
	blendMode(BLEND);
	background(0, 0, 0, 10);
	blendMode(ADD);

	if (amplitude != undefined) {
		let level = amplitude.getLevel();
		noStroke();
		fill(random(360), 100, 100, 25);
		ellipse(width / 2, height / 2, level * width * 3);
	}
}

function mousePressed() {
	init();
}