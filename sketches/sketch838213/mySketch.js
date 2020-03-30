//動かしてみました，配列使っている工夫など💯と思いました．

let w;
let maskGraphics;

function setup() {
	createCanvas(400, 400);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	// 画面を覆うために画面の対角線の長さを計算する（三平方の定理で平方根sqrtで計算する）
	w = sqrt(width * width + height * height);


	//マスクというか，穴の空いたレイヤーを作成する

	//レイヤーを作成
	maskGraphics = createGraphics(width, height);
	//
	maskGraphics.background(20);
	maskGraphics.erase(255, 0);
	maskGraphics.rect(180, 100, 40, 200, 5);

}

function draw() {
	background(255);

	//バーバーのしましまの部分を書く
	push();
	translate(width / 2, height / 2);　 //画面の中心で
	rotate(60); //回転
	translate(-w / 2, -w / 2); //左上に原点を移動させ
	//線をひく（回転させてるので結果的に斜線になる）
	for (let i = 0; i < 20; i++) {
		//xは等間隔で並んで且つ移動する，wを超えると0に戻る
		x = (i / 20 * w + frameCount) % w;
		//偶数奇数で色が変わる
		if (i % 2 == 0) {
			stroke(0, 100, 100);
		} else {
			stroke(220, 100, 100);
		}
		strokeWeight(w / 50);
		line(x, 0, x, w);
	}
	pop();

	//レイヤーを表示
	//まずはここをコメントアウトすると何をやっているか理解しやすいかも
	image(maskGraphics, 0, 0);
}

// let colors = ["#C61C0F", "#FFF8F0", "#002199", "#FFF8F0"];
// let i2 = 0;
// let haba = 20;

// function setup() {
//   createCanvas(400, 400);
//   angleMode(DEGREES);
//   frameRate(1);
//   textAlign(CENTER);
//   textSize(30);
// }

// function draw() {
//   background(0);
//   noStroke();
//   push();
//   rotate(45);
//   for (i = 0; i < width * 3; i = i + haba) {
//     c = colors[floor(i2)];
//     fill(c);
//     rect(i, -height, i + haba, height * 2);
//     i2 = (i2 + 1) % 4;
//   }
//   i2 = (i2 + 1) % 4;
//   pop();

//   fill(0, 0, 0);
//   rect(0, 0, width / 2 - 20, height); //左
//   rect(width / 2 + 20, 0, width, height); //右
//   rect(0, height / 3 * 2 + 20, width, height); //下
//   rect(0, 0, width, 40); //上

//   stroke(200, 200, 200);
//   noFill();
//   strokeWeight(3);
//   rect(width / 2 - 20, 40, 40, height / 3 * 2 - 20, 3);

//   fill(255, 255, 255);
//   noStroke();
//   text("Barber Pole", width / 2, (height+(height / 3 * 2 + 20))/2);
// }