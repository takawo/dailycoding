function setup() {
  //カンバスサイズの設定
  createCanvas(800, 800);
  //カラーモードの指定（HSB推奨）
  colorMode(HSB, 360, 100, 100, 100);
  //背景色を指定
  background(0, 0, 90);

  //画面上にたくさんの点を打つことで粒状感を背景に加える
  //点の密度，個数はカンバスのサイズに対して何％打つかを考えてみる
  for (let i = 0; i < width * height * 5 / 100; i++) {
    //半透明の点，白でも黒でもOK．透明度は適宜調整する
    stroke(0, 0, 0, 30);
    let px = random(width);
    let py = random(height);
    point(px, py);
  }

  let x = width / 2;
  let y = height / 2;
  let d = width / 2 * 0.85;

  let shadow_count = 10;
  for (let i = 0; i < shadow_count; i++) {
    let t = i / shadow_count * 5; //透明度
    let dd = map(i, 0, shadow_count, d * 1.33, d);
    fill(0, 0, 0, t);
    noStroke();
    ellipse(x, y, dd, dd);
  }
  noStroke();
  fill(0, 0, 100);
  ellipse(x, y, d, d);
}