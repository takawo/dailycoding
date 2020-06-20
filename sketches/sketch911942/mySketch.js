//OpenProcessingでsoundを使う場合，右サイドバーのスケッチタブのLibrariesの項目p5.soundをオンにする必要があります．

//こっちの書き方のほうがスマートかも😃
//reference https://p5js.org/reference/#/p5.Oscillator

let osc; //26行目
let osc_types = ['sine', 'triangle', 'sawtooth', 'square']; //生成する波形の種類

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
	background(0, 0, 100, 3);
}

function keyPressed() {
	let x = random(width);
	let y = random(height);
	//押したキーを大文字に
	let str = key.toUpperCase();
	textFont("san-serif"); //フォントをデフォルトのサンセリフに
	textStyle(BOLD); //フォントをボールド（太く）
	textSize(random(width)); //大きさをランダム
	textAlign(CENTER, CENTER); //位置を中央揃えに
	text(str, x, y); //文字表示


	let osc_type = random(osc_types);
	osc = new p5.Oscillator(osc_type);

	//サイン波の設定
	osc.start(); //音をスタート
	osc.freq(random(1000), 0.1); //音の高さ，変化して値に達するまでの秒数
	osc.amp(0.05, 0); //音の大きさ，変化して値に達するまでの秒数

	//音を1秒後に止める
	osc.amp(0, 1); //音量を1秒後に0に
	osc.stop(1); //サイン波を1秒後に停止
}