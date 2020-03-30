//周辺光量落ち

function setup() {
  //カンバスサイズの設定
  createCanvas(800, 800);
  //カラーモードの指定（HSB推奨）
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  //背景色を指定  
  background(0, 0, 90);

  //画面上にたくさんの点を打つことで粒状感を背景に加える
  //点の密度，個数はカンバスのサイズに対して何％打つかを考えてみる
  let w = sqrt(sq(width) + sq(height));
  for (let i = 0; i < width * height * 15 / 100; i++) {
    //半透明の点，白でも黒でもOK．透明度は適宜調整する
    stroke(0, 0, 0, 50);
    let angle = random() * 360;
    let r = (sqrt(1 - random(random()))) * w / 2;
    let px = width / 2 + cos(angle) * r;
    let py = height / 2 + sin(angle) * r;
    point(px, py);
  }

  let x = width / 2;
  let y = height / 2;
  let d = width / 2 * 0.85;
  noStroke();
  fill(0, 0, 20);
  ellipse(x, y, d, d);

  for (let i = 0; i < 10000; i++) {
    stroke(0, 0, 100, 50);
    let angle = random() * 360;
    let r = (sqrt(1 - random(random(random())))) * d / 2;
    let px = width / 2 + cos(angle) * r;
    let py = height / 2 + sin(angle) * r;
    point(px, py);
  }
}