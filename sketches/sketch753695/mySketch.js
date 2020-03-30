//発光表現

function setup() {
  //カンバスサイズの設定
  createCanvas(800, 800);
  //カラーモードの指定（HSB推奨）
  colorMode(HSB, 360, 100, 100, 100);
  //背景色を指定
  background(0, 0, 10);
  blendMode(ADD);

  //画面上にたくさんの点を打つことで粒状感を背景に加える
  //点の密度，個数はカンバスのサイズに対して何％打つかを考えてみる
  for (let i = 0; i < width * height * 5 / 100; i++) {
    //半透明の点，白でも黒でもOK．透明度は適宜調整する
    stroke(0, 0, 100, 10);
    let px = random(width);
    let py = random(height);
    point(px, py);
  }

  let x = width / 2;
  let y = height / 2;
  let d = width / 2 * 0.85;

  let line_count = 10;
  for (let i = 0; i < line_count; i++) {
    let t = i / line_count * 5; //透明度
    stroke(0, 0, 100, t);
    strokeWeight((line_count - i) * 5);
    noFill();
    ellipse(x, y, d, d);
  }
  stroke(0, 0, 100);
  noFill();
  ellipse(x, y, d, d);
}